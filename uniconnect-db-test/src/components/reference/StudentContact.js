import React from 'react';
import './css/StudentContact.css';

const StudentContact = ({ name, major, university }) => {
  const handleAccept = () => {
    // 수락 로직을 구현하세요.
  };

  const handleReject = () => {
    // 거절 로직을 구현하세요.
  };

  return (
    <div className="studentContact">
      <h2 className="name">{name}</h2>
      <p className="major">{major}</p>
      <p className="university">{university}</p>
      <button className="button accept" onClick={handleAccept}>수락</button>
      <button className="button reject" onClick={handleReject}>거절</button>
    </div>
  );
};

export default StudentContact;
