import seedCoverPhoto from "../seed_cover_photo.jpg";
import seedProfilePhoto from "../seed_profile_photo.jpg";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const Profile = () => {
  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <Card>
            <Card.Img
              src={seedCoverPhoto}
              alt=""
              style={{ height: "400px", objectFit: "cover" }}
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
        <Col md="auto">
          <Image
            alt=""
            src={seedProfilePhoto}
            height="200"
            className="border rounded-circle"
          />
        </Col>
        <Col md={2} className="d-flex align-items-start flex-column mt-5">
          <div className="fs-2 fw-bold">Zhixiang Wu</div>
          <div className="fs-6">685 Friends</div>
        </Col>
        <Col md={1} className="position-relative">
          <Button
            variant="secondary"
            className="position-absolute bottom-0 end-0 me-3"
          >
            Edit Profile
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md={4} className="d-flex justify-content-start border-top">
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

export default Profile;
