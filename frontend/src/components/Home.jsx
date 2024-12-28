import { useEffect, useState } from "react"


const Home = () => {
  
  //For integrating backend to frontend we here also do just fetchrequest from our backend which is running on port 4000. But for CORS reasons(an error occurs whwne we communicate from one localhost to another) we need to add proxy:localhost:4000 in our react package.json file so that we can commuincate and integration is just like fetching api 
  
  const [workouts,setWorkouts] = useState(null);


  useEffect(()=>{
    const fetchdata =  async ()=>{
      const response = await fetch('/backend/workouts');
      const data = await response.json();
      if(response.ok){
        setWorkouts(data);
      }
    }
    fetchdata();
  },[]);

  console.log(workouts);
  

  // useEffect(()=>{

  //   fetch('/backend/workouts/')  //yaha pe https://localhost:4000/backend/workouts/ likhne ki jarurat nahi woh package.json mein likha hai starting ka
  //   .then( (result) =>{
  //     console.log("Fetched Result is ",result);
  //     console.log(result.headers.get('Content-Type')); // Check the Content-Type of the response

  //     if(result.ok){
  //       return result.json();
  //     }
  //     else throw Error("Database Down");
  //   })
  //   .then(data=>{
  //     console.log("Fetched data");
      
  //     setWorkouts(data);
  //   })
  //   .catch((err)=>{
  //     console.log(err);
  //   })

  // },[])
    
    // return (
  //   <div>
  //     {
  //       workouts && workouts.map((w)=>(
  //         <h1 key={w._id}>{w.title}</h1>
  //       ))
  //     }





  //   </div>
  // )
}
export default Home