const authService = require('../Services/authService');

exports.register = async (req, res) => {
    const{email,password,role,fullName,address,phone}= req.body;
    try {
       const message = await authService.register(email,password,role,fullName,address,phone);
        res.status(201).json({ message});
    } catch (error) {
        res.status(500).json({ message: error.message });
       if (error.code === 'INVALID_PASSWORD') {
            errorMessage = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.';
        } else if (error.code === 'email') {
            errorMessage = 'email should be in @ gmail.com';
        }
        else if (error.code === 'fullName') {
            errorMessage = 'fullname is requied';
        }
        else if (error.code === 'fullName') {
            errorMessage = 'fullname is requied';
        }
        else if (error.code === 'address') {
            errorMessage = 'address is requied';
        }
        else if (error.code === 'phone') {
            errorMessage = 'phonenumber is requied';
        }
    }
};


exports.login=async(req,res)=>{
const{email,password,role}=req.body;
try
{
    const token = await authService.login(email, password, role);
    req.session.authorization={
        token,
        email
    }
    res.status(201).json({message:'User Login Successfully',token});

}
catch(error)
{
    res.status(500).json({message:error.message});
}
 
}

exports.logout =async (req,res)=>{
    try{
       await authService.logout(req);
        res.status(200).json({message:'Logged Out Successfully'});
    }catch(error){
        res.status(500).json({message:error.message});
    }
}