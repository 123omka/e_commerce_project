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
    <nav className="flex items-center justify-between p-4 bg-blue-600 text-white">
      {/* Brand name + logo */}
      <div className="flex items-center space-x-2">
        {/* Logo box */}
        <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-blue-600 font-bold">
          M
        </div>
        {/* Brand name */}
        <div className="font-bold text-xl">ModaElite</div>
      </div>

      {/* Navigation links */}
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/signup" className="hover:underline">Signup</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
