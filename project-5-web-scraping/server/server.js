/*
const express = require("express");
require("dotenv").config();
const Company = require('./models/Company.js');
const User = require("./models/User.js");
const db = require("./models/index.js");
const bcrypt = require('bcryptjs');
const cors= require("cors");
const pgp = require('pg-promise')();
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(express.json());


//register

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await User.create({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login 
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get all companies
app.get("/api/companies", async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).send("An error occurred while fetching companies.");
  }
});




// Middleware function to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

// Apply the middleware to your protected routes
app.get('/api/home', authenticateToken, async (req, res) => {
console.log("flamur");
});


*/






/*
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
*/


const express = require('express');
require('dotenv').config();
const Company = require('./models/Company.js');
const User = require('./models/User.js');
const db = require('./models/index.js');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and sign a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
/*
// Route to get all companies
app.get('/api/companies', async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).send('An error occurred while fetching companies.');
  }
});
*/
/*
app.get('/api/companies', async (req, res) => {
  try {
    const { count } = req.query;
    const companies = await Company.findAll({ limit: parseInt(count, 10) });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).send('An error occurred while fetching companies.');
  }
});
*/

app.get('/api/companies', async (req, res) => {
  try {
   //const { count } = req.query;
  //  const limit = parseInt(count, 10);

   // if (isNaN(limit)) {
     // return res.status(400).json({ message: 'Invalid count value' });
    //}

    const companies = await Company.findAll({limit: parseInt( 5000)  });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'An error occurred while fetching companies.', error: error.message });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
