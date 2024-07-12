import { signOut } from "firebase/auth";
import logo from "../assets/logo.svg";
import { auth } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex items-center h-12 px-4 mt-1 justify-between bg-[#0c203f] text-[#ddddf7]">
      <span className="text-[#ddddf7] flex gap-3 text-sm font-bold">
        <img src={logo} alt="logo" className="h-4 w-4" /> MyChat
      </span>
      <div className="flex gap-[10px]">
        <img
          src={currentUser.photoURL}
          alt="P"
          className="bg-[#ddddf7] h-8 w-8 rounded-full object-cover"
        />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="text-[#ddddf7] bg-[#f85454] border-none cursor-pointer rounded-sm p-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
