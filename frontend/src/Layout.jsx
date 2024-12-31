  import Navbar from "./components/Navbar";
  import Footer from "./components/Footer";
  import { Outlet } from "react-router-dom";

  //By this CSS our oullet takes the full space between navbar and footer

  function Layout() {
      return (
        <div className="bg-gray-300 flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer />
        </div>
      );
    }
    
    export default Layout;
    