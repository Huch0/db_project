import React, { useEffect, useState } from "react";
import fetchData from "@/utils/fetchData";
import moment from "moment";
import CommentCard from "@/components/CommentCard";

export default function PostCard({ post, selectedUser, setFetchedData }) {
  const [author, setAuthor] = useState(null);
  const [likes, setLikes] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (!post.author_id) {
      return;
    }
    fetchData(`/api/user/${post.author_id}`, setAuthor, selectedUser.role);
    fetchData(`/api/like/${post.id}`, setLikes, selectedUser.role);
    fetchData(`/api/comment/${post.id}`, setComments, selectedUser.role);
  }, [post]);

  useEffect(() => {
    if (!likes) {
      return;
    }
    const likedUserIds = likes.map((like) => like.user_id);
    setLiked(likedUserIds.includes(selectedUser.id));
  }, [likes, selectedUser]);

  const handleLike = async () => {
    await fetchData(`/api/like/${post.id}`, setLikes, selectedUser.role, {
      method: liked ? "DELETE" : "POST",
      body: JSON.stringify({ user_id: `${selectedUser.id}` }),
    });
  };

  const handleDelete = async () => {
    console.log(post.id);
    await fetchData(
      `/api/post_delete_edit/${post.id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "DELETE",
      },
      "post"
    );
  };

  const handleEdit = async () => {
    const title = prompt("수정할 제목을 입력하세요");
    const content = prompt("수정할 내용을 입력하세요");
    await fetchData(
      `/api/post_delete_edit/${post.id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "POST",
        body: JSON.stringify({ title, content }),
      },
      "post"
    );
  };

  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-1 w-full">
      <div className="flex flex-col items-start px-4 py-6">
        <div className="">
          <h1 className="text-lg font-semibold">{post.title} </h1>
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-gray-900 -mt-1">
              {author && author.user_name}
            </h2>
            <small className="text-sm text-gray-700">
              {moment(post.createdAt).fromNow()}
            </small>
          </div>
          <p className="mt-3 text-gray-700 text-sm h-48">{post.content}</p>
          <div className="mt-4 flex items-center">
            <div className="flex justify-end space-x-4 p-4">
              {/* Like Button */}
              <button
                className="flex mr-2 text-red-500 text-sm mr-3"
                onClick={() => handleLike()}
              >
                <svg
                  fill={liked ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{likes && likes.length}</span>
              </button>
              {/* Comment Button */}
              <button
                className="flex mr-2 text-blue-500 text-sm mr-8"
                onClick={() => setShowComments(!showComments)}
              >
                <svg
                  fill={showComments ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-1"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
                <span>{comments && comments.length}</span>
              </button>
              {
                (selectedUser.role === "admin") ? (
                  <>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      삭제
                    </button>
                  </>
                ) :null
              }
              {
                (post.author_id === selectedUser.id) ? (
                  <>
                    <button
                      onClick={handleEdit}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      수정
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      삭제
                    </button>
                  </>
                )
                :null
              }
            </div>
          </div>
        </div>

        {showComments && (
          <CommentCard
            comments={comments}
            selectedUser={selectedUser}
            setComments={setComments}
            postId={post.id}
          />
        )}
      </div>
    </div>
  );
}
