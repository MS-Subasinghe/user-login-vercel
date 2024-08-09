import React from 'react'
import{ useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ResetUsername = () => {

    const [username, setUsername] = useState('');
    const {token} = useParams()
    const navigate = useNavigate();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://vercel-login-server.vercel.app/auth/reset-username/'+token, {username})
          .then(res => {
            if (res.data.status) {
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
       Reset Username
      </h2>
      <div 
        className="bg-white p-4 rounded-3" 
        style={{ height: '12rem' }}
      >
        <form onSubmit={handleSubmit}>
         
        <div className="form-floating mb-4">
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
        </div>
          <div className="d-flex justify-content-between mb-3">
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ backgroundColor: 'orange', borderColor: 'orange', color: 'black', fontSize: '12px' }}
            >
              Reset Username
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ResetUsername
