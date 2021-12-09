import React from "react";
import { useHistory } from "react-router-dom";
// EXTERNAL PLUGIN IMPORTS
import axios from "axios";
// LOGO/IMAGE IMPORTS
import logo from "../logo.svg";
import profileIcon from "../profile.png";
import displayIcon from "../moon.png";
import settingsIcon from "../settings.png";
import logoutIcon from "../logout.png";
import emptyImage from "../empty.png";
// BOOTSTRAP COMPONENT IMPORTS
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

const Header = ({ userPhotos }) => {
  const history = useHistory();

  const handleClickLogout = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: "/accounts/api/logout",
        mode: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (response.status === 205) {
        localStorage.clear();
        history.push("/");
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="dark" fixed="top">
          {/* LOGO SECTION */}
          <Col md="auto">
            <Navbar.Brand href="/" className="me-0">
              <Image
                alt=""
                src={logo}
                width="50"
                height="30"
                className="App-logo"
              />
            </Navbar.Brand>
          </Col>

          {/* SEARCH BAR SECTION */}
          <Col md="auto">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Search"
                className="rounded-pill"
              />
            </Form.Group>
          </Col>

          <Col md="auto" className="d-flex ms-auto">
            {/* USER DETAILS SECTION */}
            <Button
              variant="primary"
              className="d-flex rounded-pill me-2 ps-1 py-0"
            >
              <Col md="auto" className="me-2 align-self-center">
                <Image
                  alt=""
                  src={
                    userPhotos.profilePhoto &&
                    typeof userPhotos.profilePhoto === "string"
                      ? userPhotos.profilePhoto
                      : emptyImage
                  }
                  width="25"
                  height="25"
                  className="border rounded-circle"
                />
              </Col>
              <Col className="align-self-center">
                {localStorage.getItem("firstname")}
              </Col>
            </Button>

            {/* DROPDOWN MENU SECTION */}
            <DropdownButton
              title=""
              variant="secondary"
              id="header-dropdown-button"
              align="end"
            >
              {[
                ["Profile", profileIcon],
                ["Display", displayIcon],
                ["Settings", settingsIcon],
                ["Log Out", logoutIcon],
              ].map((element, index) => (
                <Col key={index}>
                  {element[0] === "Log Out" ? <Dropdown.Divider /> : null}
                  <Dropdown.Item
                    href=""
                    onClick={
                      element[0] === "Log Out" ? handleClickLogout : null
                    }
                  >
                    <Image
                      alt=""
                      src={element[1]}
                      height="20"
                      className="mb-1 me-2"
                    />
                    {element[0]}
                  </Dropdown.Item>
                </Col>
              ))}
            </DropdownButton>
          </Col>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;
