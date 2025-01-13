// Import necessary modules
const User = require("../models/usermodel"); // User model for database interaction
const bcrypt = require('bcrypt'); // Library for hashing passwords
const jwt = require('jsonwebtoken'); // Library for creating JSON Web Tokens

// Home Route
const home = async (req, res) => {
  try {
    // Respond with a simple greeting message
    res.status(200).send("hello"); // Sending a 200 OK response
  } catch (error) {
    // If an error occurs, send a 500 status with the error message
    res.status(500).send({ message: error.message }); // Log the error message for debugging
  }
};

// Register Route
const register = async (req, res) => {
  try {
    // Destructure the required fields from the request body
    const { userType, username, email, phone, address, password } = req.body;

    // Check if a user already exists with the provided email
    const userExist = await User.findOne({ username }); // Query the database for a user with this email
    if (userExist) {
      console.log("User already exists with this email"); // Log the error for debugging
      alert(`User ${username} already exists`); //
      return res.status(400).json({ msg: "User already exists" }); // Return a 400 status indicating the user already exists
    }

    // Hash the user's password for security
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

    // Create a new user in the database
    const user = await User.create({
      userType,
      username,
      email,
      phone,
      address,
      password: hashedPassword, // Store the hashed password
    });

    // Create a JWT token for the new user
   const token =jwt.sign({
    
   })

    user.token = token; // Assign the generated token to the user object
    user.password = undefined; // Ensure the password field is not sent in the response for security

    // Log the registration process for debugging
    console.log("registered"); 
    // Send success response

    return res.status(201).json({ msg: "User registered successfully", token:await user.genrateToken(),userId:user._id.toString()}); // Return a 201 status indicating successful registration
  } catch (error) {
    // If an error occurs, send a 500 status with the error message
    return res.status(500).send({ message: error.message }); // Log the error message for debugging
  }
};

// Login Route
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExist = await User.findOne({ username });
    
    if (!userExist) {
      return res.status(401).json({ msg: 'User does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: 'Invalid password' });
    }

    // Generate a JWT token with a hardcoded secret key
    const token = jwt.sign(
      { userId: userExist._id, userType: userExist.userType }, // Payload
      'your_secret_key', // Replace 'your_secret_key' with an actual key for development
      { expiresIn: '1h' } // Optional: set token expiration
    );

    console.log("UserType:", userExist.userType);
    return res.status(200).json({
      msg: 'Login successful',
      userType: userExist.userType,
      token: token, // Include token in response
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


// Institutes Route
const institutes = async (req, res) => {
  try {
    // Query the database for users with userType 'Institute' and only retrieve their usernames
    const institutes = await User.find({ userType: 'Institute' }, 'username'); // Fetch usernames of all institutes
    console.log("Finding institutes..."); // Log the action for debugging
    res.status(200).json(institutes); // Return the list of institutes with a 200 OK response
  } catch (error) {
    // If an error occurs, log the error and send a 500 response
    console.error("Error fetching institutes:", error); // Log the error for debugging
    res.status(500).json({ msg: "Error fetching institutes" }); // Send an error response with a 500 status
  }
};

// Export the route handlers for use in other parts of the application
module.exports = { home, register, login, institutes };
