import React, { useState } from "react";
// REACT COMPONENT IMPORTS
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const PostFeed = () => {
  const [posts, setPosts] = useState([
    {
      user: "Zhixiang Wu",
      body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "7 October 2021",
    },
  ]);

  return (
    <>
      <CreatePost posts={posts} setPosts={setPosts} />
      <Posts posts={posts} showPostImage={true} />
    </>
  );
};

export default PostFeed;
