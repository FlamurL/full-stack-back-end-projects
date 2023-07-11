/*import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data object to send in the request body
    const userData = {
      name,
      email,
      password,
    };

    try {
      // Make a POST request to your backend API endpoint
      const response = await fetch('http://localhost:3005/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Registration successful
        const data = await response.json();
        console.log(data.message);

        // Clear input fields
        setName('');
        setEmail('');
        setPassword('');

        // Redirect to the login page
        navigate('/');
      } else if (response.status === 400) {
        // Email already exists
        const errorData = await response.json();
        setErrorMessage(errorData.message);
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
      <div className="sign_up">Signup</div>
      <div className="dot">Intelory</div>
      <form onSubmit={handleSubmit}>
        <div className="name1">
          <input
            className="name"
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="email1">
          <input
            className="email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password1">
          <input
            className="password"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn">
          Signup
        </button>
      </form>
      <div className="alr">
        <a href="/" className="alr1">
          Already Have An Account? Sign In
        </a>
      </div>
    </div>
  );
}

export default Signup;
*/
// Signup.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState( '');
  const [password, setPassword] = useState( '');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data object to send in the request body
    const userData = {
      name,
      email,
      password,
    };

    try {
      // Make a POST request to your backend API endpoint
      const response = await fetch('http://localhost:3005/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Registration successful
        const data = await response.json();
        console.log(data.message);

        // Clear input fields
        setName('');
        setEmail('');
        setPassword('');

        // Redirect to the login page
        navigate('/');
      } else if (response.status === 400) {
        // Email already exists
        const errorData = await response.json();
        setErrorMessage(errorData.message);
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
      <div className="sign_up">Signup</div>
      <div className="dot">Intelory</div>
      <form onSubmit={handleSubmit}>
        <div className="name1">
          <input
            className="name"
            type="text"
            id="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="email1">
          <input
            className="email"
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="password1">
          <input
            className="password"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn">
          Signup
        </button>
      </form>
      <div className="alr">
        <a href="/" className="alr1">
          Already Have An Account? Sign In
        </a>
      </div>
    </div>
  );
}

export default Signup;
