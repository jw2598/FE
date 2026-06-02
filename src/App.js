import React, { useState } from 'react';
import './App.css';
import './styles/variables.css';

// Context 컴포넌트 import
import { WorkerProvider } from './context/WorkerContext';
import { AlertProvider } from './context/AlertContext';
import { SensorProvider } from './context/SensorContext';

// 컴포넌트 import
import Header from './components/common/Header';
import Navigation from './components/common/Navigation';
import MainLayout from './components/layout/MainLayout';

// 페이지 import
import DashboardPage from './pages/DashboardPage';
import WorkersPage from './pages/WorkersPage';
import EquipmentPage from './pages/EquipmentPage';
import AlertsPage from './pages/AlertsPage';

/**
 * App 메인 컴포넌트
 * WORKSAFE+ 대시보드 애플리케이션
 */
function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // 페이지별 타이틀
  const pageTitles = {
    dashboard: '대시보드',
    workers: '작업자 관리',
    equipment: '안전장비 관리',
    alerts: '알림 관리',
    settings: '설정',
  };

  // 현재 페이지 컴포넌트 렌더링
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'workers':
        return <WorkersPage />;
      case 'equipment':
        return <EquipmentPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'settings':
        return (
          <div className="page-placeholder">
            <h2>설정</h2>
            <p>설정 페이지를 준비 중입니다.</p>
          </div>
        );
      default:
        return <DashboardPage />;
    }
  };

  return (
    <WorkerProvider>
      <AlertProvider>
        <SensorProvider>
          <MainLayout
            header={<Header title={`WORKSAFE+ - ${pageTitles[currentPage]}`} />}
            navigation={
              <Navigation
                activeMenu={currentPage}
                onMenuChange={setCurrentPage}
              />
            }
          >
            <div className="page-content">{renderPage()}</div>
          </MainLayout>
        </SensorProvider>
      </AlertProvider>
    </WorkerProvider>
  );
}

export default App;
