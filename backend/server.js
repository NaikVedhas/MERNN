const express = require('express');
require('dotenv').config();           //Req in node backend only not in frontend
const app = express();
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const mongoose  = require('mongoose');

//Middleware
app.use(express.json());   //so that req in workout.js has the required information of the request

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
    
})

//Routes 

app.use('/backend/user',userRoutes);
app.use('/backend/workouts',workoutRoutes);


//Connect to DB

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Connected to DB and Listening on port ${process.env.PORT} `);
    })
})
.catch((err)=> console.log(err))




