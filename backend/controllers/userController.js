const User = require('../models/userModel');

//login

const loginUser = async (req,res) => {

    res.json({mssg:'Login user'})

}
const signupUser = async (req,res) => {

    res.json({mssg:'Signup user'})

}

module.exports = {
    loginUser,
    signupUser

}