// src/UserUpdate.js
import React, { useState, useContext } from "react";
// import axios from "axios";
// import { config } from "../confige/confige";
import UserContext from "./context/UserContext";
import { Link } from "react-router-dom";

const UserUpdate = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    username,
    setUsername,
    error,
    setToggleUserUpdateModal,
    handleUpdate,
  } = useContext(UserContext);

  return (
    <div className=" overflow-y-auto  overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 m-auto z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
        onClick={() => setToggleUserUpdateModal(false)}
      />
      <div className="relative p-4 w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl h-full md:h-auto ">
        <div className="relative p-4  rounded-lg shadow sm:p-5 bg-blue-50">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-white">
            <h2 className="text-2xl font-bold">Update User Information</h2>

            <button
              type="button"
              className="text-white bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white"
              data-modal-toggle="updateProductModal"
              onClick={() => setToggleUserUpdateModal(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="black"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>

              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserUpdate;
