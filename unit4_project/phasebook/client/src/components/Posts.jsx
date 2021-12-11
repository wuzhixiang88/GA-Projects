import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// EXTERNAL PLUGIN IMPORTS
import axios from "axios";
// LOGO/IMAGE IMPORTS
import likeIcon from "../like.png";
import likeButtonIcon from "../like-button.png";
import unlikeButtonIcon from "../unlike-button.png";
import commentIcon from "../comment.png";
import photoIcon from "../photos.png";
import peopleIcon from "../users.png";
import locationIcon from "../placeholder.png";
import uploadIcon from "../upload.png";
import emptyImage from "../empty.png";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Modal from "react-bootstrap/Modal";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Posts = ({ userPhotos, posts, setPosts, showPostImage }) => {
  const username = localStorage.getItem("username");

  const [postCommentCounter, setPostCommentCounter] = useState(0);

  const postCommentInputs = useRef({});
  const postCommentReplyInputs = useRef({});

  const [createPostModal, setCreatePostModal] = useState(false);
  const [photoUploadWindow, setPhotoUploadWindow] = useState(false);
  const postBodyInput = useRef();
  const postPhotoInput = useRef();

  const handleShowCreatePostModal = () => setCreatePostModal(true);
  const handleHideCreatePostModal = () => setCreatePostModal(false);
  const handleShowPhotoUploadWindow = () => setPhotoUploadWindow(true);
  const handleHidePhotoUploadWindow = () => setPhotoUploadWindow(false);

  const handlePostComments = async (e) => {
    e.preventDefault();
    const postID = Number(e.target.getAttribute("data-postid"));

    try {
      const uploadData = new FormData();
      uploadData.append("body", postCommentInputs.current[postID].value);
      const response = await axios.post(
        `/api/post/${postID}/comment/`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }

    postCommentInputs.current[postID].value = "";
    handlePostCommentCounter();
  };

  const handlePostCommentReplies = async (e) => {
    e.preventDefault();
    const postID = Number(e.target.getAttribute("data-postid"));
    const commentID = Number(e.target.getAttribute("data-commentid"));

    try {
      const uploadData = new FormData();
      uploadData.append(
        "body",
        postCommentReplyInputs.current[commentID].value
      );
      const response = await axios.post(
        `/api/post/${postID}/comment/${commentID}/reply/`,
        uploadData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }

    postCommentReplyInputs.current[commentID].value = "";
  };

  const handlePostLikeCounter = (e) => {
    const postIndex = e.target.getAttribute("data-index");
    const postsArr = [...posts];

    if (postsArr[postIndex]) {
      if (postsArr[postIndex]["like"].includes(username)) {
        const index = postsArr[postIndex]["like"].indexOf(username);
        postsArr[postIndex]["like"].splice(index, 1);
      } else {
        postsArr[postIndex]["like"].push(username);
      }
    }

    setPosts(postsArr);
  };
  const handlePostCommentCounter = () => {
    setPostCommentCounter(postCommentCounter + 1);
  };

  const focusPostCommentInput = (e) => {
    const index = e.target.getAttribute("data-postid");
    postCommentInputs.current[index].focus();
  };
  const focusPostCommentReplyInput = (e) => {
    const index = e.target.getAttribute("data-commentid");
    postCommentReplyInputs.current[index].focus();
  };

  const handleClickPostButton = async (e) => {
    e.preventDefault();
    handleHideCreatePostModal();

    try {
      const uploadData = new FormData();
      uploadData.append("body", postBodyInput.current.value);
      if (postPhotoInput.current && postPhotoInput.current.files[0]) {
        uploadData.append(
          "photo",
          postPhotoInput.current.files[0],
          postPhotoInput.current.files[0].name
        );
      }

      const response = await axios.post(`/api/post/`, uploadData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (e) => {
    const postID = e.target.getAttribute("data-postid");

    try {
      const response = await axios.delete(`/api/post/${postID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (response.status === 204) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {posts
        ? posts.map((post, index) => (
            <Card className="border-0 rounded-3 mb-3" key={index}>
              {/* POST USER DETAILS & DATE OF POST SECTION */}
              <Card.Body className="d-flex text-start py-0">
                <Col md="auto" className="my-3 me-2">
                  <Image
                    alt=""
                    src={
                      userPhotos.profilePhoto &&
                      typeof userPhotos.profilePhoto === "string"
                        ? userPhotos.profilePhoto
                        : emptyImage
                    }
                    width="40"
                    height="40"
                    className="border rounded-circle"
                  />
                </Col>
                <Col className="d-flex flex-column align-self-center">
                  <Card.Text className="post-feed-user mb-0">
                    {post.user}
                  </Card.Text>
                  <Card.Text className="post-feed-date">{post.date}</Card.Text>
                </Col>
                <Col md="auto">
                  <DropdownButton
                    title=""
                    variant="secondary"
                    id="header-dropdown-button"
                    drop="start"
                    className="mt-3"
                  >
                    {[
                      ["Edit Post", null],
                      ["Delete Post", null],
                    ].map((element, index) => (
                      <Col key={index}>
                        {element[0] === "Log Out" ? <Dropdown.Divider /> : null}
                        <Dropdown.Item
                          onClick={
                            element[0] === "Edit Post"
                              ? handleShowCreatePostModal
                              : element[0] === "Delete Post"
                              ? handleDeletePost
                              : null
                          }
                          data-postid={post.id}
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
              </Card.Body>

              {/* POST BODY (TEXT) SECTION */}
              <Card.Body className="pt-0">
                <Card.Text className="text-start">{post.body}</Card.Text>
              </Card.Body>

              {/* POST BODY (IMAGE) SECTION */}
              {showPostImage && post.photo ? (
                <Card.Body className="mx-3 mb-3 p-0">
                  <Link
                    to={{
                      pathname: "/photo/id",
                      state: { post: [post] },
                    }}
                  >
                    <Image fluid rounded alt="" src={post.photo} />
                  </Link>
                </Card.Body>
              ) : null}

              {/* POST LIKE & COMMENT COUNTER SECTION */}
              {post.like.length || postCommentCounter ? (
                <>
                  <Card.Body className="d-flex pt-0">
                    <Col md="auto">
                      {post.like.length ? (
                        <>
                          <Image
                            alt=""
                            src={likeIcon}
                            height="20"
                            className="mb-1 me-2"
                          />
                          {post.like.length}
                        </>
                      ) : null}
                    </Col>
                    <Col md="auto" className="ms-auto">
                      {postCommentCounter
                        ? postCommentCounter === 1
                          ? `${postCommentCounter} Comment`
                          : `${postCommentCounter} Comments`
                        : null}
                    </Col>
                  </Card.Body>
                </>
              ) : null}

              {/* POST LIKE & COMMENT BUTTON SECTION */}
              <Card.Body className="d-flex border-top border-bottom mx-3 mb-3 px-0 py-1">
                <Col md={6} className="d-flex">
                  <Button
                    variant="light"
                    className="flex-grow-1 border-0"
                    id={
                      post.like.includes(username)
                        ? "unlike-comment-button"
                        : "like-comment-button"
                    }
                    data-index={index}
                    onClick={handlePostLikeCounter}
                  >
                    <Image
                      alt=""
                      src={
                        post.like.includes(username)
                          ? unlikeButtonIcon
                          : likeButtonIcon
                      }
                      height="20"
                      className="mb-1 me-2"
                    />
                    Like
                  </Button>
                </Col>
                <Col md={6} className="d-flex">
                  <Button
                    variant="light"
                    className="flex-grow-1 border-0"
                    id="like-comment-button"
                    data-postid={post.id}
                    onClick={focusPostCommentInput}
                  >
                    <Image
                      alt=""
                      src={commentIcon}
                      height="20"
                      className="me-2"
                    />
                    Comment
                  </Button>
                </Col>
              </Card.Body>

              {/* POST COMMENTS SECTION */}
              <Card.Body className="text-start py-0">
                {post.comments.map((postComment, index) => (
                  <Col key={index}>
                    <Col className="d-flex">
                      <Col md="auto" className="me-2">
                        <Image
                          alt=""
                          src={
                            userPhotos.profilePhoto &&
                            typeof userPhotos.profilePhoto === "string"
                              ? userPhotos.profilePhoto
                              : emptyImage
                          }
                          width="40"
                          height="40"
                          className="border rounded-circle"
                        />
                      </Col>
                      <Col>
                        <Col id="user-comment-col">
                          <Card.Text className="fw-bold mb-0 ps-3 pt-2">
                            {`${postComment.user.first_name} ${postComment.user.last_name}`}
                          </Card.Text>
                          <Card.Text className="px-3 pb-2">
                            {postComment.body}
                          </Card.Text>
                        </Col>
                        <Col className="mt-0">
                          <Button variant="link" id="like-reply-button">
                            Like
                          </Button>
                          <Button
                            variant="link"
                            id="like-reply-button"
                            data-commentid={postComment.id}
                            onClick={focusPostCommentReplyInput}
                          >
                            Reply
                          </Button>
                        </Col>
                        {/* COMMENTS REPLIES SECTION */}
                        <Col className="text-start ps-2 py-0">
                          {postComment.replies.map(
                            (postCommentReply, index) => (
                              <Col className="d-flex" key={index}>
                                <Col md="auto" className="me-2">
                                  <Image
                                    alt=""
                                    src={
                                      userPhotos.profilePhoto &&
                                      typeof userPhotos.profilePhoto ===
                                        "string"
                                        ? userPhotos.profilePhoto
                                        : emptyImage
                                    }
                                    width="30"
                                    height="30"
                                    className="border rounded-circle"
                                  />
                                </Col>
                                <Col>
                                  <Col id="user-comment-col">
                                    <Card.Text className="fw-bold mb-0 ps-3 pt-2">
                                      {`${postCommentReply.user.first_name} ${postCommentReply.user.last_name}`}
                                    </Card.Text>
                                    <Card.Text className="px-3 pb-2">
                                      {postCommentReply.body}
                                    </Card.Text>
                                  </Col>
                                  <Col className="mt-0">
                                    <Button
                                      variant="link"
                                      id="like-reply-button"
                                    >
                                      Like
                                    </Button>
                                  </Col>
                                </Col>
                              </Col>
                            )
                          )}
                        </Col>
                        {/* COMMENTS REPLIES INPUT SECTION */}
                        <Col className="d-flex ps-2 py-0">
                          <Col md="auto" className="me-2">
                            <Image
                              alt=""
                              src={
                                userPhotos.profilePhoto &&
                                typeof userPhotos.profilePhoto === "string"
                                  ? userPhotos.profilePhoto
                                  : emptyImage
                              }
                              width="30"
                              height="30"
                              className="border rounded-circle"
                            />
                          </Col>
                          <Col>
                            <Form
                              onSubmit={handlePostCommentReplies}
                              data-postid={postComment.post_id}
                              data-commentid={postComment.id}
                            >
                              <Form.Group className="flex-grow-1 align-self-center">
                                <Form.Control
                                  ref={(element) =>
                                    (postCommentReplyInputs.current[
                                      postComment.id
                                    ] = element)
                                  }
                                  type="text"
                                  placeholder="Write a reply..."
                                  data-commentid={postComment.id}
                                  className="mb-3 rounded-pill"
                                />
                              </Form.Group>
                            </Form>
                          </Col>
                        </Col>
                      </Col>
                    </Col>
                  </Col>
                ))}
              </Card.Body>

              {/* POST COMMENTS INPUT SECTION */}
              <Card.Body className="d-flex py-0">
                <Col md="auto" className="me-2">
                  <Image
                    alt=""
                    src={
                      userPhotos.profilePhoto &&
                      typeof userPhotos.profilePhoto === "string"
                        ? userPhotos.profilePhoto
                        : emptyImage
                    }
                    width="40"
                    height="40"
                    className="border rounded-circle"
                  />
                </Col>
                <Col>
                  <Form onSubmit={handlePostComments} data-postid={post.id}>
                    <Form.Group className="flex-grow-1 align-self-center">
                      <Form.Control
                        ref={(element) =>
                          (postCommentInputs.current[post.id] = element)
                        }
                        type="text"
                        placeholder="Write a comment..."
                        data-postid={post.id}
                        className="mb-3 rounded-pill"
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Card.Body>
            </Card>
          ))
        : null}

      {/* CREATE POST MODAL SECTION */}
      <Modal
        show={createPostModal}
        onHide={handleHideCreatePostModal}
        onEntered={() => postBodyInput.current.focus()}
        centered={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>

        <Form>
          <Modal.Body className="show-grid">
            <Container>
              {/* USER DETAILS SECTION */}
              <Row>
                <Col md="auto" className="px-0">
                  <Image
                    alt=""
                    src={
                      userPhotos.profilePhoto &&
                      typeof userPhotos.profilePhoto === "string"
                        ? userPhotos.profilePhoto
                        : emptyImage
                    }
                    width="40"
                    height="40"
                    className="border rounded-circle mb-3 me-2"
                  />
                </Col>
                <Col className="ps-0">Zhixiang Wu</Col>
              </Row>

              {/* POST BODY INPUT SECTION */}
              <Row>
                <Col className="px-0">
                  <Form.Group>
                    <Form.Control
                      ref={postBodyInput}
                      as="textarea"
                      placeholder="What's on your mind?"
                      className="fs-5 border-0 px-0"
                      id="post-textarea"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* POST IMAGE UPLOAD SECTION */}
              {photoUploadWindow ? (
                <Row>
                  <Col className="px-0">
                    <Card className="rounded-3 mb-3">
                      <Card.Body className="d-flex justify-content-center m-2 p-0">
                        <Form.Group className="img-upload-form d-flex justify-content-center position-relative">
                          <Form.Label
                            htmlFor="file-input"
                            className="img-upload-label flex-grow-1 position-relative mb-0"
                          >
                            <CloseButton
                              className="position-absolute top-0 end-0 m-2"
                              onClick={handleHidePhotoUploadWindow}
                            />
                            <Image
                              src={uploadIcon}
                              className="position-absolute top-50 start-50 translate-middle"
                            />
                          </Form.Label>
                          <Form.Control
                            ref={postPhotoInput}
                            type="file"
                            accept="image/*"
                            id="file-input"
                            className="border-0"
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : null}

              {/* ADDITIONAL TOOLBAR SECTION */}
              <Row>
                <Col className="px-0">
                  <Card className="rounded-3">
                    <Card.Body className="d-flex text-start my-2 py-0">
                      <Card.Text className="me-auto mt-2 mb-0 fw-bold">
                        Add to your post
                      </Card.Text>

                      {[
                        ["Photo", photoIcon],
                        ["Tag People", peopleIcon],
                        ["Check In", locationIcon],
                      ].map((element) => (
                        <OverlayTrigger
                          key={element[0]}
                          placement="top"
                          overlay={
                            <Tooltip id={`tooltip-${element[0]}`}>
                              {element[0]}
                            </Tooltip>
                          }
                        >
                          <Button
                            variant="light"
                            className="rounded-circle me-1 p-2"
                            onClick={
                              element[0] === "Photo"
                                ? handleShowPhotoUploadWindow
                                : null
                            }
                          >
                            <Image alt="" src={element[1]} height="24" />
                          </Button>
                        </OverlayTrigger>
                      ))}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Modal.Body>

          <Modal.Footer className="d-flex justify-content-center border-0">
            <Button
              variant="primary"
              type="submit"
              className="flex-grow-1 fw-bold px-5"
              onClick={handleClickPostButton}
            >
              Post
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Posts;
