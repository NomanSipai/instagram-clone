import React, { useContext, useState } from "react";
// import SubComment from "./SubComment";
import axios from "axios";
import UserContext from "./context/UserContext";
import { config } from "../confige/confige";

const CommentSection = ({ item }) => {
  // const { commentText, user, likes, replies, created_at } = commentArr;
  const [commentList, setCommentList] = useState(item.comments);
  // const { handleDeleteComment } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [toggleSubCom, setToggleSubCom] = useState(false);

  // const [toggleCommnetMenu, setToggleCommentMenu] = useState(false);

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

  console.log("main", item);

  // const handleCommentLike = async (e, id) => {
  //   console.log("like api", id);

  //   setToggleLiked((prev) => !prev);
  //   setLikes((prev) => prev - 1);

  //   try {
  //     const token = JSON.parse(localStorage.getItem("token"));

  //     const response = await axios.post(
  //       `${config.url}likes/post/${id}`,
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

  const handleDeleteComment = async (id) => {
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
    axios.post(`${config.url}reply/`);
  };

  const replies = item?.comments.map((elem) => elem.replies);

  // console.log("data replies");

  // const handleOpenCommentMenu = () => {
  //   setToggleCommentMenu((prev) => !prev);
  // };
  return (
    <section className="bg-white  py-8 lg:py-10 antialiased">
      <div className="max-w-xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">
            Comments {item.comments.length}
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
            <>
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
                    <button
                      id="dropdownComment1Button"
                      data-dropdown-toggle="dropdownComment1"
                      className="inline-flex  items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 "
                      type="button"
                      // onClick={() => setToggleCommentMenu((prev) => !prev)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                        onClick={() => handleDeleteComment(elem?.id)}
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg>
                    </button>
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
                </div>
              </article>
              {/* {toggleSubCom &&
                replies
                  ?.filter((item) => item !== null)
                  .map((elem) => (
                    <SubComment
                      key={elem?.comment_id}
                      user={elem?.user}
                      user_id={elem?.user_id}
                      comment_id={elem?.comment_id}
                      replyLikes={elem?.replyLikes?.length}
                      reply={elem?.reply}
                      created_at={elem?.created_at}
                    />
                  ))} */}
            </>
          ))}
      </div>
    </section>
  );
};

export default CommentSection;
