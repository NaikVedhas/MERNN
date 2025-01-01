const User = require('../models/userModel');
const jwt =require('jsonwebtoken');

//create jwt token

const create = (_id) =>{

    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'});       //first is the payload we can addd more non senitive info there too, second is the secret which we decide and third is object not signature which gives us a lot of prop like expiresIn:3d means user will automatically logout after 3days (and phir ushe automatically login karna hoga) and this token will expire at that time
}


//login

const loginUser = async (req,res) => {

    const {email,password} = req.body;

    try{
        const  user =  await User.login(email,password);
        //creating a token
        const token = create(user._id);
        res.status(200).json({email,token});
    }catch(error){
        res.status(400).json({error:error.message});
    }

}
const signupUser = async (req,res) => {

    const {email,password} = req.body;

    try{
        const  user =  await User.signup(email,password);
        //creating a token
        const token = create(user._id);
        res.status(200).json({email,token});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

module.exports = {
    loginUser,
    signupUser

}