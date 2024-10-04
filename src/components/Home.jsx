import React, { useContext, useState } from "react";
import Post from "./Post";
import Header from "./Header";
// import CreatePost from "./CreatePost";
import UserContext from "./context/UserContext";

const Home = () => {
  const { postList } = useContext(UserContext);

  return (
    <>
      <Header />
      {/* <CreatePost /> */}
      <div className="container px-4 mx-auto">
        {/* {isPostClicked && (
          <div>
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity cursor-pointer" />

            <div
              className="fixed inset-0 flex items-center justify-center z-50"
              onClick={() => setIsPostCliked(false)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-full max-h-full p-4">
                <Post item={mainPostClicked} />
              </div>
            </div>
          </div>
        )} */}
        {postList && postList.map((item) => <Post key={item.id} item={item} />)}
      </div>
    </>
  );
};

export default Home;
