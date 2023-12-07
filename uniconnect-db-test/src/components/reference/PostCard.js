import React, { useState } from 'react';
import './css/PostCard.css';

const PostCard = ({ title, content, author }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    // 좋아요 로직을 구현하세요.
  };

  const handleComment = () => {
    // 댓글 로직을 구현하세요.
  };

  const handleSubscribe = () => {
    // 구독 로직을 구현하세요.
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // 댓글 등록 로직을 구현하세요.
    // 예시: setComments([...comments, comment]);
    setComment("");
  };

  return (
    <div className="feedCard">
      <h2 className="title">{title}</h2>
      <p className="content">{content}</p>
      <p className="author">{author}</p>
      <div className="buttons">
        <button onClick={handleLike}>좋아요</button>
        <button onClick={handleComment}>댓글</button>
        <button onClick={handleSubscribe}>구독</button>
      </div>
      <div className="comments">
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <div className="commentInput">
        <input type="text" value={comment} onChange={handleCommentChange} />
        <button onClick={handleCommentSubmit}>등록</button>
      </div>
    </div>
  );
};

export default PostCard;