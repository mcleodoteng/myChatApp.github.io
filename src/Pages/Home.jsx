import Sidebar from "./Sidebar";
import Chat from "./Chat";
const Home = () => {
  return (
    <div className="bg-[#a7bcff] h-[100vh] flex items-center justify-center">
      <div className="border border-white rounded-xl w-[70%] h-[80%] flex overflow-hidden">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
