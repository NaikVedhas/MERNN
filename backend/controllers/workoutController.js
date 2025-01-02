const Workout = require('../models/workoutModel');
const  mongoose   = require('mongoose');

// get all workouts

const getWorkouts = async (req,res)=>{ //instead of .then we can use async await too ha
    
    //So har ek user ko uske hi routed dikhe uske liye hum na bacekend mein ek user_id bhi save karenge and phir yaha se conditionally send karenge
    const user_id = req.user._id;
    const workouts = await Workout.find({user_id}).sort({createdAt: -1});
    res.status(200).json(workouts);
    
}

//get single a workout

const getSingleWorkout = async (req,res) =>{

    const {id} =req.params;
    
    //First we have to check the id is valid or not 
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"No such workout"});
    }

    const workout = await Workout.findById(id);

    if(workout){
        res.status(200).json(workout)
    }
    res.json(400).json({error:"No such workout"})
}

// create a new workout


const createWorkout = async (req,res)=>{

    const {title,load,reps}= req.body;
    const user_id = req.user._id;
    //Well check before only that all fields are filled or not rather than catching the error send by db for missing feild

    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }
    if(!load){
        emptyFields.push('load');
    }
    if(!reps){
        emptyFields.push('reps');
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:"Please fill all fields",emptyFields})
    }

    try {
        const workout = await Workout.create({title, load, reps, user_id});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout


const deleteWorkout = async(req, res) =>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"No such workout"});
    }

    const workout = await Workout.findOneAndDelete({_id:id}); //workout will contain the document(workout) which we just deleted

    if(!workout){ 
        res.status(404).json({error:"No such workout present to delete"}); // this means that we didnt found the workout with this id
    }
    res.status(200).json(workout)
}

//update a workout

const updateWorkout = async (req,res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) res.status(400).json({erro:"No such workout "})

    const workout= await Workout.findByIdAndUpdate({_id:id},{...req.body}); //this workout is the old version which we will get back not teh updated one
    if(!workout){
        res.status(404).json({error:"No such Workout present"})
    }
    res.status(200).json(workout);
}

module.exports = {
    getWorkouts,
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}
