import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Avatar = ({ img }) => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useMemo(() => JSON.parse(localStorage.getItem("user")), []);

  const navigate = useNavigate();

  console.log("users", user.email);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = () => {
    console.log("Sign out");
    setIsOpen(false);
    toast.success("You have successfully logged out.");
    sessionStorage.removeItem("jwtToken");
    navigate("/");
  };

  return (
    <div className=" max-w-xs relative inline-block text-left">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
      >
        <img
          className="w-10 h-10 rounded-full"
          src="https://robohash.org/possimusquicorrupti.png?size=50x50&set=set1"
          alt="Rounded avatar"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <p className="px-4 py-2 text-sm text-gray-700">{user.username}</p>
            <p className="px-4 py-2 text-sm text-gray-700">{`${user.first_name} ${user.last_name}`}</p>
            <p className="px-4 py-2 text-sm text-gray-500">{user.email}</p>
            <hr className="my-1" />
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
