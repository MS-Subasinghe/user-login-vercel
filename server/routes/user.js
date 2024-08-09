import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import {User} from '../models/User.js'


router.post('/signup', async  (req,res)=>{
   const {username,email,phone,password} = req.body;
   const user = await User.findOne({email})
   if(user){
    return res.json({message:"user already exist"})
   }

   const hashpassword = await bcrypt.hash(password,10)
   const newUser = new User({
    username,
    email,
    phone,
    password:hashpassword,
   })
   
   await newUser.save()
   return res.json({status: true,message:"recoard registerd"})

})


router.post('/login',async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(!user){
        return res.json({message: "user is not registerd"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword){
        return res.json({message:"password is incorrect"})
    }
    const token = jwt.sign({username:user.username}, process.env.KEY, {expiresIn: '1h'})
    res.cookie('token', token,{httpOnly: true,maxAge: 360000})
    return res.json({status: true, message:"login successfull"})
})

router.post('/forgot-password', async (req,res)=>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.json({message:"user not registerd"})
        }
        
    const token = jwt.sign({ id: user._id }, process.env.KEY);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Reset Password',
    text: `Click here to reset your password: https://user-login-vercel-frontend.vercel.app/resetPassword/${token}`
};


    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      return res.json({ status: true, message: 'Email sent successfully' });

    });

  }catch(err){
    console.log(err)
}
})

// forgot username

router.post('/forgot-username', async (req,res)=>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.json({message:"user not registerd"})
        }
        
    const token = jwt.sign({ id: user._id }, process.env.KEY);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset username',
      text: `Click here to reset your password:https://user-login-vercel-frontend.vercel.app/resetUsername/${token}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email' });
      }
      return res.json({ status: true, message: 'Email sent successfully' });

    });

  }catch(err){
    console.log(err)
}
})

//reset username
router.post('/reset-username/:token', async(req,res)=>{
    const {token }= req.params;
    const {username} = req.body


    try{
        const decoded = await jwt.verify(token,process.env.KEY);
        const id = decoded.id;
        await User.findByIdAndUpdate({_id: id},{username:username})
        return res.json({status:true, message :"updated Username"})

    }catch(err){
        return res.json("invalid token")
    }
     
})


// Reset password route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.KEY);
        const id = decoded.id;

        // Hash the new password
        const hashpassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        const updatedUser = await User.findByIdAndUpdate(id, { password: hashpassword }, { new: true });

        // If the user was not found
        if (!updatedUser) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        // Respond with success message
        return res.json({ status: true, message: "Password updated successfully" });

    } catch (err) {
        console.error("Error resetting password:", err);
        
        // Check if the error is due to an invalid token
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(400).json({ status: false, message: "Invalid or expired token" });
        }

        // Catch-all for other errors
        return res.status(500).json({ status: false, message: "Server error, please try again later" });
    }
});



export {router as UserRouter}
