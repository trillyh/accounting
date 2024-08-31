import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './AuthPage.css'; 

function AuthPage() {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const handleTabSwitch = (isLogin) => {
    setIsLoginActive(isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="option">
          <button
            type="button"
            className={`auth-tab ${isLoginActive ? 'active' : ''}`}
            onClick={() => handleTabSwitch(true)}>
            Login
          </button>
          <button
            type="button"
            className={`auth-tab ${!isLoginActive ? 'active' : ''}`}
            onClick={() => handleTabSwitch(false)}>
            Create New User
          </button>
        </div>
        <div className="auth-form">
          {isLoginActive ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;