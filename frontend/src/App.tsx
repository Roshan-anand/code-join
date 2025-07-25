import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Sandbox from "./components/Sandbox";
import Dashboard from "./components/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home/sandbox" element={<Sandbox />} />
          <Route path="/home/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
