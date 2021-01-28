import { React, useState } from "react";
import { Container, Row, Col, ListGroup, Spinner } from "react-bootstrap";
import { IoFlagOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserListSelectors, PostsSelectors, CommentsSelectors } from "../store";
import ReactTimeAgo from "react-time-ago";
import { AiFillEdit, AiOutlineUser } from "react-icons/ai";
import EditPostModal from "./EditPostModal";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeletePostModal from "./DeleteModal";
import { useHistory } from "react-router-dom";

const Feeds = () => {
  const [isArticle, setIsArticle] = useState(false);
  const [isGif, setIsGif] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [article, setArticle] = useState("");
  const [gifFile, setGifFile] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const base_url = process.env.REACT_APP_BACKEND_URL;
  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;
  const currentUserId = JSON.parse(sessionStorage.getItem("user_payload")).id;
  const userData = JSON.parse(sessionStorage.getItem("user_payload"));

  const { selectAllUsers } = UserListSelectors;
  const { selectAllComments, selectCommentStatus } = CommentsSelectors;
  const { selectAllPosts } = PostsSelectors;
  const allUsersData = useSelector(selectAllUsers);
  const allComments = useSelector(selectAllComments);
  const commentStatus = useSelector(selectCommentStatus);
  const Posts = useSelector(selectAllPosts);
  const allPosts = Posts.data.data;

  const history = useHistory();

  if (commentStatus === "loading" || commentStatus === "idle") {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  const handleArticlePostSubmit = () => {
    if (gifFile === undefined && article !== "") {
      const data = {
        title: postTitle,
        article: article,
      };
      axios
        .post(`${base_url}/posts`, data, {
          headers: {
            token: `${token}`,
          },
        })
        .then(
          (response) => {
            if ([200, 201].includes(response.status)) {
              setTimeout(() => {
                alert("Successful Post");
                window.location.reload();
              }, 3000);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
    if (gifFile !== undefined && article === "") {
      const fileData = new FormData();
      fileData.append("gif", gifFile);
      fileData.append("title", postTitle);

      axios
        .post(`${base_url}/posts/gif`, fileData, {
          headers: {
            token: `${token}`,
          },
        })
        .then(
          (response) => {
            if ([200, 201].includes(response.status)) {
              setTimeout(() => {
                alert("Successful Post");
                window.location.reload();
              }, 3000);
            }
          },
          (error) => {
            alert(error);
          }
        );
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col lg={3} md={3} className="d-none d-lg-block">
            <div className="user-info">
              <ListGroup variant="flush">
                <div className="user-info-header">User Info</div>
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
          <Col md={6}>
            {/* Form for posting */}
            <div className="feed-header">Feeds</div>
            <div className="form-post-card">
              <div className="form-col-left">
                <div className="user-avatar">
                  <AiOutlineUser
                    style={{ color: "#fff", width: 28, height: 22 }}
                  />
                </div>
              </div>
              <div className="form-col-right">
                <div className="form-area">
                  <div className="form-fields">
                    <input
                      type="text"
                      name="post-title"
                      placeholder="Enter Post title"
                      value={postTitle}
                      onChange={(e) => {
                        const { value } = e.target;
                        setPostTitle(value);
                      }}
                    />
                    {isArticle && (
                      <textarea
                        name="article"
                        id=""
                        cols="100%"
                        rows="10"
                        placeholder="Enter article post"
                        value={article}
                        onChange={(e) => {
                          const { value } = e.target;
                          setArticle(value);
                        }}
                      ></textarea>
                    )}
                    {isGif && (
                      <input
                        type="file"
                        name="gif"
                        accept=".gif"
                        onChange={(e) => {
                          const file = e.target.files;
                          setGifFile(file[0]);
                        }}
                      />
                    )}
                  </div>
                  <div className="form-btn-wrapper">
                    <button
                      onClick={() => {
                        setIsArticle(!isArticle);
                        setIsGif(false);
                      }}
                    >
                      Artcicle
                    </button>
                    <button
                      onClick={() => {
                        setIsGif(!isGif);
                        setIsArticle(false);
                      }}
                    >
                      Gif
                    </button>
                    <button
                      className="btn btn-primary post-btn"
                      onClick={handleArticlePostSubmit}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Form ends */}
            {allPosts !== undefined &&
              allPosts.map((post) => {
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
                                setSelectedPostId(post.id);
                              }}
                            />
                            <RiDeleteBin6Line
                              onClick={() => {
                                setDeleteModal(true);
                                setSelectedPostId(post.id);
                              }}
                            />
                          </div>
                        )}

                        <EditPostModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                          post_id={selectedPostId}
                        />
                        <DeletePostModal
                          show={deleteModal}
                          onHide={() => setDeleteModal(false)}
                          post_id={selectedPostId}
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
                        onClick={() => setActiveIndex(allPosts.indexOf(post))}
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
                          onClick={() => history.push(`/feeds/${post.id}`)}
                        >
                          {" "}
                          <GoComment /> View Post
                        </button>
                        <button>
                          <IoFlagOutline /> Flag content
                        </button>
                      </div>

                      {activeIndex === allPosts.indexOf(post) && (
                        <div className="comment-section">
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
export default Feeds;
