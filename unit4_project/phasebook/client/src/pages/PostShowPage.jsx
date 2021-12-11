import React from "react";
import { useHistory, useLocation } from "react-router-dom";
// REACT COMPONENT IMPORTS
import Posts from "../components/Posts";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import CloseButton from "react-bootstrap/CloseButton";

const PostShowPage = () => {
  const location = useLocation();
  const { post, userProfile } = location.state;
  console.log(post);
  console.log(post[0].photo);

  const history = useHistory();

  const handleClickCloseButton = () => {
    history.goBack();
  };

  return (
    <Container fluid>
      <Row>
        {/* POST IMAGE SECTION */}
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
            src={post[0].photo}
            className="position-absolute top-50 start-50 translate-middle"
          />
        </Col>

        {/* POST TEXT & COMMENTS SECTION */}
        <Col md={3}>
          <Posts userProfile={userProfile} posts={post} showPostImage={false} />
        </Col>
      </Row>
    </Container>
  );
};

export default PostShowPage;
