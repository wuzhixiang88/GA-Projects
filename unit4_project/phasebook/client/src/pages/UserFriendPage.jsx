import React, { useState, useEffect } from "react";
// EXTERNAL PLUGIN IMPORTS
import axios from "axios";
// REACT COMPONENT IMPORTS
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import FriendList from "../components/FriendList";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserFriendPage = () => {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `/accounts/api/profile/${localStorage.getItem("id")}`
        );

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
  }, []);

  return (
    <>
      <Header userProfile={userProfile} />
      <UserProfile userProfile={userProfile} />
      <Container fluid className="main-container">
        <Row className="justify-content-md-center">
          <Col md={5} className="px-0">
            <FriendList userProfile={userProfile} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserFriendPage;
