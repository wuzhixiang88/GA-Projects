import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// LOGO/IMAGE IMPORTS
import likeIcon from "../like.png";
import likeIcon2 from "../like2.png";
import commentIcon from "../comment.png";
import seedProfilePhoto from "../seed_profile_photo.jpg";
import lorenIpsumPhoto from "../lorem-ipsum.png";
// BOOTSTRAP COMPONENT IMPORTS
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const Posts = ({ posts, showPostImage }) => {
  const [postComments, setPostComments] = useState([
    {
      user: "Zhixiang Wu",
      body: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    },
    {
      user: "Zhixiang Wu",
      body: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
    },
  ]);

  const [postLikeCounter, setPostLikeCounter] = useState(0);
  const [postCommentCounter, setPostCommentCounter] = useState(0);

  const postCommentInput = useRef();
  const postCommentReplyInput = useRef();

  const handlePostComments = (e) => {
    e.preventDefault();

    setPostComments([
      ...postComments,
      {
        user: "Zhixiang Wu",
        body: postCommentInput.current.value,
      },
    ]);
    postCommentInput.current.value = "";

    handlePostCommentCounter(e);
  };

  const handlePostLikeCounter = () => {
    setPostLikeCounter(postLikeCounter + 1);
  };
  const handlePostCommentCounter = (e) => {
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
      {posts.map((post) => (
        <Card className="border-0 rounded-3 mb-3">
          {/* POST USER DETAILS & DATE OF POST SECTION */}
          <Card.Body className="d-flex text-start py-0">
            <Col md="auto" className="my-3 me-2">
              <Image
                alt=""
                src={seedProfilePhoto}
                width="40"
                height="40"
                className="border rounded-circle"
              />
            </Col>
            <Col className="d-flex flex-column align-self-center">
              <Card.Text className="post-feed-user mb-0">{post.user}</Card.Text>
              <Card.Text className="post-feed-date">{post.date}</Card.Text>
            </Col>
          </Card.Body>

          {/* POST BODY (TEXT) SECTION */}
          <Card.Body className="pt-0">
            <Card.Text className="text-start">{post.body}</Card.Text>
          </Card.Body>

          {/* POST BODY (IMAGE) SECTION */}
          {showPostImage ? (
            <Card.Body className="mx-3 mb-3 p-0">
              <Link
                to={{
                  pathname: "/photo/id",
                  state: { post: [post] },
                }}
              >
                <Image fluid rounded alt="" src={lorenIpsumPhoto} />
              </Link>
            </Card.Body>
          ) : null}

          {/* POST LIKE & COMMENT COUNTER SECTION */}
          {postLikeCounter || postCommentCounter ? (
            <>
              <Card.Body className="d-flex pt-0">
                <Col md="auto">
                  {postLikeCounter ? (
                    <>
                      <Image
                        alt=""
                        src={likeIcon2}
                        height="20"
                        className="mb-1 me-2"
                      />
                      {postLikeCounter}
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
                id="like-comment-button"
                onClick={handlePostLikeCounter}
              >
                <Image
                  alt=""
                  src={likeIcon}
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
                <Image alt="" src={commentIcon} height="20" className="me-2" />
                Comment
              </Button>
            </Col>
          </Card.Body>

          {/* POST COMMENTS SECTION */}
          <Card.Body className="text-start py-0">
            {postComments.map((postComment) => (
              <>
                <Col className="d-flex">
                  <Col md="auto" className="me-2">
                    <Image
                      alt=""
                      src={seedProfilePhoto}
                      width="40"
                      height="40"
                      className="border rounded-circle"
                    />
                  </Col>
                  <Col>
                    <Col id="user-comment-col">
                      <Card.Text className="fw-bold mb-0 ps-3 pt-2">
                        {postComment.user}
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
                          src={seedProfilePhoto}
                          width="30"
                          height="30"
                          className="border rounded-circle"
                        />
                      </Col>
                      <Col>
                        <Col id="user-comment-col">
                          <Card.Text className="fw-bold mb-0 ps-3 pt-2">
                            Zhixiang Wu
                          </Card.Text>
                          <Card.Text className="px-3 pb-2">
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout.
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
                      </Col>
                    </Col>
                    {/* COMMENTS REPLIES INPUT SECTION */}
                    <Col className="d-flex ps-2 py-0">
                      <Col md="auto" className="me-2">
                        <Image
                          alt=""
                          src={seedProfilePhoto}
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
                src={seedProfilePhoto}
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
      ))}
    </>
  );
};

export default Posts;
