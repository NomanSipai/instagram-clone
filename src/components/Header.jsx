import { useState } from "react";
import UserProfile from "./UserProfile";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-white shadow mb-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800">Logo</div>
        <div className="hidden items-center md:flex space-x-4">
          <a href="#sign-up" className="text-gray-700 hover:text-blue-500">
            Login
          </a>
          <a href="#logout" className="text-gray-700 hover:text-blue-500">
            Logout
          </a>
          <UserProfile />
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a
            href="#sign-up"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Sign Up
          </a>
          <a
            href="#logout"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </a>
          <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
            User Profile
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
