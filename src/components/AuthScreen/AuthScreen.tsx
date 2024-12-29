import AuthBox from "./AuthBox";
import Navbar from "./Navbar";

const AuthScreen = () => {
  return (
    <div className=" flex flex-col content-center">
      <Navbar />
      <div className="flex w-screen justify-center content-center ">
        <AuthBox />
      </div>
    </div>
  );
};

export default AuthScreen;
