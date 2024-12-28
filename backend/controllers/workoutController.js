const Workout = require('../models/workoutModel');
const  mongoose   = require('mongoose');

// get all workouts
``
const getWorkouts = (req,res)=>{ //instead of .then we can use async await too ha
    
    Workout.find().sort({createdAt: -1})
    .then((result)=>{
        
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(400).json({error:err.message})
    })
    
}

//get single a workout

const getSingleWorkout = (req,res) =>{

    const {id} =req.params;
    
    //First we have to check the id is valid or not 
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"No such workout"});
    }

    Workout.findById(id)
    .then((result)=>{
        if(!result) res.status(404).json({error:"No such workout present"});     //this means that id is of valid format but there is no docuemnt of this id so we send this
        res.status(200).json(result);
    })
    .catch((err)=> {
        res.status(404).json({error: err.message})
    })
}

// create a new workout


const createWorkout = (req,res)=>{

    const workout = new Workout(req.body);

    workout.save()
    .then((result)=>{
        res.status(200).json(result);
    })
    .catch((err)=>{
        res.status(400).json({error:err.message});
    })
}

//delete a workout


const deleteWorkout = (req, res) =>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error:"No such workout"});
    }

    Workout.findOneAndDelete({_id:id})
    .then((result)=>{  //result will contain the document(workout) which we just deleted
        if(!result) res.status(404).json({error:"No such workout present to delete"}); // this means that we didnt found the workout with this id
        res.status(200).json(result);
    })
    .catch((err)=> res.status(400).json({error:err.message}));

}

//update a workout

const updateWorkout = (req,res)=>{

    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) res.status(400).json({erro:"No such workout "})

    Workout.findByIdAndUpdate({_id:id},{...req.body})            //in secons arg we need to give data
    .then((result)=>{    //this result is not the updated one its the old one (this is what we get back)

        if(!result) res.status(404).json({error:"No such Workout present"})
        res.status(200).json(result);

    })
    .catch((err)=> res.status(400).json({error:err.message}));
}

module.exports = {
    getWorkouts,
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}
