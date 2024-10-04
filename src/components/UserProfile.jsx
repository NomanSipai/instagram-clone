import UserContext from "./context/UserContext";
import { useContext } from "react";

const UserProfile = () => {
  const { user, toggleUserProfile, handleToggleUserProfile, handleSignOut } =
    useContext(UserContext);

  return (
    <div className="max-w-xs relative inline-block text-left">
      <button
        onClick={handleToggleUserProfile}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
      >
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 uppercase dark:text-gray-300">
            {`${user.username ? user.username[0] : ""}`}
          </span>
        </div>
      </button>

      {toggleUserProfile && (
        <div className="absolute right-0 z-10 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200">
          <div className="p-4">
            <p className="text-lg font-semibold text-gray-800 truncate">
              {user ? user.username : ""}
            </p>
            <p className="text-sm text-gray-600">
              {user ? `${user.first_name} ${user.last_name}` : ""}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              {user ? user.email : ""}
            </p>
            <hr className="border-gray-200 mb-2" />
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
