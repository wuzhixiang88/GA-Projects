import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// EXTERNAL PLUGIN IMPORTS
import axios from "axios";
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
  const [userProfile, setUserProfile] = useState({});
  const location = useLocation();
  const { userID } = location.state;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/accounts/api/profile/${userID}`);

        if (response.status === 200) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    };

    fetchUserProfile();
  }, [userID]);

  return (
    <>
      <Header userProfile={userProfile} />
      <UserProfile userProfile={userProfile} userID={userID} />
      <Container fluid className="main-container">
        <Row className="justify-content-md-center">
          <Col md={5} className="px-0">
            <PostFeed userProfile={userProfile} userID={userID} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserMainPage;
