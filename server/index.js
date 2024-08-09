import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
dotenv.config()
import { UserRouter } from './routes/user.js'




const app = express()
app.use(express.json())
app.use(cors({
    origin: ["https://user-login-vercel.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));

app.use(cookieParser())
app.use('/auth',UserRouter)

mongoose.connect("mongodb+srv://minolsubasinghe14:iW8riPnuvBxE5FWC@cluster0.p9lhu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.get("/", (req,res) =>{
    res.json("Hello")
})

app.listen(process.env.PORT, ()=>{
    console.log("server is running")
})
