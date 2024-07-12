import NavBar from "./NavBar";
import Search from "./Search";
import Chats from "./Chats";
const Sidebar = () => {
  return (
    <div className="flex-1 bg-[#3e3c61]">
      <NavBar />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
