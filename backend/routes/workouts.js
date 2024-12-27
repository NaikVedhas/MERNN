const express = require('express');
const router = express.Router();
const {
    getWorkouts,
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout

} = require('../controllers/workoutController');

//Get all workouts
router.get('/',getWorkouts)

//Get single workouts

router.get('/:id',getSingleWorkout)

//Post a new workout

router.post('/',createWorkout)

//Delete a workout

router.delete('/:id',deleteWorkout)

//Update a workout

router.patch('/:id',updateWorkout)


module.exports = router;