import React from "react";
// LOGO/IMAGE IMPORTS
import likeIcon from "../like.png";
import commentIcon from "../comment.png";
import seedProfilePhoto from "../seed_profile_photo.jpg";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const PostFeed = () => {
  return (
    <>
      <Row className="justify-content-md-center">
        <Col md={5} className="px-0">
          <Card className="border-0 rounded-3 mb-3">
            <Card.Body className="d-flex text-start py-0">
              <Col md="auto" className="my-3 me-2">
                <Image
                  alt=""
                  src={seedProfilePhoto}
                  width="40"
                  height="40"
                  className="border rounded-circle"
                />
              </Col>
              <Col className="d-flex flex-column align-self-center">
                <Card.Text className="post-feed-user mb-0">
                  Zhixiang Wu
                </Card.Text>
                <Card.Text className="post-feed-date">7 October 2021</Card.Text>
              </Col>
            </Card.Body>

            <Card.Body className="pt-0">
              <Card.Text className="text-start">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Card.Text>
            </Card.Body>

            <Card.Body className="d-flex border-top border-bottom mx-3 mb-3 px-0 py-1">
              <Col md={6} className="d-flex px-1">
                <Button
                  variant="light"
                  className="flex-grow-1 border-0"
                  id="like-comment-button"
                >
                  <Image
                    alt=""
                    src={likeIcon}
                    height="20"
                    className="mb-1 me-2"
                  />
                  Like
                </Button>
              </Col>
              <Col md={6} className="d-flex pe-1">
                <Button
                  variant="light"
                  className="flex-grow-1 border-0"
                  id="like-comment-button"
                >
                  <Image
                    alt=""
                    src={commentIcon}
                    height="20"
                    className="me-2"
                  />
                  Comment
                </Button>
              </Col>
            </Card.Body>

            <Card.Body className="d-flex py-0">
              <Col md="auto" className="me-2">
                <Image
                  alt=""
                  src={seedProfilePhoto}
                  width="40"
                  height="40"
                  className="border rounded-circle"
                />
              </Col>
              <Col>
                <Form.Group className="flex-grow-1 align-self-center">
                  <Form.Control
                    type="text"
                    placeholder="Write a comment..."
                    className="mb-3 rounded-pill"
                  />
                </Form.Group>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PostFeed;
