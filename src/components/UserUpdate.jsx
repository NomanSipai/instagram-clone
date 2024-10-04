// src/UserUpdate.js
import React, { useState, useContext } from "react";
// import axios from "axios";
// import { config } from "../confige/confige";
import UserContext from "./context/UserContext";

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
    <div className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-75 transition-opacity cursor-pointer"
        onClick={() => setToggleUserUpdateModal(false)}
      />
      <div className="relative p-6 w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Update User Information
          </h2>
          <button
            type="button"
            className="text-gray-600 hover:bg-gray-200 rounded-full p-2"
            onClick={() => setToggleUserUpdateModal(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleUpdate}>
          {["First Name", "Last Name", "Email", "Username"].map(
            (label, index) => (
              <div className="mb-4" key={index}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type={label === "Email" ? "email" : "text"}
                  value={
                    label === "First Name"
                      ? firstName
                      : label === "Last Name"
                      ? lastName
                      : label === "Email"
                      ? email
                      : username
                  }
                  onChange={(e) => {
                    if (label === "First Name") setFirstName(e.target.value);
                    if (label === "Last Name") setLastName(e.target.value);
                    if (label === "Email") setEmail(e.target.value);
                    if (label === "Username") setUsername(e.target.value);
                  }}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )
          )}

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
