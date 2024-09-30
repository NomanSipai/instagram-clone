import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [postList, setPostList] = useState([]);

  const redirect = useNavigate();

  //   login

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;

    try {
      const res = await axios.post(
        "http://192.168.1.39:3001/api/users/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // setJwsToken(res.data.token);
      setUser(res.data.user);
      // setPostList(res.data.post);
      getAllPosts();

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      toast.success(res.data.message);
      reset();

      redirect("/home");
    } catch (err) {
      toast.error("Invalid Email and Password");
      console.log(err);
    }
  };

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://192.168.1.39:3001/api/posts");
      setPostList(response.data.data); // Adjust based on your API response structure
      console.log("this is my post", response.data.data);

      console.log("Post Response", response.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    getAllPosts(); // Fetch posts
  }, []);

  const handleUserDetailsPage = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await axios.post(
        `http://192.168.1.39:3001/api/users/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      console.log("userDataaa", response.data);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  // ****************************** login   **************************

  ////      *****************************        Get All Posts       *************************************

  return (
    <UserContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
        reset,
        handleLogin,
        user,
        getAllPosts,
        postList,
        handleUserDetailsPage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
