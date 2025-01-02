import { useWorkoutContext } from "../context/workoutContext.jSX"
import { IoTrashBinOutline  } from "react-icons/io5";
import { useAuthContext } from "../context/AuthContext";

const WorkoutDetails = ({workout}) => {  //yeh workout hum props se hi lere ha context se nhi
  
  const workoutContext = useWorkoutContext(); //context ka use delete request mein kiya
  const userContext = useAuthContext();

  const handleClick = async () =>{

    if(!userContext.user){
      return;
    }
    
    const response = await fetch(`/backend/workouts/${workout._id}`,{
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${userContext.user.token}`
      }
    })

    const json = await response.json();

    if(response.ok){
      workoutContext.deleteWorkout(workout._id);
    }
  }
 
  return (
    <div className="bg-white p-6 rounded-2xl mx-12 my-8 w-2/3">
        <h1 className="text-3xl italic font-bold">{workout.title}</h1>
        <div className="text-xl flex">
        <h2 className="m-2">Load: {workout.load}</h2>
        <h2 className="m-2">Reps: {workout.reps}</h2>
        <button className="bg-black text-white rounded-lg px-2 py-1 ml-auto" onClick={handleClick}><IoTrashBinOutline /></button>
        </div>
    </div>
  )
} 
export default WorkoutDetails;