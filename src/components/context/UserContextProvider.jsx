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

  const [user, setUser] = useState(getUserLocalStorage());
  const [toggleHeaderList, setToggleHeaderList] = useState(false);
  const [toggleUserProfile, setToggleUserProfile] = useState(false);
  const [postList, setPostList] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const [skeletonLoder, setSkeletonLoader] = useState(false);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.username);
  const [error, setError] = useState("");
  const [toggleUserUpdateModal, setToggleUserUpdateModal] = useState(false);

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
      const token = JSON.parse(localStorage.getItem("token"));

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
      setUserDetails(response.data.data);
      localStorage.setItem("userDetails", JSON.stringify(response.data.data));
      console.log("userProfile", response.data.data);

      console.log("Post liked successfully:", response.data);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("token"));
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
    // redirect("/userdetails/userupdate");
  };

  return (
    <UserContext.Provider
      value={{
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
        toggleUserUpdateModal,
        setToggleUserUpdateModal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
