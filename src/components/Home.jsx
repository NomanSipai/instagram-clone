import React, { useContext } from "react";
import Post from "./Post";
import Header from "./Header";
// import CreatePost from "./CreatePost";
import UserContext from "./context/UserContext";

const Home = () => {
  const { postList } = useContext(UserContext);
  console.log(postList, "nodemon");

  return (
    <>
      <Header />
      {/* <CreatePost /> */}
      <div className="container px-4 mx-auto">
        {postList && postList.map((item) => <Post key={item.id} item={item} />)}
      </div>
    </>
  );
};

export default Home;
