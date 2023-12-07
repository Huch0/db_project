"use client";

import React, { useState, useEffect } from "react";
import UserSelector from "@/components/UserSelector";
import FunctionButtonList from "@/components/FunctionButtonList";
import ContentDisplay from "@/components/ContentDisplay";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);
  const [contentType, setContentType] = useState(null);

  return (
    <>
      <div>
        <UserSelector
          users={users}
          setUsers={setUsers}
          setSelectedUser={setSelectedUser}
          fetchedData={fetchedData}
        />
        <FunctionButtonList
          selectedUser={selectedUser}
          setFetchedData={setFetchedData}
          setContentType={setContentType}
        />
        <ContentDisplay
          fetchedData={fetchedData}
          setFetchedData={setFetchedData}
          contentType={contentType}
          setContentType={setContentType}
          selectedUser={selectedUser}
        />
      </div>
      {selectedUser && selectedUser.role === "banned" && (
        <div className="mx-auto mt-10 max-w-2xl gap-x-8 border-t border-gray-200 pt-10">
          <h1 className="text-2xl font-bold text-center text-red-500">
            접근 권한이 없습니다.
          </h1>
        </div>
      )}
    </>
  );
}
