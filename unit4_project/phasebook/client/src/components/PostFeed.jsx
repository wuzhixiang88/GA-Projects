import React, { useState, useEffect } from "react";
// EXTERNAL PLUGIN IMPORTS
import axios from "axios";
// REACT COMPONENT IMPORTS
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const PostFeed = ({ userPhotos }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get(`/api/post`);

        if (response.status === 200) {
          const listOfPosts = [];
          for (const element of response.data) {
            const postDetails = {
              user: `${element.user.first_name} ${element.user.last_name}`,
              body: element.body,
              photo: element.photo,
              like: element.like,
              date: element.created_at.slice(0, 10),
            };

            listOfPosts.push(postDetails);
          }

          setPosts(listOfPosts);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPosts();
  }, []);

  return (
    <>
      <CreatePost userPhotos={userPhotos} posts={posts} setPosts={setPosts} />
      <Posts
        userPhotos={userPhotos}
        posts={posts}
        setPosts={setPosts}
        showPostImage={true}
      />
    </>
  );
};

export default PostFeed;
