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
      <Row className="justify-content-md-center" bg="light">
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
        <Col md={1} className="border-bottom">
          <Image
            alt=""
            src={seedProfilePhoto}
            width="200"
            height="200"
            className="border rounded-circle mb-3"
          />
        </Col>
        <Col
          md={2}
          className="d-flex align-items-start flex-column border-bottom"
        >
          <div className="fs-2 fw-bold mt-5">Zhixiang Wu</div>
          <div className="fs-6">685 Friends</div>
        </Col>
        <Col md={1} className="position-relative border-bottom">
          <Button
            variant="secondary"
            className="position-absolute bottom-0 end-0 mb-3 me-3"
          >
            Edit Profile
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-3">
        <Col md={4} className="d-flex justify-content-start">
          <Button variant="outline-primary" className="fw-bold border-0">
            Posts
          </Button>
          <Button variant="outline-primary" className="fw-bold border-0">
            About
          </Button>
          <Button variant="outline-primary" className="fw-bold border-0">
            Friends
          </Button>
          <Button variant="outline-primary" className="fw-bold border-0">
            Photos
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
