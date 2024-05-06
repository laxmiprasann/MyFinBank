const jwt = require('jsonwebtoken');
const User= require('../models/User');


// Middleware to authenticate users
exports. authenticate = async (req, res, next) => {
    try {
        console.log(req);
        // Extract the token from the authorization header
        const token = req.headers.authorization;
        // If token is not provided, send unauthorized response
    
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by ID from the decoded token
        
        const user = await User.findById(decoded.userId);
        // If user is not found, send unauthorized response
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        // Attach the authenticated user to the request object
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

exports.authorize = (requiredRole)=>async (req,res,next)=>
{
    const user_email=req.user.email;
    console.log('Email',user_email);
    const user =await User.findOne({email:user_email});
    if(!user)
    {
        return res.status(401).json({message:"Unauthorized"});
    }
    console.log(user.role);
    console.log(requiredRole);
    if(user.role !== requiredRole)
    {
        return res.status(403).json({message:'Forbidden'})
    }
    next();
}

