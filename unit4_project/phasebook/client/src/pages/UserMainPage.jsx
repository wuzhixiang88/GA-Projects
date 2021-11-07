import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Header from "../components/Header";
import Profile from "../components/Profile";
import CreatePost from "../components/CreatePost";

const UserMainPage = () => {
  return (
    <>
      <Header />
      <Profile />
      <Container fluid className="main-container">
        <CreatePost />
      </Container>
    </>
  );
};

export default UserMainPage;
