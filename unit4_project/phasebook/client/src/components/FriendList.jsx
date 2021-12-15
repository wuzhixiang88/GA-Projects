import React from "react";
import { Link } from "react-router-dom";
// EXTERNAL PLUGIN IMPORTS
import axios from "axios";
// LOGO/IMAGE IMPORTS
import emptyImage from "../empty.png";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const FriendList = ({ userProfile }) => {
  const handleAcceptFriendRequest = async (e) => {
    const userID = e.target.getAttribute("data-userid");

    try {
      const data = {
        user_id: userID,
        user: userProfile.username,
      };
      const response = await axios.post("/accounts/api/friendlist", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  };
  return (
    <>
      <Card className="border-0 rounded-3 my-3">
        <Row className="d-flex mb-3 px-4">
          {userProfile.friend_request
            ? userProfile.friend_request.sender.map((sender) => (
                <Col md="6" key={sender.first_name}>
                  <Col className="d-flex text-start rounded border mt-3 me-auto">
                    <Col md="auto" className="mx-3 my-3">
                      <Link
                        to={{
                          pathname: `/user/${sender.id}`,
                          state: { userID: `${sender.id}` },
                        }}
                      >
                        <Image
                          alt=""
                          src={
                            sender.user_profile &&
                            sender.user_profile.profile_photo
                              ? sender.user_profile.profile_photo
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
                          pathname: `/user/${sender.id}`,
                          state: { userID: `${sender.id}` },
                        }}
                        id="userpage_link"
                      >
                        {`${sender.first_name} ${sender.last_name}`}
                      </Link>
                    </Col>
                    <Col className="d-flex align-items-center fw-bold me-3">
                      <Button
                        data-userid={sender.id}
                        onClick={handleAcceptFriendRequest}
                      >
                        Accept Friend Request
                      </Button>
                    </Col>
                  </Col>
                </Col>
              ))
            : null}

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
