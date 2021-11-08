import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";
import PostFeed from "../components/PostFeed";

const UserMainPage = () => {
  return (
    <>
      <Header />
      <Profile />
      <Container fluid className="main-container">
        <CreatePost />
        <PostFeed />
      </Container>
    </>
  );
};

export default UserMainPage;
