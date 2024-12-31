const WorkoutDetails = ({workout}) => {
 
  const handleClick = async () =>{
    const response = await fetch(`/backend/workouts/${workout._id}`,{
      method:'DELETE'
    })

    const json = await response.json();

    if(response.ok){
      alert("Deleted");
      //Now we have to refresh the website to see the changes hehe
    }
  }
 
  return (
    <div className="bg-white p-6 rounded-2xl mx-12 my-8 w-2/3">
        <h1 className="text-3xl italic font-bold">{workout.title}</h1>
        <div className="text-xl">
        <h2>Load: {workout.load}</h2>
        <h2>Reps: {workout.reps}</h2>
        <p>{workout.createdAt}</p>
        <button className="bg-black text-white rounded-lg px-2 py-1" onClick={handleClick}>Delete</button>
        </div>
    </div>
  )
}
export default WorkoutDetails;