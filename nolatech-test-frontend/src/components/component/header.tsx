import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react"; // Import the User icon
import { Button } from "../ui/button";
import { RootState } from "@/redux/store/store";
// import { Button } from "flowbite-react";

function Header() {
  const currentRole = useSelector((state: RootState) => state.auth.role);
  const currentID = useSelector((state: RootState) => state.auth.id);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    // console.log("Responsive menu opened");
    setIsMenuOpen(!isMenuOpen);
  };

  const openProfile = () => {
    navigate(`/profile`);
  };

  const handleLogout = () => {
    // Eliminar items de localStorage
    ['token', 'role', 'id', 'name'].forEach(item => localStorage.removeItem(item));
    // console.log("LOGOUT STARTED");
    // Redirigir al login
    navigate("/login");
  };

  return (
    <header className="animate__animated animate__fadeIn bg-gradient-to-r from-purple-500 to-purple-700 text-white font-medium shadow-sm  transition text-primary-foreground py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{`${currentRole} Dashboard`}</h1>
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <div className="hidden md:flex gap-4 items-center">
          <Button variant="header" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="header" asChild>
            <Link to="/evaluations/employee">My Evaluations</Link>
          </Button>
          {(currentRole === "Admin" || currentRole === "Manager") && (
            <Button variant="header" asChild>
              <Link to="/general-evaluations">All Evaluations</Link>
            </Button>
          )}
          <Button variant="header" asChild>
            <Link to="/results-graphs">Results</Link>
          </Button>
          <Button variant="header" className="w-full" onClick={() => openProfile()}>
            <User className="inline mr-2" /> <Link to="/profile">Profile</Link>
          </Button>
          <Button variant="default" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Button variant="header" asChild className="w-full">
            <Link to="/">Home</Link>
          </Button>
          <Button variant="header" asChild className="w-full">
            <Link to="/evaluations/employee">My Evaluations</Link>
          </Button>
          {(currentRole === "Admin" || currentRole === "Manager") && (
            <Button variant="header" asChild className="w-full">
              <Link to="/general-evaluations">All Evaluations</Link>
            </Button>
          )}
          <Button variant="header" asChild className="w-full">
            <Link to="/results-graphs">Results</Link>
          </Button>
          <Button variant="header" className="w-full" onClick={() => openProfile()}>
            <User className="inline mr-2" /> Profile
          </Button>
          <Button
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </header>
  );
}
export default Header;
