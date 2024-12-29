import { FaMoon, FaSignOutAlt, FaSun } from "react-icons/fa";
import config from "../../config";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const themeToggle = async () => {
    const newTheme = theme === "light" ? "black" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <div className="navbar bg-base-200 p-4 ">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Logo</a>
        </div>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
