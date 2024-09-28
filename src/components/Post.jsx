import React, { useState } from "react";
import CommentSection from "./CommentSection";

const Post = ({ userName, description, image, postImage }) => {
  const [toggleComment, setToggleComment] = useState(false);

  const handleLike = () => {
    setToggleComment((prev) => !prev);
  };

  return (
    <div className="mb-20">
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img className="w-full  object-cover" src={postImage} alt="Post" />
        <div className="p-4">
          <div className="flex items-center">
            <img className="w-10 h-10 rounded-full" src={image} alt="User" />
            <h2 className="ml-2 font-semibold">{userName}</h2>
          </div>
          <p className="mt-2 text-gray-600">{description} #sample #caption</p>
          <div className="mt-4 flex items-center">
            <button className="text-gray-600 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-heart w-5 h-5 "
                viewBox="0 0 16 16"
              >
                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
              </svg>
              Like
            </button>
            <button
              className="ml-4 text-gray-600 hover:text-blue-600"
              onClick={handleLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-chat w-5 h-5"
                viewBox="0 0 16 16"
              >
                <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
              </svg>
              Comment
            </button>
          </div>
        </div>
      </div>
      {toggleComment && <CommentSection />}
    </div>
  );
};

export default Post;
