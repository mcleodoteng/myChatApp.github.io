import { useContext, useEffect, useState } from "react";
// import image from "../assets/pp.jpg";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  console.log(Object.entries(chats));
  return (
    <div>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
            className="p-3 flex items-center gap-3 cursor-pointer text-white hover:bg-[#2f2d52]"
          >
            <img
              src={chat[1].userInfo.photoURL}
              alt="image"
              className="w-[50px] h-[50px] rounded-full object-cover relative"
            />
            <div className="rounded-full bg-[#12fd39] w-[10px] h-[10px] ml-[42px] mt-4 absolute"></div>
            <div>
              <span className="text-lg font-normal">
                {chat[1].userInfo.displayName}
              </span>
              <p className="text-sm font-ligh text-gray-400">
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
