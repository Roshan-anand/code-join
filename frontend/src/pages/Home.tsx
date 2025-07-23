import Header from "@/components/HomeComponents/Header";
import { ConnectSocket } from "../hooks/ConnectService";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useWsContext } from "@/providers/context/config";

const Home = () => {
  ConnectSocket();
  const loc = useLocation();
  const { socket } = useWsContext();
  useEffect(() => {
    return () => {
      if (loc.pathname == "/home/sandbox") {
        console.log("user left sandbox");
        socket?.emit("leave-sandbox");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc]);

  return (
    <div className="min-h-screen h-screen flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export default Home;
