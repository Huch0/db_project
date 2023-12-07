import React from 'react';
import './css/UserBan.css';

const UserBan = ({ name }) => {
  const handleBan = () => {
    // 밴 로직을 구현하세요.
  };

  return (
    <div className="userBan">
      <p className="name">{name}</p>
      <button className="button ban" onClick={handleBan}>밴</button>
    </div>
  );
};

export default UserBan;
