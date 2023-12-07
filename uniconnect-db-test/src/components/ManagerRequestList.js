import { useState, useEffect } from "react";
import fetchData from "@/utils/fetchData";

function RequestCard({ request, selectedUser, setFetchedData }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [user, setUser] = useState(null);
  const [lab, setLab] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const confirmedRequest = async () => {
    fetchData(
      `/api/manager_requests/${request.user_id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "DELETE",
        body: JSON.stringify({ status: "confirmed", lab_id: request.lab_id }),
      },
      "labManagerRequest"
    );
    setRefresh(!refresh);
  };

  const cancelRequests = async () => {
    fetchData(
      `/api/manager_requests/${request.user_id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "DELETE",
        body: JSON.stringify({ status: "cancled", lab_id: request.lab_id }),
      },
      "labManagerRequest"
    );
    setRefresh(!refresh);
  };

  useEffect(
    () => {
      // console.log(request, user, lab);
      if (!request || !request.user_id || !request.lab_id) return;
      fetchData(`/api/user/${request.user_id}`, setUser, selectedUser.role);
      fetchData(`/api/lab/${request.lab_id}`, setLab, selectedUser.role);
    },
    [request],
    [refresh]
  );

  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-1 w-full flex-col justify-between">
      <div className="flex items-start px-4 py-6">
        <div className="">
          <h1 className="text-lg font-semibold">{user && user.user_name}</h1>
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-gray-900 -mt-1">
              {lab && lab.lab_name}
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-4 p-4">
        <button
          onClick={confirmedRequest}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          수락
        </button>
        <button
          onClick={cancelRequests}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          거절
        </button>
      </div>
    </div>
  );
}

export default function ManagerRequestList({
  fetchedData,
  setFetchedData,
  selectedUser,
}) {
  return (
    <div className="flex flex-col">
      {fetchedData &&
        fetchedData.dataType === "labManagerRequest" &&
        fetchedData.data.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            setFetchedData={setFetchedData}
            selectedUser={selectedUser}
          />
        ))}
    </div>
  );
}
