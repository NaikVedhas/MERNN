const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator =  require('validator');

const Schema = mongoose.Schema;

const  userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});


//Static signup methodwe can add the signup logic in userController too but we will do it here by attaching a method to model


userSchema.statics.signup = async function (email,password) { //when we use this keyword we cant use arriw function
    
    //validation

    if(!email || !password){
        throw Error("Email and Pawword is required");
    }
    
    if(!validator.isEmail(email)){
        throw Error("Email is not valid");
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error("Password is not strong enough");
    }
    
    //First well check if any email already exists or not

    const exists = await this.findOne({email});         //here we dont have acess to User (ie User.find or any other functions) becase in this file down we are exporting it only na so we have this which store the current model

    if(exists) { //when user exists na then that is stored in exists otherwise null
        throw Error("User already exist");
    }

    //well store the password by hashing them using bcrpt. Also before hashing it adds a random string to our password for extra security called salt. 
    
    const salt = await bcrypt.genSalt(10);//we add a number jitna bada number hoga utna time lagega hacker ko password crack karne mein par utna hi time lagega users ko signup karne mein so we need to find a balance
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({email,password:hash});

    return user;  // we will call from function from diff location so we are returning  
}

//static login yaha pe statics ke baad kuch bhi name likh sakte hai

userSchema.statics.login = async function (email,password) {

    if(!email || !password){
        throw Error("Email and Pawword is required");
    }
    
    const user = await this.findOne({email});         

    if(!user) { 
        throw Error("Incorrect email id"); //as the user doesnt exist
    }

    //Now we will check the password but its not stored normally we need to check the hashes

    const match = await bcrypt.compare(password,user.password); //match is a bool
    if(!match){
        throw Error("Incorrect Password");
    }

    return user;
}
module.exports = mongoose.model('User',userSchema);