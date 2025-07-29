import { FaGithub, FaGoogle } from "react-icons/fa";
import "@/styles/login.css";
import { FaCode } from "react-icons/fa";
import { createElement, useRef } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type ProviderProps = {
  name: string;
  icon: React.ElementType;
  label: string;
};
const providers: ProviderProps[] = [
  {
    name: "github",
    icon: FaGithub,
    label: "continue with Github",
  },
  {
    name: "google",
    icon: FaGoogle,
    label: "continue with Google",
  },
];

const ProviderBtn = ({ name, icon, label }: ProviderProps) => {
  return (
    <a
      href={`${import.meta.env.VITE_BACKEND_URL}/auth/${name}`}
      className="border border-soft hover:border-accent-300 hover:bg-accent-600 flex items-center justify-center gap-5 py-2 rounded-md"
    >
      {createElement(icon, { className: "size-[30px]" })}
      <h3>{label}</h3>
    </a>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const loginHandler = async () => {
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    if (!name || !email) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
          credentials: "include",
        }
      );
      if (res.status == 200) navigate("/home/dashboard");
      else toast.error("Login failed");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed");
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <header className="flex gap-2 px-2 ">
        <FaCode className="icon-lg" />
        <h1 className="text-accent-300">CODE JOIN</h1>
      </header>
      <main className="min-w-[460px] w-[40%] max-w-[550px] flex flex-col mt-6 bg-sof border border-accent-100 p-[30px] rounded-md">
        <section className="flex flex-col gap-2">
          {providers.map((provider) => (
            <ProviderBtn key={provider.name} {...provider} />
          ))}
        </section>

        <fieldset className="border-t-2 my-6">
          <legend className="px-2 mx-auto">or</legend>
        </fieldset>

        <section className="flex flex-col gap-3">
          <div className="login-inp-grp">
            <input
              required
              type="text"
              name="text"
              ref={nameRef}
              className="login-input w-full"
            />
            <label className="user-label">Name</label>
          </div>
          <div className="login-inp-grp">
            <input
              required
              type="text"
              name="text"
              ref={emailRef}
              className="login-input w-full"
            />
            <label className="user-label">Email</label>
          </div>
          <Button
            variant={"accent"}
            type="submit"
            className="mt-4"
            onClick={loginHandler}
          >
            Sign Up
          </Button>
        </section>
      </main>
    </div>
  );
};

export default Login;
