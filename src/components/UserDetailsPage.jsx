import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import UserUpdate from "./UserUpdate";
import Post from "./Post";
const UserPost = () => {
  // const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const {
    user,
    handleUserUpdateData,
    toggleUserUpdateModal,
    userDetails,
    toggleUserPost,
    setToggleUSerPost,
    setClickPost,
    clickPost,
  } = useContext(UserContext);

  let userDetailsId = userDetails?.user?.id;
  let userId = user?.id;

  const handleUserPost = (id) => {
    const clickPost = userDetails?.post?.find((item) => item.id === id);
    setClickPost(clickPost);
    setToggleUSerPost(true);
  };

  return (
    // <div className="max-w-4xl mx-auto p-5">
    //   {toggleUserUpdateModal && <UserUpdate />}
    //   <div className="flex items-center border-b border-gray-300 pb-4">
    //     <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    //       <span className="font-medium text-gray-600 dark:text-gray-300">
    //         {`${userDetails?.user?.first_name[0]} ${userDetails?.user?.last_name[0]}`}
    //       </span>
    //     </div>

    //     <div>
    //       <h1 className="text-2xl font-semibold">{`${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`}</h1>
    //       <p className="mt-2 text-gray-600 flex flex-col items-center">
    //         <div> {userDetails?.post.length}</div>
    //         <div className="mb-4">posts</div>
    //       </p>
    //       {userDetailsId === userId && (
    //         <button
    //           to="/userupdate"
    //           className="mt-5 px-4 py-2 bg-blue-600 text-white rounded"
    //           onClick={handleUserUpdateData}
    //         >
    //           Edit Profile
    //         </button>
    //       )}
    //     </div>
    //   </div>

    //   {toggleUserPost && (
    //     <div>
    //       <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity cursor-pointer" />

    //       <div
    //         className="fixed inset-0 flex items-center justify-center z-50"
    //         onClick={() => setToggleUSerPost(false)}
    //       >
    //         <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-full max-h-full p-4">
    //           <Post item={clickPost} />
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   <div className="grid grid-cols-3 gap-2 mt-6">
    //     {userDetails?.post?.map((item) => {
    //       console.log(item);

    //       return (
    //         <React.Fragment key={item.id}>
    //           <div
    //             key={item?.id}
    //             className="flex flex-col m-5"
    //             onClick={() => handleUserPost(item.id)}
    //           >
    //             <div className="bg-white h-64 shadow-md rounded-lg overflow-hidden">
    //               <img
    //                 src={item.image_url}
    //                 alt="Post 1"
    //                 className="w-full h-full object-cover"
    //               />
    //             </div>
    //             <div>{item.description}</div>
    //           </div>
    //         </React.Fragment>
    //       );
    //     })}
    //   </div>
    // </div>
    <div className="max-w-4xl mx-auto p-6">
      {toggleUserUpdateModal && <UserUpdate />}

      <div className="flex items-center border-b border-gray-300 pb-6 mb-4">
        <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-200 rounded-full shadow-lg">
          <span className="font-bold text-gray-600 text-2xl">
            {`${userDetails?.user?.first_name[0]}${userDetails?.user?.last_name[0]}`}
          </span>
        </div>

        <div className="ml-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {`${userDetails?.user?.first_name} ${userDetails?.user?.last_name}`}
          </h1>
          <p className="mt-1 text-gray-600 text-sm">
            <span className="font-semibold">{userDetails?.post.length}</span>{" "}
            posts
          </p>
          {userDetailsId === userId && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition duration-200"
              onClick={handleUserUpdateData}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {toggleUserPost && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity cursor-pointer" />
          <div
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={() => setToggleUSerPost(false)}
          >
            <div className=" rounded-lg shadow-lg overflow-hidden max-w-lg max-h-full p-2">
              <Post item={clickPost} />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {userDetails?.post?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col group m-2 cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleUserPost(item.id)}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image_url}
                alt="Post"
                className="w-full h-64 object-cover transition duration-200 group-hover:scale-110"
              />
            </div>
            <div className="mt-2 text-gray-800 font-medium">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPost;
