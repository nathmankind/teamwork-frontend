import React from "react";
import { IoFlagOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { IoEllipsisHorizontal } from "react-icons/io5";

const FeedCard = (gif_url, article, title) => {
  return (
    <>
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
            <p className="feed-title">Title: {title}</p>
            {article !== null && <p className="feed-content-post">{article}</p>}
            {gif_url !== null && (
              <img src={gif_url} alt="gif post" style={{ width: 250 }} />
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
    </>
  );
};
export default FeedCard;
