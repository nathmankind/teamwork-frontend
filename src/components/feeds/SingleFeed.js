import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  ListGroup,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserListSelectors, CommentsSelectors, PostsSelectors } from "../store";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { AiFillEdit, AiOutlineUser } from "react-icons/ai";
import { IoFlagOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import EditPostModal from "./EditPostModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeletePostModal from "./DeleteModal";
import EditCommentModal from "./EditComment";
import DeleteCommentModal from "./DeleteComment";

const SingleFeedView = () => {
  const { postId } = useParams();

  const [post, setPost] = useState([]);
  const [comment, setComment] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [editComment, setEditComment] = useState(false);
  const [deleteComment, setDeleteComment] = useState(false);
  const [commentId, setCommentId] = useState("");

  const { selectAllUsers } = UserListSelectors;
  const { selectAllComments, selectCommentStatus } = CommentsSelectors;
  const { selectAllPosts } = PostsSelectors;
  const allUsersData = useSelector(selectAllUsers);
  const allComments = useSelector(selectAllComments);
  const commentStatus = useSelector(selectCommentStatus);
  const Posts = useSelector(selectAllPosts);
  const allPosts = Posts.data.data;

  const currentUserId = JSON.parse(sessionStorage.getItem("user_payload")).id;
  const userData = JSON.parse(sessionStorage.getItem("user_payload"));
  useEffect(() => {
    if (allPosts !== undefined) {
      const singlePost = allPosts.filter((post) => {
        return post.id === postId;
      });
      setPost(singlePost);
    }
  }, [postId, allPosts]);

  if (commentStatus !== "completed") {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  const base_url = `${process.env.REACT_APP_BACKEND_URL}/api/v1`;
  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;

  const AddComment = (post_id) => {
    console.log(post_id);
    const data = {
      comment: comment,
    };
    axios
      .post(`${base_url}/posts/${post_id}/comment`, data, {
        headers: {
          token: `${token}`,
        },
      })
      .then(
        (response) => {
          if ([200, 201].includes(response.status)) {
            setTimeout(() => {
              alert("Comment has been added");
              window.location.reload();
            }, 3000);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div>
      <Container>
        <Row>
          <Col md={3} lg={3} xs={0} sm={0}>
            <div className="user-info">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Fullname: {`${userData.first_name} ${userData.last_name}`}
                </ListGroup.Item>
                <ListGroup.Item>
                  Email Address: {`${userData.email}`}
                </ListGroup.Item>
                <ListGroup.Item>Gender: {`${userData.gender}`}</ListGroup.Item>
                <ListGroup.Item>
                  Address: {`${userData.address}`}
                </ListGroup.Item>
                <ListGroup.Item>
                  Job Role: {`${userData.job_role}`}
                </ListGroup.Item>
                <ListGroup.Item>
                  Department: {`${userData.department}`}
                </ListGroup.Item>
                <ListGroup.Item>
                  User Type: {userData.is_admin ? "Admin" : " Employee"}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col md={6} lg={6}>
            {post !== undefined &&
              post.map((post) => {
                return (
                  <div key={post.id} className="o-feeds-content-card">
                    <div className="feed-card-left-col">
                      <div className="user-avatar">
                        <AiOutlineUser
                          style={{ color: "#fff", width: 28, height: 22 }}
                        />
                      </div>
                    </div>
                    <div className="feed-card-right-col">
                      <div className="feed-card-top">
                        <div className="feed-owner-details-time">
                          <p className="feed-username">
                            {`${
                              allUsersData.data.data !== undefined &&
                              allUsersData.data.data.find((user) => {
                                return user.id === post.user_id;
                              }).first_name
                            } ${
                              allUsersData.data.data !== undefined &&
                              allUsersData.data.data.find((user) => {
                                return user.id === post.user_id;
                              }).last_name
                            }`}
                          </p>
                          <p className="feed-time">
                            {" "}
                            <ReactTimeAgo
                              date={post.createdat}
                              locale="en-US"
                            />
                          </p>
                        </div>
                        {/* <EditPostModal postId={post.id} /> */}

                        {currentUserId === post.user_id && (
                          <div className="action-btn">
                            <AiFillEdit
                              style={{ width: 20, height: 25, marginRight: 10 }}
                              onClick={() => {
                                setModalShow(true);
                              }}
                            />
                            <RiDeleteBin6Line
                              onClick={() => {
                                setDeleteModal(true);
                              }}
                            />
                          </div>
                        )}

                        <EditPostModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          post_id={postId}
                        />
                        <DeletePostModal
                          show={deleteModal}
                          onHide={() => setDeleteModal(false)}
                          post_id={postId}
                        />
                      </div>

                      <div className="feed-content">
                        <p className="feed-title">Title: {post.title}</p>
                        {post.article !== null && (
                          <p className="feed-content-post">{post.article}</p>
                        )}
                        {post.gif !== null && (
                          <img
                            src={post.gif}
                            alt="gif post"
                            style={{ width: 250 }}
                          />
                        )}
                      </div>
                      <div
                        className="feed-comment-no"
                        onClick={() => setCardOpen(true)}
                      >
                        <p>
                          {`${
                            allComments.data.data !== undefined &&
                            allComments.data.data.filter((comments) => {
                              return comments.post_id === post.id;
                            }).length
                          } comments`}
                        </p>
                      </div>
                      <div className="feed-action-btn">
                        <button
                          className="comment-btn"
                          onClick={() => setCardOpen(true)}
                        >
                          {" "}
                          <GoComment /> Add Comment
                        </button>
                        <button>
                          <IoFlagOutline /> Flag content
                        </button>
                      </div>

                      {cardOpen && (
                        <div className="comment-section">
                          <div className="comment-input-box">
                            <input
                              type="text"
                              value={comment}
                              onChange={(e) => {
                                const { value } = e.target;

                                setComment(value);
                              }}
                            />
                            <Button
                              variant="primary"
                              onClick={() => AddComment(post.id)}
                            >
                              Send
                            </Button>
                          </div>
                          <div className="all-comments">
                            {allComments.data.data !== undefined &&
                              allComments.data.data
                                .filter((comments) => {
                                  return comments.post_id === post.id;
                                })
                                .map((comment) => {
                                  return (
                                    <div className="comment-item">
                                      <div className="comment-left-col">
                                        <div className="user-avatar">
                                          <AiOutlineUser
                                            style={{
                                              color: "#fff",
                                              width: 28,
                                              height: 22,
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="comment-right-col">
                                        <div className="comment-top">
                                          <p className="comment-username">
                                            {allUsersData.data.data !==
                                              undefined &&
                                              allUsersData.data.data.find(
                                                (user) => {
                                                  return (
                                                    user.id === comment.user_id
                                                  );
                                                }
                                              ).first_name}
                                          </p>
                                          <p className="comment-time">
                                            <ReactTimeAgo
                                              date={comment.createdat}
                                              locale="en-US"
                                            />
                                          </p>
                                        </div>
                                        <div className="comment-buttom">
                                          <p className="comment-data">
                                            {comment.comment}
                                          </p>
                                        </div>
                                        <EditCommentModal
                                          show={editComment}
                                          onHide={() => setEditComment(false)}
                                          commentId={commentId}
                                        />
                                        <DeleteCommentModal
                                          show={deleteComment}
                                          onHide={() => setDeleteComment(false)}
                                          commentId={commentId}
                                          comment_id={1}
                                        />
                                        {currentUserId === comment.user_id && (
                                          <div className="comment-action-btns">
                                            <Button
                                              onClick={() => {
                                                setEditComment(true);
                                                setCommentId(comment.id);
                                              }}
                                            >
                                              Edit comment
                                            </Button>
                                            <Button
                                              onClick={() =>
                                                setDeleteComment(true)
                                              }
                                            >
                                              Delete comment
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleFeedView;
