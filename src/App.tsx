import "./App.css";
import AuthScreen from "./components/AuthScreen/AuthScreen";
import { AuthProvider } from "./context/AuthContext";
import VaultScreen from "./components/VaultScreen/VaultScreen";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import config from "./config";
import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { auth, setAuth } = useAuth();
  const { setTheme } = useTheme();

  useEffect(() => {
    const a = async () => {
      const theme = localStorage.getItem("theme") || "black";
      setTheme(theme);
      document.documentElement.setAttribute("data-theme", theme);
      const BACKEND_URI = config.BACKEND_URI;
      const username = localStorage.getItem("username");
      await axios
        .post(
          `${BACKEND_URI}/auth/refresh`,
          {
            username,
          },
          { withCredentials: true },
        )
        .then((res) => {
          // console.log(res.data);
          setAuth({
            username,
            token: res.data.token,
            isAuthenticated: true,
          });
        })
        .catch((err) => {
          // console.error(err);
          console.log("ERROR FETCHING REFRESH TOKEN");
          setAuth({
            username: null,
            token: null,
            isAuthenticated: false,
          });
        });
    };
    a();
  }, [setAuth]);

  return <>{auth.isAuthenticated ? <VaultScreen /> : <AuthScreen />}</>;
  // return <AuthScreen />;
}

export default App;
