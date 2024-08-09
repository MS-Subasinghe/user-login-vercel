import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

    axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://vercel-login-server.vercel.app/auth/login', {  email, password })
      .then(res => {
        if (res.data.status) {
            navigate('/home');
        }
      })
          .catch(err => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div 
        className="card" 
        style={{  width: '32rem', height: '37rem', padding: '2rem', borderRadius: '1rem',  backgroundColor: '#FB9801', borderColor: 'orange', border: '5px solid black' }}
      >
        <h2 className="card-title mb-4 text-center" style={{ color: 'white', paddingTop:'2rem' }}>
          Sign in to access professional help
        </h2>
        <div 
          className="bg-white p-4 rounded-3" 
          style={{ height: '28rem' }}
        >
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-4">
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder=" " 
                style={{ border: '2px solid #FB9801', borderRadius: '0.5rem',marginTop: '2rem' }} 
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email" style={{ color: 'black'  , }}>User name: Email or Phone</label>
            </div>
            <div className="form-floating mb-4">
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder=" " 
                style={{ border: '2px solid #FB9801', borderRadius: '0.5rem',marginTop: '2rem' }}  
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" style={{ color: 'black' }}>Password</label>
            </div>
            <div className="d-flex justify-content-between mb-3">

            <Link 
                to="/forgotUsername" 
                style={{ color: '#FB9801', fontSize: '12px' }}
              >
                Forgot Username ?
              </Link> <br></br>
              <Link 
                to="/forgotPassword" 
                style={{ color: '#FB9801', fontSize: '12px' }}
              >
                Forgot password ?
              </Link>

             
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'black', fontSize: '12px' }}
              >
                Sign In
              </button>
            </div>
            <div style={{ marginTop: '4rem' }}>
              <Link 
                to="/signup" 
                className="btn btn-primary" 
                style={{ 
                  backgroundColor: 'orange', 
                  borderColor: 'orange', 
                  color: 'black', 
                  fontSize: '12px', 
                  display: 'inline-block', 
                  marginLeft: '0',
              
                }}
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
