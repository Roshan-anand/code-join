import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <header></header>
      <main className="w-2/3 h-2/3 mx-auto mt-10">
        <button onClick={() => navigate("/login")}>login</button>
      </main>
    </>
  );
};

export default Landing;
