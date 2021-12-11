import React, { useState, useEffect } from "react";
// EXTERNAL PLUGIN IMPORTS
import axios from "axios";
// REACT COMPONENT IMPORTS
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const PostFeed = ({ userProfile, userOnlyPost }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      let url = "";
      if (userOnlyPost) {
        url = `/api/user/${localStorage.getItem("id")}/post/`;
      } else {
        url = "/api/post";
      }

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });

        if (response.status === 200) {
          const listOfPosts = [];
          for (const element of response.data) {
            const postDetails = {
              id: element.id,
              user: `${element.user.first_name} ${element.user.last_name}`,
              user_profile: element.user.user_profile,
              user_id: element.user.id,
              body: element.body,
              photo: element.photo,
              like: element.like,
              date: element.created_at.slice(0, 10),
              comments: element.comments,
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
  }, [userOnlyPost]);

  return (
    <>
      <CreatePost userProfile={userProfile} />
      <Posts
        userProfile={userProfile}
        posts={posts}
        setPosts={setPosts}
        showPostImage={true}
      />
    </>
  );
};

export default PostFeed;
