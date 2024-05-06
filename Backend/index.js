// Import necessary dependencies
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const ChatMessage = require("./models/ChatMessage");
const corsMiddleware = require('./Middleware/cors_Middleware'); // Custom CORS middleware
require('dotenv').config(); // Load environment variables

// Create an Express application
const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

// Middleware setup
app.use(bodyParser.json()); // Parse JSON requests
app.use(corsMiddleware); // Use CORS middleware for handling cross-origin requests

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URL) // Connect to MongoDB using the URL from environment variable
    .then(() => {
        console.log('Connected to MongoDB.....');
    })
    .catch(err => {
        console.log('Failed to connect to MongoDB....');
    });

// Configure Express session
app.use(session({
    secret: process.env.SESSION_SECRET, // Session secret obtained from environment variable
    resave: true,
    saveUninitialized: true
}));

// Define routes for authentication
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

// Define routes for account-related operations
const accountRoutes = require('./routes/accountRoutes');
const { authenticate } = require('./Middleware/authMiddleware'); // Custom authentication middleware
app.use('/accounts', authenticate, accountRoutes);

// Define routes for transaction-related operations
const transactionRoutes = require('./routes/TransactionRoute');
app.use('/transactions', authenticate, transactionRoutes);

// Define routes for loan-related operations
const LoanRoutes = require('./routes/LoanRoutes');
app.use('/loans', authenticate, LoanRoutes);


// Routes
app.get("/messages", authenticate, async (req, res) => { // Add authentication middleware here
    try {
        const messages = await ChatMessage.find();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/messages", authenticate,  async (req, res) => { // Add authentication and authorization middleware here
    try {
        const { user,role, message } = req.body;

        if (!user ||!role|| !message) {
            return res
                .status(400)
                .json({ error: "User and message are required" });
        }

        const chatMessage = new ChatMessage({
            user,
            role,
            message,
        });

        await chatMessage.save();

        res.status(201).json(chatMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port number ${port}.....`);
});
