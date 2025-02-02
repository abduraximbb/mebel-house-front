import { useEffect, useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="text-gray-900 dark:text-white transition-all duration-300"
    >
      {theme === "dark" ? (
        <BsMoon size={22} />
      ) : (
        <BsSun size={24} className="text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
