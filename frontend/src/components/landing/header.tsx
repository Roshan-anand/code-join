import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FaCode } from "react-icons/fa6";

export const HeroHeader = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <nav className="fixed z-20 w-full max-w-7xl top-0">
        <div
          className={cn(
            "mx-auto mt-2 max-w-7xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex items-center gap-2">
              <FaCode className="icon-md" />
              <h3 className="text-accent-500 font-bold">CODE JOIN</h3>
            </div>
            <Button
              onClick={() => navigate("/login")}
              className="bg-text text-primary font-bold px-4"
            >
              login
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};
