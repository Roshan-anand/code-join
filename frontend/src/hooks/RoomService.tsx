import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../providers/redux/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setFolderStructure } from "../providers/redux/slices/file";
import { useWsContext } from "../providers/context/config";
import { setRoomInfo } from "@/providers/redux/slices/room";

const useRoomServices = (
  setisLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const navigate = useNavigate();

  //gloabl state from redux
  const dispatch = useDispatch();
  const { userName, profile } = useSelector((state: ReduxState) => state.room);

  //socket from context
  const { socket } = useWsContext();

  //listen room events
  useEffect(() => {
    if (!socket) return;
    if (socket.hasListeners("room-created")) return;
    //listen room-created event
    socket.on("room-created", (roomID) => {
      dispatch(setRoomInfo(roomID));
      navigate("/home/sandbox");
    });

    //listen room-joined event
    socket.on("room-joined", (roomID) => {
      dispatch(setRoomInfo(roomID));
      navigate("/home/sandbox");
    });

    //listen container-details event
    socket.on("folder-details", (data: string) => {
      dispatch(setFolderStructure(data));
    });

    //listen error event
    socket.on("error", (msg) => {
      setisLoading(false);
      toast.error(msg);
    });

    //clean up
    return () => {
      socket.off("room-created");
      socket.off("room-joined");
      socket.off("container-details");
      socket.off("error");
    };
  }, [socket, dispatch, navigate, setisLoading]);

  //to join a room
  const joinRoom = (roomID: string) => {
    setisLoading(true);
    socket?.emit("join-room", { roomID, name: userName, profile });
  };

  //to create a room
  const createRoom = (title: string) => {
    setisLoading(true);
    socket?.emit("create-room", {
      name: userName,
      profile,
      title,
    });
  };

  return { joinRoom, createRoom };
};

export default useRoomServices;
