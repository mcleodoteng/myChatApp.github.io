import { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <>
      <div className="bg-[#a7bcff] flex justify-center items-center h-[100vh]">
        <div className="bg-white py-5 px-[60px] rounded-xl flex flex-col items-center gap-[10px]">
          <span className="text-[#5d5b8d] flex gap-3 text-xl font-bold">
            <img src={logo} alt="logo" className="h-8 w-8" /> MyChat
          </span>
          <span className="text-[#5d5b8d]">Login</span>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="email"
              className="p-4 border-b w-[300px] outline-none border-b-[#a7bcff] placeholder:text-gray-500"
            />
            <input
              type="password"
              placeholder="password"
              className="p-4 border-b w-[300px] outline-none border-b-[#a7bcff] placeholder:text-gray-500"
            />
            <button className="bg-[#7b96ec] text-white p-2 border-none cursor-pointer">
              Login
            </button>
          </form>
          {err && <span className="text-red-500">Something went wrong</span>}
          <p className="mt-3 text-sm text-[#5d5b8d]">
            You don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
