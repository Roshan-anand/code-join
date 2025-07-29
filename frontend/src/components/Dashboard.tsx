import { FaSearch, FaToolbox } from "react-icons/fa";
import { projects } from "../lib/languages";
import { createElement, useRef, useState } from "react";
import { RiLoaderFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import useRoomServices from "../hooks/RoomService";
import { Project } from "@/lib/Types";
import { MdAdd } from "react-icons/md";
import { setRunCmd } from "@/providers/redux/slices/file";
import { Button } from "./ui/button";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [isLoading, setisLoading] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [search, setSearch] = useState("");

  const { createRoom, joinRoom } = useRoomServices(setisLoading); //hook to listen to room events

  //to join a room
  const idInput = useRef<HTMLInputElement>(null);
  const handleJoinRoom = () => {
    const value = idInput.current?.value;
    if (!value || value == "") {
      toast.error("Please enter a room ID");
      return;
    }
    joinRoom(value);
  };

  return (
    <main className="mt-20 h-[90%] flex flex-col items-center">
      <div className="bg-secondary w-2/3 h-[35vh] md:size-[800px] rounded-lg overflow-hidden  flex flex-col">
        {isLoading && (
          <div className="absolute top-0 left-0 backdrop-blur-[2px] bg-white/5 size-full flex justify-center items-center">
            <RiLoaderFill className="size-[100px] text-accent-500 animate-spin" />
          </div>
        )}
        <header className="p-3 bg-soft flex gap-5">
          <FaToolbox className="icon-md" />
          <h3>Choose a language to work</h3>
        </header>

        <section className="flex-1 flex px-2 gap-2 ">
          <figure className="flex-1 flex flex-col gap-2 items-center px-4 py-2">
            {projects.map((data) => {
              if (data.title.toLowerCase().includes(search.toLocaleLowerCase()))
                return (
                  <Button
                    variant={"soft"}
                    key={data.title}
                    className="justify-start w-full"
                    onClick={() => setCurrentProject(data)}
                  >
                    {createElement(data.icon, { className: "icon-md" })}
                    <h3 className="text-text">{data.title}</h3>
                  </Button>
                );
            })}
          </figure>
          <div className="w-[2px] border-4 border-soft"></div>
          <div className="flex flex-col items-end w-[70%] gap-2 py-2">
            <figure className="border-2 border-accent-600 flex items-center w-1/2 py-1 rounded-md px-2">
              <input
                type="text"
                className="grow outline-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="text-accent-600" />
            </figure>

            <article className="grow py-2 rounded-md w-[90%]">
              {currentProject && (
                <>
                  <header className="p-3 bg-soft flex gap-5 relative">
                    {createElement(currentProject.icon, {
                      className: "icon-md",
                    })}
                    <h3>{currentProject.title}</h3>
                    <p className="absolute top-0 right-0 px-2 py-1 border-l-[4px] border-b-[4px] font-bold border-secondary">
                      {currentProject.type}
                    </p>
                  </header>
                  <section className="p-3">
                    <p>{currentProject.description}</p>
                    <div className="flex justify-end">
                      <Button
                        variant={"accent"}
                        className="py-1"
                        onClick={() => {
                          dispatch(setRunCmd(currentProject.runCmd));
                          createRoom(currentProject.title);
                        }}
                      >
                        <MdAdd />
                        <h3>create</h3>
                      </Button>
                    </div>
                  </section>
                </>
              )}
            </article>

            <figure className="flex items-center w-fit p-3 gap-3">
              <h3>OR</h3>
              <input
                type="text"
                className="flex-1 px-1 border-2 border-accent-600 h-full rounded-md outline-none font-bold"
                ref={idInput}
                placeholder="roomID123"
              />
              <Button variant={"accent"} onClick={handleJoinRoom}>
                <h3>Join Room</h3>
              </Button>
            </figure>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
