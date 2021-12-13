import React from "react";
import { Link } from "react-router-dom";
// LOGO/IMAGE IMPORTS
import emptyImage from "../empty.png";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

const FriendList = ({ userProfile }) => {
  console.log(userProfile);
  return (
    <>
      <Card className="border-0 rounded-3 my-3">
        <Row className="d-flex mb-3 px-4">
          {userProfile.friend_list
            ? userProfile.friend_list.friends.map((friend) => (
                <Col md="6" key={friend.first_name}>
                  <Col className="d-flex text-start rounded border mt-3 me-auto">
                    <Col md="auto" className="mx-3 my-3">
                      <Link
                        to={{
                          pathname: `/user/${friend.id}`,
                          state: { userID: `${friend.id}` },
                        }}
                      >
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
                      </Link>
                    </Col>
                    <Col className="d-flex align-items-center fw-bold">
                      <Link
                        to={{
                          pathname: `/user/${friend.id}`,
                          state: { userID: `${friend.id}` },
                        }}
                        id="userpage_link"
                      >
                        {`${friend.first_name} ${friend.last_name}`}
                      </Link>
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
