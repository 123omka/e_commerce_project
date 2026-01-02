import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/login/authSlice";
import { clearProfile } from "../features/profile/profileSlice";

export default function Navbar() {
  const token = useSelector((s) => s.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearProfile());
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white text-gray-900 shadow-md">
      {/* Brand name + logo */}
      <div className="flex items-center space-x-2">
        {/* Logo box */}
        <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-gray-900 font-bold shadow">
          <img src="brand"
        </div>
        {/* Brand name */}
        <div className="font-bold text-xl">ModaElite</div>
      </div>

      {/* Navigation links */}
      <div className="space-x-4">
        {!token ? (
          <>
            <Link
              to="/signup"
              className="hover:text-yellow-500 transition-colors duration-200"
            >
              Signup
            </Link>
            <Link
              to="/login"
              className="hover:text-yellow-500 transition-colors duration-200"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className="hover:text-yellow-500 transition-colors duration-200"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors duration-200 text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
