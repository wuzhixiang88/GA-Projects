import React from "react";
// REACT COMPONENT IMPORTS
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import CreatePost from "../components/CreatePost";
import PostFeed from "../components/PostFeed";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

const UserMainPage = () => {
  return (
    <>
      <Header />
      <UserProfile />
      <Container fluid className="main-container">
        <CreatePost />
        <PostFeed />
      </Container>
    </>
  );
};

export default UserMainPage;
