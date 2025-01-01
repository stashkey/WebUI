import "./App.css";
import AuthScreen from "./components/AuthScreen/AuthScreen";
// import { AuthProvider } from "./context/AuthContext";
import VaultScreen from "./components/VaultScreen/VaultScreen";
import { useAuth } from "./context/AuthContext";
import axios from "axios";
import config from "./config";
import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import DeriveKey from "./utils/DeriveKey";
import EncryptBuffer from "./utils/EncryptBuffer";
import { MdDeck } from "react-icons/md";
import DecryptBuffer from "./utils/DecryptBuffer";

function App() {
  useEffect(() => {
    const a = async () => {
      const buffer = new ArrayBuffer(10);
      const view = new Uint8Array(buffer);
      crypto.getRandomValues(view);

      console.log("Buffer", view);

      const key = await DeriveKey("password123", "salt123", 10);

      const { encryptedBuffer, iv } = await EncryptBuffer(buffer, key);
      console.log("Encrypted", encryptedBuffer, iv);

      const decrypted = await DecryptBuffer(encryptedBuffer, iv, key);
      console.log("Decrypted", new Uint8Array(decrypted));
    };
    a();
  }, []);

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
  }, [setTheme, setAuth]);

  return <>{auth.isAuthenticated ? <VaultScreen /> : <AuthScreen />}</>;
  // return <AuthScreen />;
}

export default App;
