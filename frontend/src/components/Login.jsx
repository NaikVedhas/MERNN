import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError]= useState(null);

  const userContext = useAuthContext();

  const handleSubmit = async (e) => {
   
    e.preventDefault();

    const response = await fetch('/backend/user/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email,password})
    }) 

    console.log(response);
    console.log(response.status);
    
    const json = await response.json();

    if(!response.ok){
      setError(json.error);
    }
    if(response.ok){
      setError(null);
      userContext.login(json);
    }

  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

        <label className="block text-lg font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <label className="block text-lg font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
        {error && <div>{error}</div> }
      </form>
    </div>
  );
};

export default Login;
