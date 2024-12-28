const WorkoutDetails = ({workout}) => {
  return (
    <div className="bg-white p-6 rounded-2xl mx-12 my-8 w-2/3">
        <h1 className="text-3xl italic font-bold">{workout.title}</h1>
        <div className="text-xl">
        <h2>Load: {workout.load}</h2>
        <h2>Reps: {workout.reps}</h2>
        <p>{workout.createdAt}</p>
        </div>
    </div>
  )
}
export default WorkoutDetails;