const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

const requireAuth = async (req,res,next) =>{

    //Here we will verify if the user is logged in and also logged in with validand correct token

    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).json({error:"Authorization Token is required"});
    }

    //So the authorization token is like 'Bearer JWT' so wee need only JWT. So will split into a array when a apace occurs and 2nd element we want

    const token =authorization.split(' ')[1];

    try{
        const {_id} = jwt.verify(token,process.env.SECRET); //this returns us the token so we grab the id from the payload

        req.userId = await User.findOne({_id}).select('_id');   //so here we found the particular user who has send the request 
        next();

    }catch(error){
        console.log(error);
        res.status(401).json({error:"Request id nor authorized "});
    }

}

module.exports = requireAuth;