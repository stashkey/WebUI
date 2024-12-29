import "./App.css";
import AuthScreen from "./components/AuthScreen/AuthScreen";
import { AuthProvider } from "./context/AuthContext";
import VaultScreen from "./components/VaultScreen/VaultScreen";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import config from "./config";
import { useEffect } from "react";

function App() {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const a = async () => {
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
}

export default App;
