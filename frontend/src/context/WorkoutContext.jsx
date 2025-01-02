import { createContext,useContext, useState } from "react";

export const WorkoutContext = createContext(null);

export const useWorkoutContext = () => useContext(WorkoutContext); //arrow function hi karo nahi toh error ate 

export const WorkoutProvider = (props) => {
    
    const [workout,setWorkout] = useState([]);
    
    const createWorkout = (response) =>{
        setWorkout((prev)=>[response,...prev])
    }

    const deleteWorkout = (id) =>{
        setWorkout((prev)=> prev.filter((w) => w._id!==id))
    }

    return(
        <WorkoutContext.Provider value={{workout,createWorkout,deleteWorkout,setWorkout}}>
            {props.children}
        </WorkoutContext.Provider>
    )
}

//We will create a context and on creation, deletion and other things we will update our context too and for displaying data on home page we will use context so that for creation and deletion request our page will update home without reloading. We do this becase then reloaing ki problem na ho  