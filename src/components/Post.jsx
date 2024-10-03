import React, { useState, useCallback } from "react";
import CommentSection from "./CommentSection";
import axios from "axios";
import { Link } from "react-router-dom";
import { config } from "../confige/confige";
import { throttle } from "lodash";
import { useContext } from "react";
import UserContext from "./context/UserContext";
import SkeletonLoder from "./skeleton-loader/SkeletonLoder";

const Post = ({ item }) => {
  const [toggleComment, setToggleComment] = useState(false);
  const [toggleLiked, setToggleLiked] = useState(false);
  const [commentLength, setCommentLength] = useState(item?.comments?.length);
  const [likes, setLikes] = useState(item?.post_likes?.length);
  const { handleUserDetail, skeletonLoder } = useContext(UserContext);
  // const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  // let userDetailsId = userDetails?.user?.id;

  const handleComment = () => {
    setToggleComment((prev) => !prev);
  };

  // //               sdgfdfgfd
  const handleLikeApiCall = async (id) => {
    console.log("like api", id);

    setToggleLiked((prev) => !prev);

    // setToggleLiked(false);

    setLikes((prev) => prev - 1);

    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.post(
        `${config.url}likes/post/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      console.log("Post liked successfully:", response.data);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleLike = useCallback(
    throttle((e, id) => handleLikeApiCall(id), 2000), // Adjust the time (2000ms) as needed
    []
  );

  const handleDisliked = async (id) => {
    setToggleLiked((prev) => !prev);
    // setToggleLiked(true);

    setLikes((prev) => prev + 1);
    console.log("likes!", likes);

    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.post(
        `${config.url}likes/post/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      console.log("Post liked successfully:", response.data);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  return (
    <>
      <div className="mb-20">
        {skeletonLoder ? (
          <SkeletonLoder />
        ) : (
          <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <img
              className="w-full  object-cover"
              src={item?.image_url}
              alt="Post"
            />
            <div className="p-4">
              <Link
                to="/userdetails"
                onClick={() => handleUserDetail(item?.user_id)}
              >
                <div className="flex items-center">
                  <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      {`${item?.user?.username[0]}`}
                    </span>
                  </div>

                  <h2 className="ml-2 font-semibold">{item?.user?.username}</h2>
                </div>
              </Link>

              <p className="mt-2 text-gray-600">{item?.description}</p>
              <div className="mt-4 flex items-center">
                <button className="text-gray-600 hover:text-blue-600 flex items-center ">
                  {toggleLiked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="red"
                      className="bi bi-heart-fill w-5 h-5 me-2"
                      viewBox="0 0 16 16"
                      onClick={(e) => handleLike(e, item?.id)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                      />
                    </svg>
                  ) : (
                    // likes
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-heart w-5 h-5 me-2 "
                      viewBox="0 0 16 16"
                      onClick={() => handleDisliked(item?.id)}
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                    // dislike
                  )}

                  <span className="text-blue-500">{likes}</span>
                </button>
                <button
                  className="ml-4 text-gray-600 hover:text-blue-600 flex items-center"
                  onClick={handleComment}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="bi bi-chat w-5 h-5 me-2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                  </svg>
                  <span className="text-blue-500">{commentLength}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {toggleComment && (
          <CommentSection
            commentLength={commentLength}
            setCommentLength={setCommentLength}
            item={item}
          />
        )}
      </div>
    </>
  );
};

export default Post;
