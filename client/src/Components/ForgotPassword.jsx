import React from 'react'
import{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('https://vercel-login-server.vercel.app/auth/forgot-password', { email})
        .then(res => {
          if (res.data.status) {
            alert("Check your email for reset password link")
            navigate('/');
          }
     
        })
        .catch(err => console.log(err));
    };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <div 
      className="card" 
      style={{ 
        width: '32rem', 
        height: '24rem', 
        padding: '2rem', 
        borderRadius: '1rem',  
        backgroundColor: '#FB9801',
        borderColor: 'orange', 
        border: '5px solid black' 
      }}
    >
      <h2 className="card-title mb-4 text-center" style={{ color: 'white', paddingTop:'2rem' }}>
        Forgot Password
      </h2>
      <div 
        className="bg-white p-4 rounded-3" 
        style={{ height: '12rem' }}
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
          <label htmlFor="email" style={{ color: 'black'  , }}>Email</label>
        </div>
          <div className="d-flex justify-content-between mb-3">
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'black', fontSize: '12px' }}
            >
              send
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ForgotPassword
