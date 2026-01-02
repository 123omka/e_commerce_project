import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/login/authSlice";
import { clearProfile } from "../features/profile/profileSlice";
import SearchBar from "../components/SearchBar";
import Navbarpanal from "../components/Navbarpanal";

import { Heart, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const token = useSelector((s) => s.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
  };

  return (
    <>
    <nav className="h-[100px] flex items-center justify-between px-10 bg-white shadow-md">

      {/* Left - Logo + Brand */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl ml-[100px] bg-gray-200 flex items-center justify-center shadow">
          <img src="/brand.png" alt="Logo" className="w-full h-full rounded-xl" />
        </div>

        <div className="font-['Playfair_Display'] text-4xl font-semibold tracking-wide hover:scale-105 transition-transform cursor-pointer">
          ModaElite
        </div>
      </div>

      {/* Center - SearchBar */}
      <div className="flex-1 flex justify-center">
        <SearchBar />
      </div>

      {/* Right - Icons + Auth links */}
      <div className="flex items-center gap-6 mr-[100px] text-gray-900 text-lg">

        {/* Icons */}
        <Heart className="w-6 h-6 hover:text-yellow-500 cursor-pointer" />
        <ShoppingCart className="w-6 h-6 hover:text-yellow-500 cursor-pointer" />

        {/* Auth */}
        {!token ? (
          <>
            <Link to="/signup" className="hover:text-yellow-500 text-xl ">
              Signup
            </Link>

            <Link to="/login" className="hover:text-yellow-500 text-xl">
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="hover:text-yellow-500">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
     <div><Navbarpanal/></div></>
  );
}
