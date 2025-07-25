import axios, { isAxiosError } from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBasicDetails } from "../providers/redux/slices/room";
import { useEffect } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const isAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/auth/user`,
          {
            withCredentials: true,
          }
        );

        const user = res.data.user;
        dispatch(
          setBasicDetails({
            name: user.name,
            profile: user.pic,
            email: user.email,
          })
        );
        navigate("/home/dashboard");
      } catch (err) {
        if (isAxiosError(err)) {
          console.log(err.message);
        }
        navigate("/login");
      }
    };
    isAuth();
  }, [dispatch, navigate]);
};
