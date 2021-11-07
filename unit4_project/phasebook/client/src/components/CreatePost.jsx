import seedProfilePhoto from "../seed_profile_photo.jpg";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const CreatePost = () => {
  return (
    <Container fluid>
      <Row className="justify-content-md-center mt-3">
        <Col md={4}>
          <Card className="border-0 rounded-3 my-3">
            <Card.Body className="d-flex text-start py-0">
              <Image
                alt=""
                src={seedProfilePhoto}
                width="40"
                height="40"
                className="border rounded-circle my-3 me-2"
              />
              <Button
                variant="light"
                className="flex-grow-1 text-start rounded-pill text-muted my-3"
              >
                What's on your mind?
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePost;
