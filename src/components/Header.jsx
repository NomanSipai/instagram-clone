import { useState } from "react";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const redirect = useNavigate("/createpost");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-white shadow mb-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800">Logo</div>
        <div className="hidden items-center md:flex space-x-4">
          <button
            className="flex items-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => redirect("/createpost")}
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Create Post</span>
          </button>
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
