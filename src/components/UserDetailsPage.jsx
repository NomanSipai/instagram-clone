// import { useContext } from "react";
// import UserContext from "./context/UserContext";

import { useEffect, useState } from "react";

const UserPost = () => {
  // const { userDetails } = useContext(UserContext);

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <div className="max-w-4xl mx-auto p-5">
      {/* Profile Header */}
      <div className="flex items-center border-b border-gray-300 pb-4">
        <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-gray-600 dark:text-gray-300">
            {`${userDetails?.user?.first_name[0]} ${userDetails?.user?.last_name[0]}`}
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{`${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`}</h1>
          <p className="mt-2 text-gray-600 flex flex-col items-center">
            <div> {userDetails?.post.length}</div>
            <div>posts</div>
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Edit Profile
          </button>
        </div>
      </div>
      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-2 mt-6">
        {userDetails.post.map((item) => {
          return (
            <div className="flex flex-col m-5">
              <div className="bg-white h-64 shadow-md rounded-lg overflow-hidden">
                <img
                  src={item.image_url}
                  alt="Post 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>{item.description}</div>
            </div>
          );
        })}
        {/* <div className="bg-white h-64 shadow-md rounded-lg overflow-hidden">
          <img
            src="post2.jpg"
            alt="Post 2"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white h-64 shadow-md rounded-lg overflow-hidden">
          <img
            src="post3.jpg"
            alt="Post 3"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white h-64 shadow-md rounded-lg overflow-hidden">
          <img
            src="post4.jpg"
            alt="Post 4"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white h-64 shadow-md rounded-lg overflow-hidden">
          <img
            src="post5.jpg"
            alt="Post 5"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-white h-64 shadow-md rounded-lg overflow-hidden">
          <img
            src="post6.jpg"
            alt="Post 6"
            className="w-full h-full object-cover"
          />
        </div> */}
      </div>
    </div>
  );
};

export default UserPost;
