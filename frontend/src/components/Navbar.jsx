import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const userContext = useAuthContext();

  const handleClick = () => {
    userContext.logout();
  };

  return (
    <div className="bg-white text-2xl py-4 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex-1 text-center">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
        </div>

        <div className="flex items-center space-x-6">
          {!userContext.user && (
            <div className="flex items-center space-x-6">
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
              <NavLink to="/signup" className="hover:underline">
                Sign up
              </NavLink>
            </div>
          )}

          {userContext.user && (
            <div className="flex items-center space-x-6">
              <p className="text-lg font-medium">{userContext.user.email}</p>
              <button
                onClick={handleClick}
                className="p-1 border rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
