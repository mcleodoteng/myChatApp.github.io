import VideoChatOutlinedIcon from "@mui/icons-material/VideoChatOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="flex-[2]">
      <div className="flex bg-[#5d5b8d] items-center justify-between p-[10px] text-gray-400">
        <span className="text-white font-semibold flex">
          <div className="rounded-full bg-[#12fd39] w-[10px] h-[10px] my-auto mr-1"></div>
          {data.user?.displayName}
        </span>
        <div className="flex gap-3">
          <VideoChatOutlinedIcon className="cursor-pointer h-6" />
          <PersonAddOutlinedIcon className="cursor-pointer h-6" />
          <MoreHorizOutlinedIcon className="cursor-pointer h-6" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
