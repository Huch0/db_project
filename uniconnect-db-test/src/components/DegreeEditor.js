import fetchData from "@/utils/fetchData";
import React, { useEffect, useState } from "react";

export default function DegreeEditor({
  fetchedData,
  setFetchedData,
  selectedUser,
}) {
  const [degree, setDegree] = useState("");

  const handleConfirm = async () => {
    // Handle confirm action here
    if (degree === "") {
      alert("학위 과정을 입력하세요");
      return;
    }

    await fetchData(
      `/api/editDegree/${selectedUser.id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "POST",
        body: JSON.stringify({
          degree: degree,
        }),
      },
      "degreeEditor"
    );
  };

  return (
    <div className="flex flex-col">
      {fetchedData && fetchedData.dataType === "degreeEditor" && (
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="font-bold">
                현재 학위 과정 :{" "}
                {fetchedData.data.degree === null
                  ? "없음"
                  : degreeMap[fetchedData.data.degree]}
              </span>
            </div>
          </div>
        </div>
      )}
      <select
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">학위 과정을 고르세요</option>
        <option value="undergraduate">학부생</option>
        <option value="master">석사</option>
        <option value="doctoral">박사</option>
        <option value="professor">교수</option>
      </select>
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

const degreeMap = {
  undergraduate: "학부생",
  master: "석사",
  doctoral: "박사",
  professor: "교수",
};
