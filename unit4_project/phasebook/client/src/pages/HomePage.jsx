import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const HomePage = () => {
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
          <Form className="mt-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Enter email"
                autoFocus={true}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
          <div className="d-grid gap-2 border-bottom">
            <Button variant="primary" type="submit" className="fw-bold">
              Log In
            </Button>
            <p>Forgotten password?</p>
          </div>

          <div className="d-grid gap-2 my-3">
            <Button variant="success" type="submit" className="fw-bold">
              Create New Account
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
