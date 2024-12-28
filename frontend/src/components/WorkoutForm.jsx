import { useState } from "react";

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newWorkout = { title, load, reps };

    fetch('/backend/workouts/', {
      method: 'POST',
      body: JSON.stringify(newWorkout), // converting our newWorkout to json format
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((result) => {
      if (!result.ok) {
        return result.json().then((json) => {
          setError(json.error);
        });
      } else {
        setError(null);
        setTitle('');
        setLoad('');
        setReps('');
      }
    })
    .catch((err) => {
      setError('Failed to add workout. Please try again later.');
      console.log(err);
    });
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-lg font-medium mb-2 mt-4">Load (in kgs)</label>
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-lg font-medium mb-2 mt-4">Reps</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
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
