import React from 'react';
import './MainLayout.css';

/**
 * MainLayout 컴포넌트
 * 메인 레이아웃 - Header, Navigation, Content 구성
 */
const MainLayout = ({ header, navigation, children }) => {
  return (
    <div className="main-layout">
      {/* Header */}
      <div className="layout-header">{header}</div>

      <div className="layout-body">
        {/* Sidebar Navigation */}
        <div className="layout-sidebar">{navigation}</div>

        {/* Main Content */}
        <main className="layout-main">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
