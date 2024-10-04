import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { config } from "../../confige/confige";

const UserContextProvider = ({ children }) => {
  const getUserLocalStorage = () => {
    let list = localStorage.getItem("user");
    if (list) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return [];
    }
  };
  const getTokenLocalStorage = () => {
    let getToken = localStorage.getItem("token");
    if (getToken) {
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return [];
    }
  };

  const getUserDetailsLocalStorage = () => {
    let getUserDetails = localStorage.getItem("userDetails");
    if (getUserDetails) {
      return JSON.parse(localStorage.getItem("userDetails"));
    } else {
      return [];
    }
  };

  const [token, setToken] = useState(getTokenLocalStorage());
  const [user, setUser] = useState(getUserLocalStorage());
  const [toggleHeaderList, setToggleHeaderList] = useState(false);
  const [toggleUserProfile, setToggleUserProfile] = useState(false);
  const [postList, setPostList] = useState([]);
  const [userDetails, setUserDetails] = useState(getUserDetailsLocalStorage());
  const [skeletonLoder, setSkeletonLoader] = useState(false);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.username);
  const [error, setError] = useState("");
  const [clickPost, setClickPost] = useState("");
  const [toggleUserUpdateModal, setToggleUserUpdateModal] = useState(false);
  const [toggleUserPost, setToggleUSerPost] = useState(false);

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
        `${config.url}users/login`,
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
      setToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", JSON.stringify(res.data.token));
      // getAllPosts();

      toast.success(res.data.message);
      reset();

      redirect("/home");
    } catch (err) {
      toast.error("Invalid Email and Password");
      console.log(err);
    }
  };

  /////////////////////  Header    {

  const handleHeaderToggleMenu = () => {
    setToggleHeaderList(!toggleHeaderList);
  };

  ///////////////////////////      }

  /////////           User Profile {

  const handleToggleUserProfile = () => {
    setToggleUserProfile(!toggleUserProfile);
  };

  //                             }

  // signOut                {

  const handleSignOut = () => {
    console.log("Sign out");
    setToggleUserProfile(false);
    toast.success("You have successfully logged out.");
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("user");
    setToken("");
    redirect("/");
  };

  //                          }

  const getAllPosts = async () => {
    setSkeletonLoader(true);
    try {
      const response = await axios.get(`${config.url}posts`);
      setPostList(response.data.data); // Adjust based on your API response structure
      console.log("this is my post", response.data.data);

      console.log("Post Response", response.data.data);
      setSkeletonLoader(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    getAllPosts(); // Fetch posts
  }, []);

  ////                         Post

  const handleUserDetail = async (id) => {
    try {
      const response = await axios.get(
        `${config.url}users/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        }
      );
      localStorage.setItem("userDetails", JSON.stringify(response.data.data));
      setUserDetails(response.data.data);
      console.log("userProfile", response.data.data);

      console.log("Post liked successfully:", response.data);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        first_name: firstName,
        last_name: lastName,
        email,
        username,
      };
      await axios.patch(`${config.url}users/update`, updatedUser, {
        headers: {
          Authorization: token,
        },
      });
      let newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
      };
      setUser(newUser);
      toast.success("User updated successfully");
      getAllPosts();
      redirect("/home");
      setToggleUserUpdateModal(false);
    } catch (err) {
      setError("Failed to update user data");
      console.error(err);
    }
  };

  const handleUserUpdateData = () => {
    setFirstName(user?.first_name);
    setLastName(user?.last_name);
    setEmail(user?.email);
    setUsername(user?.username);
    setToggleUserUpdateModal(true);
  };

  const handlePostCLick = (id) => {
    const clickedPost = postList.find((item) => item.id === id);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        register,
        handleSubmit,
        errors,
        reset,
        handleLogin,
        toggleHeaderList,
        handleHeaderToggleMenu,
        user,
        toggleUserProfile,
        setToggleUserProfile,
        handleToggleUserProfile,
        handleSignOut,
        getAllPosts,
        postList,
        handleUserDetail,
        userDetails,
        setUserDetails,
        skeletonLoder,
        handleUserUpdateData,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        username,
        setUsername,
        error,
        setError,
        handleUpdate,
        clickPost,
        setClickPost,
        toggleUserUpdateModal,
        setToggleUserUpdateModal,
        toggleUserPost,
        setToggleUSerPost,
        handlePostCLick,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
