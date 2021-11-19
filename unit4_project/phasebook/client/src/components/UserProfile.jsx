import React from "react";
// LOGO/IMAGE IMPORTS
import seedCoverPhoto from "../seed_cover_photo.jpg";
import seedProfilePhoto from "../seed_profile_photo.jpg";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const UserProfile = () => {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={5} className="px-0">
          <Card>
            <Card.Img
              src={seedCoverPhoto}
              alt=""
              style={{
                maxHeight: "600px",
                objectFit: "cover",
              }}
            />
            <Card.ImgOverlay>
              <Button className="position-absolute bottom-0 end-0 me-3 mb-3">
                Edit Cover Photo
              </Button>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md={5} className="px-0">
          <Card className="d-flex flex-row border-0">
            <Col md="auto">
              <Image
                alt=""
                src={seedProfilePhoto}
                height="150"
                className="border rounded-circle"
              />
            </Col>
            <Col md="auto" className="d-flex flex-column align-self-center">
              <Col md={12} className="fs-2 fw-bold ms-3">
                Zhixiang Wu
              </Col>
              <Col md={12} className="text-start fs-6 ms-3 ps-2">
                685 Friends
              </Col>
            </Col>
            <Col md="auto">
              <Button
                variant="secondary"
                className="position-absolute bottom-0 end-0"
              >
                Edit Profile
              </Button>
            </Col>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md={5} className="d-flex justify-content-start border-top px-0">
          <Button variant="outline-primary" className="fw-bold border-0 mt-3">
            Posts
          </Button>
          <Button variant="outline-primary" className="fw-bold border-0 mt-3">
            About
          </Button>
          <Button variant="outline-primary" className="fw-bold border-0 mt-3">
            Friends
          </Button>
          <Button variant="outline-primary" className="fw-bold border-0 mt-3">
            Photos
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
