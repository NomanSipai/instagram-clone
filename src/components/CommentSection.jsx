import React, { useContext, useState, useCallback } from "react";
import { throttle } from "lodash";
import SubComment from "./SubComment";
import axios from "axios";
import UserContext from "./context/UserContext";
import { config } from "../confige/confige";

const CommentSection = ({ item, setCommentLength, commentLength }) => {
  // const { commentText, user, likes, replies, created_at } = commentArr;
  const [commentList, setCommentList] = useState(item.comments);
  // const { handleDeleteComment } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [toggleSubCom, setToggleSubCom] = useState(false);
  const newReplyList = item?.comments?.map((elem) => elem?.replies);
  const [replyList, setReplyList] = useState(newReplyList);
  const [toggleCommentLike, setToggleCommentLike] = useState(false);

  // const [toggleCommnetMenu, setToggleCommentMenu] = useState(false);
  console.log("replyList", replyList);

  const handleCancelComment = () => {
    setComment("");
  };

  const handleCommentSubmit = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    let data = {
      comment: comment,
      user: user,
    };
    let newComment = [...commentList, data];
    newComment.reverse();
    setCommentList(newComment);
    setCommentLength(newComment.length);

    setComment("");
    if (comment.trim()) {
      axios.post(
        `${config.url}comments/${item?.id}`,
        {
          comment,
        },
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
    }
  };

  // const handleLikeApiCall = async (id) => {
  //   console.log("like api", id);

  //   setToggleCommentLike((prev) => !prev);

  //   // setToggleLiked(false);

  //   setToggleCommentLike((prev) => prev - 1);

  //   try {
  //     const token = JSON.parse(localStorage.getItem("token"));

  //     const response = await axios.post(
  //       `${config.url}likes/comment/${id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     console.log("Post liked successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error liking the post:", error);
  //   }
  // };

  // const handleCommentLike = useCallback(
  //   throttle((e, id) => handleLikeApiCall(id), 2000), // Adjust the time (2000ms) as needed
  //   []
  // );

  // const handleCommentRemoveLike = async (id) => {
  //   setToggleCommentLike((prev) => !prev);
  //   // setToggleLiked(true);

  //   setToggleCommentLike((prev) => prev + 1);

  //   try {
  //     const token = JSON.parse(localStorage.getItem("token"));

  //     const response = await axios.post(
  //       `${config.url}likes/comment/${id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: token,
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     console.log("Post liked successfully:", response.data);
  //   } catch (error) {
  //     console.error("Error liking the post:", error);
  //   }
  // };

  const handleLikeApiCall = async (id) => {
    console.log("like api", id);

    setToggleCommentLike((prev) => prev + 1); // Increment for UI feedback

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(
        `${config.url}likes/comment/${id}`,
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

  const handleCommentLike = useCallback(
    throttle((id) => handleLikeApiCall(id), 2000),
    []
  );

  const handleCommentRemoveLike = async (id) => {
    setToggleCommentLike((prev) => prev - 1); // Decrement for UI feedback

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.post(
        `${config.url}likes/comment/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );

      console.log("Post unliked successfully:", response.data);
    } catch (error) {
      console.error("Error unliking the post:", error);
    }
  };

  console.log("main subcomment", item);

  const handleDeleteComment = async (id) => {
    const filterCommentList = commentList.filter((item) => item.id !== id);
    setCommentList(filterCommentList);
    setCommentLength(filterCommentList.length);

    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.delete(`${config.url}comments/${id}`, {
        headers: {
          Authorization: token,
        },
        withCredentials: true,
      });

      console.log("comment deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting the comment:", error);
    }
  };

  const handleReply = (id) => {
    setToggleSubCom((prev) => !prev);
    axios.post(`${config.url}reply/${id}`);
  };

  // const replies = item?.comments.map((elem) => elem.replies);

  // console.log("data replies");

  // const handleOpenCommentMenu = () => {
  //   setToggleCommentMenu((prev) => !prev);
  // };
  return (
    <section className="bg-white  py-8 lg:py-10 antialiased">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Comments {commentLength}
          </h2>
        </div>
        <div className="rounded-lg p-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex justify-end mt-2">
            <button
              className="mr-2 text-gray-500 hover:text-gray-700 hover:bg-gray-300 px-2 rounded-lg"
              onClick={handleCancelComment}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handleCommentSubmit}
            >
              Comment
            </button>
          </div>
        </div>
        {/* {item?.comments} */}
        {commentList
          .filter((elem) => elem !== null)
          .map((elem) => (
            <div key={elem?.id}>
              <article className=" text-base bg-white rounded-lg ">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 ">
                      <div className=" mr-2 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                          {`${elem?.user?.username[0]}`}
                        </span>
                      </div>

                      {elem?.user?.username}
                    </p>
                    <p className="text-sm text-gray-600 ">
                      <time>{elem?.created_at}</time>
                    </p>
                  </div>

                  <div>
                    {user && (
                      <button
                        id="dropdownComment1Button"
                        data-dropdown-toggle="dropdownComment1"
                        className="inline-flex  items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
                        type="button"
                        onClick={() => handleDeleteComment(elem?.id)}
                        // onClick={() => setToggleCommentMenu((prev) => !prev)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={16}
                          height={16}
                          fill="currentColor"
                          className="bi bi-x-lg"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                      </button>
                    )}
                  </div>
                  {/* Dropdown menu */}
                  {/* {toggleCommnetMenu && (
                    <div
                      id="dropdownComment1"
                      className=" z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow "
                    >
                      <ul
                        className="py-1 text-sm text-gray-700"
                        aria-labelledby="dropdownMenuIconHorizontalButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100"
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100"
                          >
                            Remove
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block py-2 px-4 hover:bg-gray-100"
                          >
                            Report
                          </a>
                        </li>
                      </ul>
                    </div>
                  )} */}
                </footer>
                <p className="text-gray-500 my-2 ms-5">{elem?.comment}</p>
                <div className="flex items-center mt-4 space-x-4">
                  <button
                    type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline font-medium"
                    onClick={() => handleReply(elem?.id)}
                  >
                    <svg
                      className="mr-1.5 w-3.5 h-3.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                      />
                    </svg>
                    Reply
                  </button>
                  {toggleCommentLike ? (
                    <button
                      className="flex items-center text-sm text-gray-500 hover:underline font-medium"
                      onClick={() => handleCommentLike(elem?.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        className="bi bi-hand-thumbs-up-fill w-6 h-6"
                        viewBox="0 0 20 18"
                      >
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      className="flex items-center text-sm text-gray-500 hover:underline font-medium"
                      onClick={() => handleCommentRemoveLike(elem?.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="bi bi-hand-thumbs-up-fill w-6 h-6"
                        viewBox="0 0 20 18"
                      >
                        <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2 2 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a10 10 0 0 0-.443.05 9.4 9.4 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a9 9 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.2 2.2 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.9.9 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                      </svg>
                    </button>
                  )}
                </div>
              </article>
              {toggleSubCom &&
                replyList
                  ?.filter((item) => item !== null)
                  .map((elem) => (
                    <SubComment
                      key={elem?.comment_id}
                      user={elem}
                      user_id={elem?.user_id}
                      comment_id={elem?.comment_id}
                      replyLikes={elem?.replyLikes?.length}
                      reply={elem?.reply}
                      created_at={elem?.created_at}
                    />
                  ))}
            </div>
          ))}
      </div>
    </section>
  );
};

export default CommentSection;
