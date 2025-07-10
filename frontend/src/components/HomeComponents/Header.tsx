import { ReduxState } from "@/providers/redux/store";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Header = () => {
  const { profile, userName } = useSelector((state: ReduxState) => state.room);
  return (
    <header className="px-3 py-2 flex items-center justify-between">
      <h1 className="text-accent-300">JOIN CODE.</h1>
      <div className="w-[8vh] overflow-hidden min-w-[60px] bg-accent-300 rounded-full relative">
        {!profile ? (
          <img
            src={`${profile}`}
            alt={`${userName}`}
            className="size-full object-cover rounded-full border-4 border-accent-300"
          />
        ) : (
          <FaCircleUser className="size-full text-accent-500" />
        )}
      </div>
    </header>
  );
};

export default Header;
