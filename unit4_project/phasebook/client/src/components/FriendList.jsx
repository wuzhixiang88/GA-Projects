import React from "react";
// LOGO/IMAGE IMPORTS
import emptyImage from "../empty.png";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const FriendList = ({ userProfile }) => {
  return (
    <>
      <Card className="border-0 rounded-3 my-3">
        <Row className="d-flex mb-3 px-4">
          {userProfile.friend_list
            ? userProfile.friend_list.friends.map((friend) => (
                <Col md="6">
                  <Col className="d-flex text-start rounded border mt-3 me-auto">
                    <Col md="auto" className="mx-3 my-3">
                      <Image
                        alt=""
                        src={
                          friend.user_profile &&
                          friend.user_profile.profile_photo
                            ? friend.user_profile.profile_photo
                            : emptyImage
                        }
                        width="80"
                        height="80"
                        className="rounded"
                      />
                    </Col>
                    <Col className="d-flex align-items-center fw-bold">
                      {`${friend.first_name} ${friend.last_name}`}
                    </Col>
                  </Col>
                </Col>
              ))
            : null}
        </Row>
      </Card>
    </>
  );
};

export default FriendList;
