import { useEffect, useState } from "react";
import WorkoutDetails from "./WorkoutDetails";
import WorkoutForm from "./WorkoutForm";

const Home = () => {
  
  //For integrating backend to frontend we here also do just fetchrequest from our backend which is running on port 4000. But for CORS reasons(an error occurs whwne we communicate from one localhost to another) we need to add proxy:localhost:4000 in our react package.json file so that we can commuincate and integration is just like fetching api. And yeh proxy vite.config mein bhi likhna padta hai 
  
  const [workouts, setWorkouts] = useState(null);

  useEffect(() => {
    fetch('/backend/workouts/')  //yaha pe https://localhost:4000/backend/workouts/ likhne ki jarurat nahi woh package.json mein likha hai starting ka
    .then((result) => {
      if (result.ok) {
        return result.json();
      } else throw Error("Database Down");
    })
    .then(data => {
      setWorkouts(data);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

  return (
    <div className="flex justify-between space-x-6 p-6">
      <div className="w-2/3">
        {
          workouts && workouts.map((w) => (
            <WorkoutDetails key={w._id} workout={w} />
          ))
        }
      </div>
      <div className="w-1/3">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
