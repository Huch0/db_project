import React from 'react';
import './css/LabProfile.css';

const LabProfile = ({ labName, university, description }) => {
  const handleSubscribe = () => {
    // 구독 로직을 구현하세요.
  };

  const handleContact = () => {
    // 컨택 로직을 구현하세요.
  };

  const handleManagerRequest = () => {
    // 매니저 요청 로직을 구현하세요.
  };

  return (
    <div className="labProfile">
      <h2 className="labName">{labName}</h2>
      <p className="university">{university}</p>
      <p className="description">{description}</p>
      <button className="button" onClick={handleSubscribe}>구독</button>
      <button className="button" onClick={handleContact}>컨택</button>
      <button className="button" onClick={handleManagerRequest}>매니저 요청</button>
    </div>
  );
};

export default LabProfile;
