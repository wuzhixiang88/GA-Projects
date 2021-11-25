import React, { useState } from "react";
// LOGO/IMAGE IMPORTS
import photoIcon from "../photos.png";
import peopleIcon from "../users.png";
import locationIcon from "../placeholder.png";
import uploadIcon from "../upload.png";
import seedProfilePhoto from "../seed_profile_photo.jpg";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CreatePost = () => {
  const [show, setShow] = useState(false);
  const [photoUploadWindow, setPhotoUploadWindow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOpenPhotoUploadWindow = () => setPhotoUploadWindow(true);
  const handleClosePhotoUploadWindow = () => setPhotoUploadWindow(false);

  return (
    <>
      <Row className="justify-content-md-center">
        <Col className="">
          <Card className="border-0 rounded-3 my-3">
            <Card.Body className="d-flex py-0">
              <Col md="auto" className="my-3 me-2">
                <Image
                  alt=""
                  src={seedProfilePhoto}
                  width="40"
                  height="40"
                  className="border rounded-circle"
                />
              </Col>
              <Col className="d-flex">
                <Button
                  variant="light"
                  onClick={handleShow}
                  className="flex-grow-1 text-start rounded-pill text-muted my-3"
                >
                  What's on your mind?
                </Button>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body className="show-grid">
            <Container>
              <Row>
                <Col md="auto" className="px-0">
                  <Image
                    alt=""
                    src={seedProfilePhoto}
                    width="40"
                    height="40"
                    className="border rounded-circle mb-3 me-2"
                  />
                </Col>
                <Col className="ps-0">Zhixiang Wu</Col>
              </Row>

              <Row>
                <Col className="px-0">
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      placeholder="What's on your mind?"
                      className="fs-5 border-0 px-0"
                      id="post-textarea"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {photoUploadWindow ? (
                <Row>
                  <Col className="px-0">
                    <Card className="rounded-3 mb-3">
                      <Card.Body className="d-flex justify-content-center m-2 p-0">
                        <Form.Group className="img-upload-form d-flex justify-content-center position-relative">
                          <Form.Label
                            htmlFor="file-input"
                            className="img-upload-label flex-grow-1 position-relative mb-0"
                          >
                            <CloseButton
                              className="position-absolute top-0 end-0 m-2"
                              onClick={handleClosePhotoUploadWindow}
                            />
                            <Image
                              src={uploadIcon}
                              className="position-absolute top-50 start-50 translate-middle"
                            />
                          </Form.Label>
                          <Form.Control
                            type="file"
                            accept="image/*"
                            id="file-input"
                            className="border-0"
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : null}

              <Row>
                <Col className="px-0">
                  <Card className="rounded-3">
                    <Card.Body className="d-flex text-start my-2 py-0">
                      <Card.Text className="me-auto mt-2 mb-0 fw-bold">
                        Add to your post
                      </Card.Text>

                      {[
                        ["Photo", photoIcon],
                        ["Tag People", peopleIcon],
                        ["Check In", locationIcon],
                      ].map((element) => (
                        <OverlayTrigger
                          key={element[0]}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${element[0]}`}>
                              {element[0]}
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="light"
                            className="rounded-circle me-1 p-2"
                            onClick={
                              element[0] === "Photo"
                                ? handleOpenPhotoUploadWindow
                                : null
                            }
                          >
                            <Image alt="" src={element[1]} height="24" />
                          </Button>
                        </OverlayTrigger>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center border-0">
            <Button
              variant="primary"
              type="submit"
              className="flex-grow-1 fw-bold px-5"
            >
              Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default CreatePost;
