import fetchData from "@/utils/fetchData";
import React, { useState } from "react";

export default function PostEditor({
  fetchedData,
  setFetchedData,
  setContentType,
  selectedUser,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleConfirm = async () => {
    const response = await fetchData(
      `/api/post/${selectedUser.id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "POST",
        body: JSON.stringify({ title, content }),
      },
      "post"
    );

    setContentType("post");
  };

  return (
    <div className="flex flex-col">
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mb-4 p-2 border rounded h-48"
      />
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleConfirm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          작성
        </button>
      </div>
    </div>
  );
}
