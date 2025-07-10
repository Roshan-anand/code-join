import Header from "@/components/HomeComponents/Header";
import { ConnectSocket } from "../hooks/ConnectService";
import { Outlet } from "react-router-dom";

const Home = () => {
  ConnectSocket();
  return (
    <div className="min-h-screen h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Home;
