import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import './AuthPage.css'; 



/**
 * @param {Object} setIsLoggedIn - state setter whether user has logged in or not 
 */

function AuthPage({setIsLoggedIn}) {
  const [isLoginActive, setIsLoginActive] = useState(true);

/**
 * Function, take isLogin as params and isLoginActive state
 */
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
          {isLoginActive ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
