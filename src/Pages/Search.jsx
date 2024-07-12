import { useContext, useState } from "react";
// import image from "../assets/pp.jpg";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check if the chat collection already exist in the firestore database, if not create a new one
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));

      //create new user chat if it doesnt already exist
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //User Chat
        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChat", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setError(true);
    }
    setUser(null);
    setUsername("");
  };
  return (
    <div className="border-b border-b-slate-500">
      <div className="border-b border-b-slate-500 p-2">
        <input
          type="text"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Find a user"
          value={username}
          className="bg-transparent border-none text-white outline-none placeholder:text-gray-400"
        />
      </div>
      {err && <span className="text-red-500">User Not Found!</span>}
      {user && (
        <div
          onClick={handleSelect}
          className="p-3 flex items-center gap-3 cursor-pointer text-white hover:bg-[#2f2d52]"
        >
          <img
            src={user.photoURL}
            alt="pp"
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
          <div>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
