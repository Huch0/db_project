import { useState, useEffect } from "react";
import fetchData from "@/utils/fetchData";

function LabCard({ lab, selectedUser }) {
  const [school, setSchool] = useState(null);
  const [contact, setContact] = useState(null);
  const [contactStatus, setContactStatus] = useState(null);
  const [managerRequestStatus, setManagerRequestStatus] = useState(null);
  const lab_id = JSON.stringify(lab.id)
  const student_id = JSON.stringify(selectedUser.id)

  const handleManagerRequest = () => {
    fetchData(`/api/manager_requests/${student_id}`, null, selectedUser.role, {
      method: "POST",
      body: {
        lab_id: lab_id,
      },
    });
  };

  const handleContactRequest = () => {
    fetchData(`/api/contact/studentId/${student_id}`, setContact, selectedUser.role, {
      method: "POST",
      body: {
        lab_id: lab_id,
      },
    });
  };

  useEffect(() => {
    if (!lab.school_id) return;
    fetchData(`/api/school/${lab.school_id}`, setSchool, selectedUser.role);
  }, [lab]);

  useEffect(() => {
    fetchData(
      `/api/contact/studentId/${student_id}`,
      setContact,
      selectedUser.role
    );
  }, [lab, selectedUser]);

  useEffect(() => {
    if (contact && contact[0] && contact[0].lab_id === lab.id) {
      if (contact[0].status === "accepted") {
        setContactStatus("수락됨");
      } else if (contact[0].status === "rejected") {
        setContactStatus("거절됨");
      } else if (contact[0].status === "pending") {
        setContactStatus("수락 대기중");
      }
    } else {
      setContactStatus("컨택 요청");
    }
  }, [contact]);

  return (
    <div className="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto my-1 w-full flex-col justify-between">
      <div className="flex items-start px-4 py-6">
        <div className="">
          <h1 className="text-lg font-semibold">{lab.lab_name}</h1>
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-gray-900 -mt-1">
              {
                school &&
                  school.school_name /* school_id를 school_name으로 바꾸세요. */
              }
            </h2>
          </div>
          <p className="mt-3 text-gray-700 text-sm">{lab.description}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-4 p-4">
        <button
          disabled={
            contactStatus === "수락됨" ||
            contactStatus === "거절됨" ||
            contactStatus === "수락 대기중"
          }
          className={`font-bold py-2 px-4 rounded ${
            contactStatus === "수락됨"
              ? "bg-blue-400 text-white  border hover:bg-blue-500 hover:text-white"
              : contactStatus === "거절됨"
              ? "bg-red-500 text-white border hover:bg-white hover:text-red-500"
              : contactStatus === "수락 대기중"
              ? "bg-green-500 text-white border hover:bg-white hover:text-green-500"
              : "bg-white text-blue-500 border hover:bg-blue-500 hover:text-white"
          }`}
          onClick={handleContactRequest}
        >
          {contactStatus}
        </button>
        {
          // research이고 lab의 manager가 아니면 보임.
          selectedUser.role === "researcher" &&
            selectedUser.id !== lab.manager_id && (
              <button className="bg-white text-blue-500 border hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
                onClick={handleManagerRequest}
                >
                연구실 관리자 신청
              </button>
            )
        }
      </div>
    </div>
  );
}

export default function LabList({ fetchedData, selectedUser }) {
  return (
    <div className="flex flex-col">
      {/* {JSON.stringify(fetchedData)} */}
      {fetchedData &&
        fetchedData.dataType === "lab" &&
        fetchedData.data.map((lab) => (
          <LabCard key={lab.id} lab={lab} selectedUser={selectedUser} />
        ))}
    </div>
  );
}
