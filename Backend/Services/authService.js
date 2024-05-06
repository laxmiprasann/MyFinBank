const User= require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');

exports.register = async (email,password,role='customer',fullName,address,phone) => {
   const existingUser= await User.findOne({email});
   if(existingUser)
   {
    throw new Error('User already exists');
   }
   const newUser = new User({email,password,role,fullName,address,phone});
   await newUser.save();
   return 'User registered successfully';
};


exports.login= async (email,password,role='customer')=>{
    const user = await User.findOne({email});
    if(!user)
    {
        throw new Error('Invalid Email');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid Password');
    }

    const token = jwt.sign({userId :user._id}, process.env.JWT_SECRET,{expiresIn:60*60});
    return  token ;
    
}


exports.logout = (req)=>{
    req.session.destroy();
}