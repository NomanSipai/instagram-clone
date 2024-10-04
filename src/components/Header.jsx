import { useContext } from "react";
import UserProfile from "./UserProfile";
import { useNavigate } from "react-router-dom";
import UserContext from "./context/UserContext";

const Header = () => {
  const { toggleHeaderList, handleHeaderToggleMenu } = useContext(UserContext);
  const redirect = useNavigate("/createpost");

  return (
    // <nav className="bg-white shadow mb-10">
    //   <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
    //     <div className="text-2xl font-semibold text-gray-800">Logo</div>
    //     <div className="hidden items-center md:flex space-x-4">
    //       <button
    //         className="flex items-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
    //         onClick={() => redirect("/createpost")}
    //       >
    //         <svg
    //           className="w-5 h-5 mr-2"
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           stroke="currentColor"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth={2}
    //             d="M12 4v16m8-8H4"
    //           />
    //         </svg>
    //         <span>Create Post</span>
    //       </button>
    //       <UserProfile />
    //     </div>
    //     <button
    //       onClick={handleHeaderToggleMenu}
    //       className="md:hidden text-gray-700 focus:outline-none"
    //     >
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="h-6 w-6"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         stroke="currentColor"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth={2}
    //           d="M4 6h16M4 12h16m-7 6h7"
    //         />
    //       </svg>
    //     </button>
    //   </div>
    //   {toggleHeaderList && (
    //     <div className="md:hidden">
    //       <a
    //         href="#sign-up"
    //         className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
    //       >
    //         Sign Up
    //       </a>
    //       <a
    //         href="#logout"
    //         className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
    //       >
    //         Logout
    //       </a>
    //       <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
    //         User Profile
    //       </button>
    //     </div>
    //   )}
    // </nav>
    <nav className="bg-white shadow-md mb-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-gray-800">Logo</div>

        {/* Navigation Section */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
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

        {/* Mobile Menu Button */}
        <button
          onClick={handleHeaderToggleMenu}
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

      {/* Mobile Navigation Menu */}
      {toggleHeaderList && (
        <div className="md:hidden bg-white shadow-lg">
          <a
            href="#sign-up"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            Sign Up
          </a>
          <a
            href="#logout"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            Logout
          </a>
          <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200">
            User Profile
          </button>
        </div>
      )}
    </nav>
  );
};

export default Header;
