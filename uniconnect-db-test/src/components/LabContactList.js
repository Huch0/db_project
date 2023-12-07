import { useEffect, useState } from "react";
import fetchData from "@/utils/fetchData";

function ContactCard({ contact, selectedUser, setFetchedData }) {
  const [student, setStudent] = useState(null);
  const [studentProfile, setStudentProfile] = useState(null);
  const [school, setSchool] = useState(null);
  const [major, setMajor] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleConfirm = async () => {
    fetchData(
      `/api/contact/studentId/${contact.student_id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "PUT",
        body: {
          status: "accepted",
          lab_id: contact.lab_id,
        },
      },
      "labContact"
    );
    setRefresh(!refresh);
  };

  const handleCancel = async () => {
    fetchData(
      `/api/contact/studentId/${contact.student_id}`,
      setFetchedData,
      selectedUser.role,
      {
        method: "PUT",
        body: {
          status: "rejected",
          lab_id: contact.lab_id,
        },
      },
      "labContact"
    );
    setRefresh(!refresh);
  };

  let cardColor;
  let statusMessage;
  switch (contact.status) {
    case "pending":
      cardColor = "bg-green-100";
      statusMessage = "대기중";
      break;
    case "accepted":
      cardColor = "bg-blue-200";
      statusMessage = "수락됨";
      break;
    case "rejected":
      cardColor = "bg-red-200";
      statusMessage = "거절됨";
      break;
    default:
      cardColor = "bg-white";
      statusMessage = "알 수 없음";
      break;
  }

  useEffect(
    () => {
      fetchData(
        `/api/user/${contact.student_id}`,
        setStudent,
        selectedUser.role
      );
      fetchData(
        `/api/profile/${contact.student_id}`,
        setStudentProfile,
        selectedUser.role
      );
    },
    [contact],
    [refresh]
  );

  useEffect(
    () => {
      if (studentProfile) {
        fetchData(
          `/api/school/${studentProfile.school_id}`,
          setSchool,
          selectedUser.role
        );
        fetchData(
          `/api/major/${studentProfile.major_id}`,
          setMajor,
          selectedUser.role
        );
      }
    },
    [studentProfile],
    [refresh]
  );

  return (
    <div
      className={`flex shadow-lg rounded-lg mx-4 md:mx-auto my-1 w-full flex-col justify-between ${cardColor}`}
    >
      <div className="flex items-start px-4 py-6">
        <div className="">
          <h1 className="text-lg font-semibold">
            {student && student.user_name}
          </h1>
          <div className="flex items-center justify-between">
            <h2 className="text-lg text-gray-900 -mt-1">
              {school && school.school_name}
            </h2>
          </div>
          <p className="mt-3 text-gray-700 text-sm">
            {major && major.major_name}
          </p>
        </div>
      </div>
      <div className="p-4">
        <p>{statusMessage}</p>
      </div>
      {contact.status === "pending" && (
        <div className="flex justify-end space-x-4 p-4">
          <button
            onClick={handleConfirm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            수락
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            거절
          </button>
        </div>
      )}
    </div>
  );
}

export default function LabContactList({
  fetchedData,
  setFetchedData,
  selectedUser,
}) {
  return (
    <div className="flex flex-col">
      {fetchedData &&
        fetchedData.dataType === "labContact" &&
        fetchedData.data.map((contact, index) => (
          <ContactCard
            key={index}
            contact={contact}
            setFetchedData={setFetchedData}
            selectedUser={selectedUser}
          />
        ))}
    </div>
  );
}
