const express = require('express');
const router = express.Router();
const {
    getWorkouts,
    createWorkout,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout

} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);          // so before any route we will check this. But remember ha pehle userRoutes then this requireAuth and then workout routes reason- for loging them they need to see the userroutes na 

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