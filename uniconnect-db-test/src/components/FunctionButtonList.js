import React from "react";
import fetchData from "@/utils/fetchData";

const functionList = [
  {
    id: 1,
    name: "글 목록",
    available_role: ["reader", "student", "researcher", "lab_manager", "admin"],
    contentType: "post",
    onClick: (setContentType, setFetchedData, selectedUser) => {
      setContentType("post");
      fetchData("/api/post", setFetchedData, selectedUser.role, {}, "post");
    },
  },
  {
    id: 2,
    name: "연구실 목록",
    available_role: ["reader", "student", "researcher", "lab_manager", "admin"],
    contentType: "lab",
    onClick: (setContentType, setFetchedData, selectedUser) => {
      setContentType("lab");
      fetchData("/api/lab", setFetchedData, selectedUser.role, {}, "lab");
    },
  },
  {
    id: 3,
    name: "전공 등록하기",
    available_role: ["reader", "student", "researcher", "lab_manager"],
    contentType: "majorEditor",
    onClick: (setContentType, setFetchedData, selectedUser) => {
      setContentType("majorEditor");
      fetchData(
        `/api/profile/${selectedUser.id}`,
        setFetchedData,
        selectedUser.role,
        {},
        "majorEditor"
      );
    },
  },
  {
    id: 4,
    name: "학위 등록하기",
    available_role: ["student", "researcher", "lab_manager"],
    contentType: "degreeEditor",
    onClick: (setContentType, setFetchedData, selectedUser) => {
      setContentType("degreeEditor");
      fetchData(
        `/api/profile/${selectedUser.id}`,
        setFetchedData,
        selectedUser.role,
        {},
        "degreeEditor"
      );
    },
  },
  {
    id: 5,
    name: "글 작성",
    available_role: ["researcher", "lab_manager"],
    contentType: "postEditor",
    onClick: (setContentType, setFetchedData, selectedUser) => {
      setContentType("postEditor");
      // fetchData(
      //   `/api/post/${selectedUser.id}`,
      //   setFetchedData,
      //   selectedUser.role,
      //   {},
      //   "postEditor"
      // );
    },
  },
  {
    id: 6,
    name: "내 작성글",
    available_role: ["researcher", "lab_manager"],
    contentType: "post",
    onClick: (setContentType, setFetchedData, selectedUser) => {
      setContentType("post");
      fetchData(
        `/api/post/${selectedUser.id}`,
        setFetchedData,
        selectedUser.role,
        {},
        "post"
      );
    },
  },
  {
    id: 7,
    name: "연구실 컨택 요청보기",
    available_role: ["lab_manager"],
    contentType: "labContact",
    onClick: (setContentType, setFetchedData, selectedUser) => {
      setContentType("labContact");
      // selectedUser 가 lab_manager 일 때만 작동
      fetchData(
        `/api/contact/${selectedUser.id}`,
        setFetchedData,
        selectedUser.role,
        {},
        "labContact"
      );
    },
  },
  {
    id: 8,
    name: "연구실 관리자 신청 보기",
    available_role: ["admin"],
    contentType: "labManagerRequest",
    onClick: (setContentType, setFetchedData, selectedUser) => {
      setContentType("labManagerRequest");
      fetchData(
        "/api/manager_requests",
        setFetchedData,
        selectedUser.role,
        {},
        "labManagerRequest"
      );
    },
  },
  {
    id: 9,
    name: "유저 관리",
    available_role: ["admin"],
    contentType: "user",
    onClick: (setContentType, setFetchedData, selectedUser) => {
      setContentType("user");
      fetchData("/api/user", setFetchedData, selectedUser.role, {}, "user");
    },
  },
];

export default function FunctionButtonList({
  selectedUser,
  setFetchedData,
  setContentType,
}) {
  return (
    <div className="flex justify-center my-2">
      {functionList.map((func) => {
        if (selectedUser && func.available_role.includes(selectedUser.role)) {
          return (
            <button
              key={func.id}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden font-medium rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-cyan-200"
              onClick={() =>
                func.onClick(setContentType, setFetchedData, selectedUser)
              }
            >
              <span className="relative px-5 py-2.5 text-black hover:text-white transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                {func.name}
              </span>
            </button>
          );
        }
        return null; // Return null when the button should not be rendered
      })}
    </div>
  );
}
