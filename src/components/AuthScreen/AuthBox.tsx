import axios from "axios";
import config from "../../config";
import { MouseEventHandler, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AuthBox = () => {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const BACKEND_URI = config.BACKEND_URI;

  const handleLogin: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${BACKEND_URI}/auth/login`,
        {
          username,
          password,
        },
        { withCredentials: true },
      )
      .then((res) => {
        // console.log(res.data);
        if (res.status == 404) {
          console.log("User Not Found");
        }
      })
      .catch((err) => {
        console.log("ERROR FETCHING AUTH TOKEN");
        console.error(err);
      });
    localStorage.setItem("username", username);
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
        console.error(err);
        console.log("ERROR FETCHING REFRESH TOKEN");
        setAuth({
          username: null,
          token: null,
          isAuthenticated: false,
        });
      });
  };

  const handleRegister: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl p-6">
      <h2 className="card-title mb-4">{isLogin ? "Login" : "Register"}</h2>
      <form className="form-control">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered mb-2"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Master Password"
          className="input input-bordered mb-4"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {isLogin && (
          <button onClick={handleLogin} className="btn btn-primary">
            Login
          </button>
        )}
        {!isLogin && (
          <button onClick={handleRegister} className="btn btn-primary">
            Register
          </button>
        )}
        <div
          className="mt-2 mr-5 text-right cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Register instead" : "Login instead"}?
        </div>
      </form>
    </div>
  );
};

export default AuthBox;
