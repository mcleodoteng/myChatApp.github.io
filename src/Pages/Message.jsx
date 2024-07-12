import { useContext, useEffect, useRef } from "react";
import image from "../assets/pp.jpg";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  //Scrolling to the Lastest Message
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex gap-5 mb-5 ${
        message.senderId === currentUser.uid && "flex-row-reverse"
      } `}
    >
      {/* Profile image/Messages and its orientation */}
      <div className="flex flex-col font-light text-gray-500">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <span>just now</span>
      </div>

      {/* Condition to show Text Message */}
      <div className="max-w-[80%] flex flex-col gap-[10px] h-max">
        {message.text && (
          <p
            className={`bg-white py-[10px] px-5 rounded-[10px] rounded-ss-none max-w-max ${
              message.senderId === currentUser.uid &&
              "bg-[#bac6fc] text-[#000000] ml-auto"
            }`}
          >
            {message.text}
          </p>
        )}
        {/* Show Images Condition */}
        {message.img && (
          <img
            src={message.img}
            alt=""
            className={`h-[40%] w-[35%] ${
              message.senderId === currentUser.uid && "ml-auto"
            }  `}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
