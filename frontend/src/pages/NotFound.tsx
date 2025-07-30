import { FaCircle } from "react-icons/fa";
import "@/styles/notfound.css";
const NotFound = () => {
  return (
    <figure className="h-screen w-screen flex items-center justify-center">
      <div className="terminal-loader border-2 border-accent-400 bg-secondary rounded-md">
        <div className="bg-soft flex justify-between items-center p-3">
          <div className="text-accent-600">Status</div>
          <div className="flex gap-2 text-accent-500">
            <FaCircle />
            <FaCircle />
            <FaCircle />
          </div>
        </div>
        <div
          className="mt-[10.5rem] px-3"
          style={{
            marginTop: "2.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <h1 className="text ">Not Found...</h1>
        </div>
      </div>
    </figure>
  );
};

export default NotFound;
