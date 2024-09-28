import React, { useMemo } from "react";
import Post from "./Post";
import Header from "./Header";
import mdata from "../DATA.json";
// import Avatar from "./Avatar";
import CreatePost from "./CreatePost";

const Home = () => {
  const data = useMemo(() => mdata, []);

  return (
    <>
      <Header />
      <CreatePost />
      <div className="container px-4 mx-auto">
        {data.map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              userName={post.user_name}
              description={post.description}
              image={post.user_image}
              postImage={post.post_image}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
