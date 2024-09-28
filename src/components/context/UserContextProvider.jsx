import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UserContextProvider = ({ children }) => {
  // const [jwsToken, setJwsToken] = useState("");
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
        "http://192.168.1.77:3000/api/users/login",
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
      console.log(res.data.post);

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

  // ****************************** login   **************************

  ////      *****************************        Get All Posts       *************************************

  const getAllPosts = () => {
    axios.get("http://192.168.1.77:3000/api/posts/").then((res) => {
      setPostList(res.data.post);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <UserContext.Provider
      value={{
        register,
        handleSubmit,
        errors,
        reset,
        handleLogin,
        user,
        postList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
