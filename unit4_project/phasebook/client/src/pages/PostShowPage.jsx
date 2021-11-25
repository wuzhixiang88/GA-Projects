import React from "react";
import { useHistory } from "react-router-dom";
// LOGO/IMAGE IMPORTS
import lorenIpsumPhoto from "../lorem-ipsum.png";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import CloseButton from "react-bootstrap/CloseButton";

const PostShowPage = () => {
  const history = useHistory();

  const handleClickCloseButton = () => {
    history.goBack();
  };

  return (
    <Container fluid>
      <Row>
        <Col md={9} className="post-show-photo-div position-relative">
          <CloseButton
            variant="white"
            className="position-absolute top-0 start-0 mt-3 ms-3"
            onClick={handleClickCloseButton}
          />
          <Image
            fluid
            rounded
            alt=""
            src={lorenIpsumPhoto}
            className="position-absolute top-50 start-50 translate-middle"
          />
        </Col>
        <Col md={3}>Comments</Col>
      </Row>
    </Container>
  );
};

export default PostShowPage;
