import logo from "../assets/logo.svg";
import ImageIcon from "@mui/icons-material/Image";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChat", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="bg-[#a7bcff] flex justify-center items-center h-[100vh]">
      <div className="bg-white py-5 px-[60px] rounded-xl flex flex-col items-center gap-[10px]">
        <span className="text-[#5d5b8d] flex gap-3 text-xl font-bold">
          <img src={logo} alt="logo" className="h-8 w-8" /> MyChat
        </span>
        <span className="text-[#5d5b8d]">Register</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-4 border-b w-[300px] outline-none border-b-[#a7bcff] placeholder:text-gray-500"
          />
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
          <input type="file" id="file" style={{ display: "none" }} />
          <label
            htmlFor="file"
            className="my-3 flex items-center cursor-pointer"
          >
            <ImageIcon className="text-[#a7bcff] mx-2" />
            <p>Upload Profile Picture</p>
          </label>
          <button className="bg-[#7b96ec] text-white p-2 border-none cursor-pointer">
            Sign up
          </button>
          {err && <span className="text-red-500">Something went wrong</span>}
        </form>

        <p className="mt-3 text-sm text-[#5d5b8d]">
          You have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
