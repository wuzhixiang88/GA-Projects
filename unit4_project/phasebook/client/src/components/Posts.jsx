import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// EXTERNAL PLUGIN IMPORTS
import axios from "axios";
// LOGO/IMAGE IMPORTS
import likeIcon from "../like.png";
import likeButtonIcon from "../like-button.png";
import unlikeButtonIcon from "../unlike-button.png";
import commentIcon from "../comment.png";
import emptyImage from "../empty.png";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const Posts = ({ userPhotos, posts, setPosts, showPostImage }) => {
  const username = localStorage.getItem("username");

  const [postCommentCounter, setPostCommentCounter] = useState(0);

  const postCommentInput = useRef();
  const postCommentReplyInput = useRef();

  const handlePostComments = async (e) => {
    e.preventDefault();

    postCommentInput.current.value = "";

    handlePostCommentCounter();
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

  const focusPostCommentInput = () => {
    postCommentInput.current.focus();
  };
  const focusPostCommentReplyInput = () => {
    postCommentReplyInput.current.focus();
  };

  return (
    <>
      {posts
        ? posts.map((post, index) => (
            <Card className="border-0 rounded-3 mb-3">
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
                {post.comments.map((postComment) => (
                  <>
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
                            onClick={focusPostCommentReplyInput}
                          >
                            Reply
                          </Button>
                        </Col>
                        {/* COMMENTS REPLIES SECTION */}
                        <Col className="d-flex text-start ps-2 py-0">
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
                            {postComment.replies.map((postCommentReply) => (
                              <>
                                <Col id="user-comment-col">
                                  <Card.Text className="fw-bold mb-0 ps-3 pt-2">
                                    {`${postCommentReply.user.first_name} ${postCommentReply.user.last_name}`}
                                  </Card.Text>
                                  <Card.Text className="px-3 pb-2">
                                    {postCommentReply.body}
                                  </Card.Text>
                                </Col>
                                <Col className="mt-0">
                                  <Button variant="link" id="like-reply-button">
                                    Like
                                  </Button>
                                  <Button
                                    variant="link"
                                    id="like-reply-button"
                                    onClick={focusPostCommentReplyInput}
                                  >
                                    Reply
                                  </Button>
                                </Col>
                              </>
                            ))}
                          </Col>
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
                            <Form>
                              <Form.Group className="flex-grow-1 align-self-center">
                                <Form.Control
                                  ref={postCommentReplyInput}
                                  type="text"
                                  placeholder="Write a reply..."
                                  className="mb-3 rounded-pill"
                                />
                              </Form.Group>
                            </Form>
                          </Col>
                        </Col>
                      </Col>
                    </Col>
                  </>
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
                  <Form onSubmit={handlePostComments}>
                    <Form.Group className="flex-grow-1 align-self-center">
                      <Form.Control
                        ref={postCommentInput}
                        type="text"
                        placeholder="Write a comment..."
                        className="mb-3 rounded-pill"
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Card.Body>
            </Card>
          ))
        : null}
    </>
  );
};

export default Posts;
