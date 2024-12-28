import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-white text-2xl py-4 w-full">
      <div className="container mx-auto text-center">
        <ul className="flex justify-center space-x-6">
          <li>
            <NavLink to="/" className="hover:underline">Home</NavLink>
          </li>
          <li>
            <NavLink to="/" className="hover:underline">New Blog</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
