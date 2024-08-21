import React from 'react'
import{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const {token} = useParams()
    const navigate = useNavigate();
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
axios.post('https://user-login-vercel.vercel.app/auth/reset-password/'+token, {password})
        .then(res => {
          if (res.data.status) {
            navigate('/');
                  console.log(res)
          }
        })
        .catch(err => console.log(err));
        console.log(token)
    };

    console.log(res)

    console.log(token)
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
       Reset Password
      </h2>
      <div 

        className="bg-white p-4 rounded-3" 
        style={{ height: '12rem' }}
      >
        <form onSubmit={handleSubmit}>
         
        <div className="form-floating mb-4">
        <div className="mb-3">
                <label htmlFor="password" className="form-label"> New Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
        </div>
          <div className="d-flex justify-content-between mb-3">
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'black', fontSize: '12px' }}
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ResetPassword
