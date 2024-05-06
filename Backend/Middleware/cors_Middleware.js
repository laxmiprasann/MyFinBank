// Import the 'cors' package for handling Cross-Origin Resource Sharing (CORS)
const cors = require('cors');

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3001', // Allow requests from this origin
  credentials: true // Enable credentials to allow cookies or sessions for authentication
};

// Export the CORS middleware with the specified options
module.exports = cors(corsOptions);
