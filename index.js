// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const server = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const pollrouter = require('./Routes/pollroute');

// Establish MongoDB connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Database connected'); // Log when the database is connected
}

// Middleware setup
const Router = express.Router();
server.use(cors()); // Enable CORS for all routes
server.use(express.json()); // Parse incoming JSON data
server.use(morgan('default')); // Use Morgan for logging HTTP requests
server.use(express.static(process.env.PUBLIC_DIR)); // Serve static files from the specified directory

// Define routes using the imported poll router
server.use('/', pollrouter.router);

// Start the server and listen on the specified port
server.listen(process.env.PORT, () => {
  console.log('Server started'); // Log when the server is started
});
