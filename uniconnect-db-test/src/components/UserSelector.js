import React, { useState, useEffect } from "react";
import fetchData from "@/utils/fetchData";

export default function UserSelector({
  users,
  setUsers,
  setSelectedUser,
  fetchedData,
}) {
  useEffect(() => {
    fetchData("/api/user", setUsers, "admin", {}, "user");
  }, []);

  useEffect(() => {
    if (fetchedData) {
      fetchData("/api/user", setUsers, "admin", {}, "user");
    }
  }, [fetchedData]);

  return (
    <div className="flex justify-center my-2">
      <select
        className="block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        onChange={(e) =>
          setSelectedUser(
            users.data.find((user) => user.id === parseInt(e.target.value))
          )
        }
      >
        <option value="">유저를 선택하세요</option>
        {users.dataType === "user" &&
          users.data.map((user) => (
            <option key={user.id} value={user.id}>
              {user.user_name} / {user.role}
            </option>
          ))}
      </select>
    </div>
  );
}
