import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
const Navbar = () => {
  
  const userContext = useAuthContext();

  const handleClick =()=>{
    userContext.logout();
  }
  
  return (
    <div className="bg-white text-2xl py-4 w-full">
      <div className="container mx-auto text-center">
        <ul className="flex justify-center space-x-6">
          <li>
            <NavLink to="/" className="hover:underline">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login" className="hover:underline">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup" className="hover:underline">Sign up</NavLink>
          </li>
        </ul>
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
