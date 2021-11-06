import logo from "../logo.svg";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

const Header = () => {
  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="dark" fixed="top">
          <Col md={1}>
            <Navbar.Brand href="#home">
              <Image
                alt=""
                src={logo}
                width="50"
                height="30"
                className="App-logo"
              />
            </Navbar.Brand>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Control type="search" placeholder="Search Phasebook" />
            </Form.Group>
          </Col>
          <Col md={1} className="d-flex ms-auto">
            <Button variant="secondary" className="rounded-pill me-3">
              Zhixiang
            </Button>
            <DropdownButton
              variant="secondary"
              id="header-dropdown-button"
              drop="start"
            >
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-4">Log Out</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
