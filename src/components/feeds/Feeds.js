import { React, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import FeedCard from "./FeedCard";
// import { posts } from "./constants";
import { IoFlagOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { IoEllipsisHorizontal } from "react-icons/io5";
import axios from "axios";

const Feeds = () => {
  const [posts, setPosts] = useState([]);

  const api_url = `http://localhost:8000/api/v1`;
  const token = JSON.parse(sessionStorage.getItem("user_payload")).token;

  useEffect(() => {
    axios
      .get(`${api_url}/posts`, {
        headers: {
          token: `${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.data);
      });
  }, [api_url, token]);
  return (
    <div>
      <Container>
        <Row>
          <Col md={3} lg={3}>
            <div className="o-feed-user-pane">
              <p>
                This is the user bio section of the page... only to be shown on
                desktop view{" "}
              </p>
            </div>
          </Col>
          <Col md={6}>
            {posts.map((post) => {
              return (
                <div className="o-feeds-content-card">
                  <div className="feed-card-left-col">
                    <div className="user-avatar">
                      <p>BD</p>
                    </div>
                  </div>
                  <div className="feed-card-right-col">
                    <div className="feed-card-top">
                      <div className="feed-owner-details-time">
                        <p className="feed-username">User Name</p>
                        <p className="feed-time">10 hours ago</p>
                      </div>
                      <IoEllipsisHorizontal style={{ width: 25, height: 25 }} />
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
                    <div className="feed-comment-no">
                      <p>10 comments</p>
                    </div>
                    <div className="feed-action-btn">
                      <button className="comment-btn">
                        {" "}
                        <GoComment /> Comment
                      </button>
                      <button>
                        <IoFlagOutline /> Flag content
                      </button>
                    </div>
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
