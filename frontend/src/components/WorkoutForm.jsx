import { useState } from "react";
import { useWorkoutContext } from "../context/workoutContext.jSX";
import { useAuthContext } from "../context/AuthContext";
const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields,setEmptyFields] = useState([]);

  const userContext = useAuthContext();

 const workoutContext =  useWorkoutContext();
  
 const handleSubmit =async (e) => {
    
    e.preventDefault();

    if(!userContext.user){
      setError("You must be logged in");
      return;
    }
    
    const newWorkout = { title, load, reps };

    const response = await fetch('/backend/workouts/', {
      method: 'POST',
      body: JSON.stringify(newWorkout), // converting our newWorkout to json format
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${userContext.user.token}`
      }
    })

    const json = await response.json();

    if(!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields);
    }
    else{
      setError(null);
      setTitle(''); //Agaar yeh nahi kiya na toh even after adding a new workout then value in the form will not change and be same as previous
      setLoad('');
      setReps('');
      setEmptyFields([]);
      workoutContext.createWorkout(json); //updating the context
    }


  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-center">Add a new Workout</h3>

        <label className="block text-lg font-medium mb-2">Exercise Name</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={emptyFields.includes('title') ? 'w-full px-4 py-2 border border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' :"w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}
        />
        <label className="block text-lg font-medium mb-2 mt-4">Load (in kgs)</label>
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields.includes('load') ? 'w-full px-4 py-2 border border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' :"w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}
        />
        <label className="block text-lg font-medium mb-2 mt-4">Reps</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes('reps') ? 'w-full px-4 py-2 border border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' :"w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"}
        />
        <button
          type="submit"  //yeh likha hai so onsubmit function isko attach hua
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6"
        >
          Add Workout
        </button>
      </form>

      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
    </>
  );
};

export default WorkoutForm;
