import React from "react";
import notFoundImage from "@/assets/hero_home.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";

const NotFound = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
      style={{ backgroundImage: `url(${notFoundImage})` }}
    >
      <div className={`max-w-md mx-auto text-center p-8 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
        <div className={`text-9xl font-bold mb-4 ${isDarkMode ? 'text-yellow-400' : 'text-bg-primary'}`}>404</div>
        <h1 className="text-4xl font-bold mb-6">
          Oops! Page Not Found
        </h1>
        <p className="text-lg mb-8">
          The page you're looking for seems to have gone on a little adventure.
          Don't worry, we'll help you find your way back home.
        </p>
        <button
          onClick={() => navigate("/")}
          className={`inline-block font-semibold px-6 py-3 rounded-md transition-colors duration-300 ${isDarkMode ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600' : 'bg-bg-primary text-white hover:bg-yellow-700'}`}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default React.memo(NotFound);
