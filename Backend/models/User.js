const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const UserSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true,
        match:[ /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,'Password should be 8 char long and contains atleast a lowercase,uppercase,digit and a special char']
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    },
    accounts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],

    fullName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
   
}, {
    timestamps: true
})
/* Initialize accounts array as an empty array by default
UserSchema.pre('save', function(next) {
    if (!this.accounts) {
        this.accounts = [];
    }
    next();
});
*/
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
      return  next();
    }
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(this.password,salt);
        this.password=hashedPassword;
      return  next();
    }
    catch(error){
      return  next(error);
    }
})

UserSchema.methods.checkPassword =function(password,done){
    bcrypt.compare(password,this.password,(err,isMatch)=>{
        done(err,isMatch)
    })
}

const User=mongoose.model('User',UserSchema)

module.exports=User;