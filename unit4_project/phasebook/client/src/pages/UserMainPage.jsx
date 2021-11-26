import React from "react";
// REACT COMPONENT IMPORTS
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import PostFeed from "../components/PostFeed";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserMainPage = () => {
  return (
    <>
      <Header />
      <UserProfile />
      <Container fluid className="main-container">
        <Row className="justify-content-md-center">
          <Col md={5} className="px-0">
            <PostFeed />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserMainPage;
