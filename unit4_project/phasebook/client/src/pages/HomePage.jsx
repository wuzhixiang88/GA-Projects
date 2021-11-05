import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const HomePage = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container fluid className="bg-light">
      <Row className="d-flex justify-content-center py-5">
        <Col md={2} className="me-5">
          <Row className="text-primary fs-1 fw-bold text-start mb-3">
            Phasebook
          </Row>
          <Row className="fs-4 text-start">
            Phasebook helps you connect and share with the people in your life.
          </Row>
        </Col>
        <Col md={2} className="bg-white rounded">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="mt-3"
          >
            <Form.Group className="mb-3">
              <Form.Control
                required
                type="email"
                placeholder="Email Address"
                autoFocus={true}
              />
              <Form.Control.Feedback type="invalid" className="text-start">
                Please enter a email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control required type="password" placeholder="Password" />
              <Form.Control.Feedback type="invalid" className="text-start">
                Please enter a password.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid gap-2 border-bottom">
              <Button variant="primary" type="submit" className="fw-bold">
                Log In
              </Button>
              <p>Forgotten password?</p>
            </div>
          </Form>

          <div className="d-grid gap-2 my-4">
            <Button
              variant="success"
              type="submit"
              onClick={handleShow}
              className="fw-bold"
            >
              Create New Account
            </Button>
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered={true}
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Modal.Body className="show-grid">
                <Container>
                  <Row>
                    <Col xs={12} md={6} className="ps-0">
                      <Form.Group className="mb-3">
                        <Form.Control
                          required
                          type="text"
                          placeholder="First Name"
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className="text-start"
                        >
                          Please enter a first name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} className="px-0">
                      <Form.Group className="mb-3">
                        <Form.Control
                          required
                          type="text"
                          placeholder="Surname"
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className="text-start"
                        >
                          Please enter a surname.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-0">
                      <Form.Group className="mb-3">
                        <Form.Control
                          required
                          type="email"
                          placeholder="Email Address"
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className="text-start"
                        >
                          Please enter a email address.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="px-0">
                      <Form.Group className="mb-3">
                        <Form.Control
                          required
                          type="password"
                          placeholder="Password"
                        />
                        <Form.Control.Feedback
                          type="invalid"
                          className="text-start"
                        >
                          Please enter a password.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-center">
                <Button
                  variant="success"
                  type="submit"
                  className="fw-bold px-5"
                >
                  Sign Up
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
