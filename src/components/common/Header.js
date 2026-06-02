import React from 'react';
import './Header.css';

/**
 * Header 컴포넌트
 * 상단 헤더 - 로고, 제목, 사용자 정보 표시
 */
const Header = ({ title = 'WORKSAFE+ Dashboard' }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-logo">WORKSAFE+</h1>
          <span className="header-title">{title}</span>
        </div>
        <div className="header-right">
          <span className="system-status">LIVE</span>
          <span className="user-info">관리자</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
