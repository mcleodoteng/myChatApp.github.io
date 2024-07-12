import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
//import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { useContext, useState } from "react";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          // setError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChat", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChat", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImage(null);
  };
  return (
    <div className="h-[60px] bg-white p-[10px] flex items-center justify-between -mt-1">
      <div className="w-[85%] overflow-hidden">
        <textarea
          type="text"
          onChange={(e) => setText(e.target.value)}
          placeholder="Type Something..."
          value={text}
          className="w-full border-none outline-none text-base overflow-hidden text-[#2f2d52] placeholder:text-[#8a8a8a]"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="file"
          style={{ display: "none" }}
          onChange={(e) => setImage(e.target.files[0])}
          id="file"
          className="w-full"
        />
        <label htmlFor="file">
          <ImageOutlinedIcon className="h-6 cursor-pointer" />
          {/* <AttachFileOutlinedIcon className="h-6 cursor-pointer" /> */}
        </label>
        <button
          onClick={handleSend}
          className="border-none py-2 px-3 text-white bg-[#8da4f1]"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Input;
