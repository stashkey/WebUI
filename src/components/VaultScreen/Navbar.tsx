import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { FaMoon, FaSignOutAlt, FaSun } from "react-icons/fa";
import config from "../../config";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const username = auth.username;
  const BACKEND_URI = config.BACKEND_URI;
  const { theme, setTheme } = useTheme();

  const themeToggle = () => {
    if (theme === "black") {
      setTheme("light");
    } else {
      setTheme("black");
    }
    document.documentElement.setAttribute("data-theme", theme);
  };

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
        <span className="mr-4">{username}</span>
        <div className="flex-none flex items-center">
          <button className="btn btn-outline mr-4" onClick={themeToggle}>
            {theme === "black" ? (
              <span className="">
                <FaSun />
              </span>
            ) : (
              <span className="">
                <FaMoon />
              </span>
            )}
          </button>
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
