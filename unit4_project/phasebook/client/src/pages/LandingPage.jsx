import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// EXTERNAL PLUGIN IMPORTS
import axios from "axios";
import Cookies from "js-cookie";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const LandingPage = () => {
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    firstName: "",
    surname: "",
    email: "",
    registerPassword: "",
  });

  const [registerModal, setRegisterModal] = useState(false);
  const [validated, setValidated] = useState(false);
  const history = useHistory();

  const handleRegisterDetails = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setRegisterDetails({
      ...registerDetails,
      [key]: value,
    });
  };

  const handleShowRegisterModal = () => setRegisterModal(true);
  const handleHideRegisterModal = () => setRegisterModal(false);

  const handleFormSubmit = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    if (form.getAttribute("data-name") === "registerForm") {
      const csrftoken = Cookies.get("csrftoken");

      try {
        const response = await axios({
          method: "POST",
          url: "/accounts/api/register",
          mode: "same-origin",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          data: {
            username: registerDetails.email,
            first_name: registerDetails.firstName,
            last_name: registerDetails.surname,
            email: registerDetails.email,
            password: registerDetails.registerPassword,
          },
        });
        if (response.statusText === "Created") {
          handleHideRegisterModal();
          history.push("/");
        }
      } catch (error) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    }
  };

  return (
    <Container fluid className="bg-light">
      <Row className="d-flex justify-content-center py-5">
        <Col md={3} className="me-5">
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
            data-name="loginForm"
            onSubmit={handleFormSubmit}
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
              onClick={handleShowRegisterModal}
              className="fw-bold"
            >
              Create New Account
            </Button>
          </div>

          {/* ACCOUNT REGISTERATION MODAL SECTION */}
          <Modal
            show={registerModal}
            onHide={handleHideRegisterModal}
            backdrop="static"
            centered={true}
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            <Form
              noValidate
              validated={validated}
              data-name="registerForm"
              onSubmit={handleFormSubmit}
            >
              <Modal.Body className="show-grid">
                <Container>
                  <Row>
                    <Col xs={12} md={6} className="ps-0">
                      <Form.Group className="mb-3">
                        <Form.Control
                          required
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={registerDetails.firstName}
                          onChange={handleRegisterDetails}
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
                          name="surname"
                          placeholder="Surname"
                          value={registerDetails.surname}
                          onChange={handleRegisterDetails}
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
                          name="email"
                          placeholder="Email Address"
                          value={registerDetails.email}
                          onChange={handleRegisterDetails}
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
                          name="registerPassword"
                          placeholder="Password"
                          value={registerDetails.password}
                          onChange={handleRegisterDetails}
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

export default LandingPage;
