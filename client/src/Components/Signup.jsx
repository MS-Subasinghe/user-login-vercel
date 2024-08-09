import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://vercel-login-server.vercel.app/auth/signup',{username,email,phone,password}).then(response =>{
     if(response.data.status){
        navigate('/')
     }

    }).catch(err =>{
        console.log(err)
    })
      
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{
        width: '30rem',
        padding: '2rem',
        backgroundColor: '#FB9801',
        border: '5px solid black',
        borderRadius: '1rem',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Sign Up</h2>
          <div id='form-box' style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '1rem' }}>
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'black', width: '10rem' }}
              >
                Sign Up
              </button>
              <p className="mt-3">Have an Account? <Link to='/'>Sign in</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
