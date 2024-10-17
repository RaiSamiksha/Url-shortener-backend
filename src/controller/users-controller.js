const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { Op } = require('sequelize');
const { User } = require('../models'); // Adjust the path as necessary
console.log('User Model:', User);
const jwt = require('jsonwebtoken');
const { setUser } = require('../services/auth')
// const { sendEmail } = require('../services/mailer/mailer');

const usersController = {

  createUser: async (req, res) => { 
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });
  
      console.log('New user created:', newUser);
      res.status(201).json({ message: 'User created successfully. Please log in.' });
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get a user by ID or email
  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id); // Use req.params.email for email
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a user
  updateUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const updatedData = { ...req.body };
      if (req.body.password) {
        updatedData.password = bcrypt.hashSync(req.body.password, 10); // Hash the new password
      }

      await user.update(updatedData);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      await user.destroy();
      res.status(204).send(); // No content response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Login user
 // Login user
loginUser: async (req, res) => {
  const { email, password } = req.body;
  console.log('Login Attempt - Email:', email, 'Password:', password);

  try {
      const user = await User.findOne({ where: { email } });
      
      // If the user is not found, return an error
      if (!user) {
          console.log('User not found');
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Add logging to inspect the stored hashed password from the database
      console.log('Stored Hashed Password:', user.password);

      // Compare the plain password with the hashed password in the database
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      console.log('Password Valid:', isPasswordValid);

      // If the password is invalid, return an error
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Password is valid, generate a JWT token
      const token = setUser(user); // Use your setUser function to generate the token
        // Set the token in an HTTP-only, secure cookie
        res.cookie('authToken', token, {
          httpOnly: true,  // Prevent JavaScript access
          secure: false,   // Do not use secure for development (since you're using HTTP)
          maxAge: 3600000  // 1 hour expiration
      });

      // Send the token back in the response
      res.status(200).json({ token }); // Return the token in the response

  } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error' });
  }
}
}


module.exports = usersController;