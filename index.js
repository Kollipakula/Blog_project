const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const devuser = require('./devuser');
const reviewmodel = require('./reviewmodel');
const blogRouter = require('./blogindex');

// origin: 'http://localhost:3000'

// CORS options
const corsOptions = {
  origin: true, // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // allow these headers
};

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors(corsOptions)); // Enable CORS with specified options




// MongoDB connection
mongoose.connect('mongodb+srv://test:12345@cluster0.g9hrrbp.mongodb.net/')
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Hello');
});

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { fullname, email, password, confirmpassword } = req.body;
    console.log(`Register attempt with email: ${email}`);
    const exist = await devuser.findOne({ email });

    if (exist) {
      return res.status(400).send('User already registered');
    }

    if (password !== confirmpassword) {
      return res.status(403).send('Passwords do not match');
    }

    const newUser = new devuser({
      fullname,
      email,
      password,
      confirmpassword
    });

    await newUser.save(); // Save user to MongoDB

    return res.status(200).send("Registered Successfully");
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  console.log('Login endpoint hit');

  try {
    const { email, password } = req.body;
    console.log(`Login attempt with email: ${email}`);
    const exist = await devuser.findOne({ email });

    if (!exist) {
      return res.status(400).send('User does not exist');
    }

    if (exist.password !== password) {
      return res.status(400).send('Invalid password');
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
});

// Use blogRouter for /blogs routes
// app.use('/blogs', blogRouter);
app.use('/api', blogRouter);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
