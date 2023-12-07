import fetchData from "@/utils/fetchData";
import React, { useEffect, useState } from "react";

export default function MajorEditor({
  fetchedData,
  setFetchedData,
  selectedUser,
}) {
  const [major, setMajor] = useState("");
  const [currentMajor, setCurrentMajor] = useState(null);

  const handleConfirm = async () => {
    // Handle confirm action here
    if (major === "") {
      alert("전공을 입력하세요");
      return;
    }

    await fetchData(
      `/api/editMajor/${selectedUser.id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "POST",
        body: JSON.stringify({
          user_id: selectedUser.id,
          major_name: major,
        }),
      },
      "majorEditor"
    );
  };

  useEffect(() => {
    if (
      fetchedData &&
      fetchedData.dataType === "majorEditor" &&
      fetchedData.data.major_id !== null
    ) {
      fetchData(
        `/api/major/${fetchedData.data.major_id}`,
        setCurrentMajor,
        selectedUser.role
      );
    }
  }, [fetchedData]);

  return (
    <div className="flex flex-col">
      {fetchedData && fetchedData.dataType === "majorEditor" && (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-bold">
                현재 전공 :{" "}
                {currentMajor !== null ? currentMajor.major_name : "없음"}
              </span>
            </div>
          </div>
        </div>
      )}
      <input
        type="text"
        placeholder="전공을 입력하세요"
        value={major}
        onChange={(e) => setMajor(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleConfirm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          등록
        </button>
      </div>
    </div>
  );
}
