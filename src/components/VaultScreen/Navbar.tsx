import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import config from "../../config";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const username = auth.username;
  const BACKEND_URI = config.BACKEND_URI;

  const handleLogout = () => {
    axios.post(`${BACKEND_URI}/auth/logout`, {}, { withCredentials: true });
    localStorage.removeItem("username");
    setAuth({
      username: null,
      token: null,
      isAuthenticated: false,
    });
  };

  return (
    <div>
      <div className="navbar bg-base-200 p-4 ">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Logo</a>
        </div>
        <div className="flex-none flex items-center">
          <span className="mr-4">{username}</span>
          <button
            className="btn btn-outline flex items-center"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
