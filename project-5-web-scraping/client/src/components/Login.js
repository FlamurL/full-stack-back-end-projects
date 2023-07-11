
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { BiSolidUser } from 'react-icons/bi';
import { AiTwotoneLock } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { ImTwitter } from 'react-icons/im';
import { CgMail } from 'react-icons/cg';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setEmail('');
    setPassword('');
    if (token) {
      // If a token is found in local storage, automatically navigate to the home page
  //   navigate('/home');
    }
  }, [navigate]);

  const handleSignup = () => {
    navigate(`/signup`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data object to send in the request body
    const userData = {
      email,
      password,
    };

    try {
      // Make a POST request to your backend login endpoint
      const response = await fetch('http://localhost:3005/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Login successful
        const data = await response.json();
        console.log(data.message);

        // Save the JWT token to local storage
        localStorage.setItem('token', data.token);

        // Redirect to the home page or perform any other action for authenticated users
        navigate('/home');
      } else if (response.status === 404 || response.status === 401) {
        // User not found or invalid credentials
        const errorData = await response.json();
        setErrorMessage(errorData.message); // Set the error message
      } else {
        // Handle other error cases
        console.log('Error: Unexpected response');
      }
    } catch (error) {
      // Handle network or server errors
      console.error('Error:', error);
    }
  };

  return (
    <div className="full-page">
      <div className="login">Login</div>
      <div className="dot">Intelory</div>
      <form onSubmit={handleSubmit}>
        <div className="email1">
          <BiSolidUser />
          <input
            className="email"
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password1">
          <AiTwotoneLock />
          <input
            className="password"
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
    <div className="keep-logged-in">
          <div className="checkbox">
            <input
              type="checkbox"
              id="keepLoggedIn"
              defaultChecked={localStorage.getItem('token') !== null}
            />
          </div>
          <label htmlFor="keepLoggedIn" className="keeplog">
            Keep me logged in
          </label>
        </div>
        <p className="error-message">{errorMessage}</p> {/* Render the error message */}
        <button type="submit" className="btn">
          LOG IN
        </button>
      </form>
      <div className="signup">
      <Link to="/signup" onClick={handleSignup}>New User? Register</Link>
      </div>
      <div className="logo">
        <div className="lg">Or Login Using:</div>
        <FaFacebook className="fcb" />
        <ImTwitter className="twt" />
        <CgMail className="mai" />
      </div>
    </div>
  );
}

export default Login;
