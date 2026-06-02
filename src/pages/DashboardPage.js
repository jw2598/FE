import React, { useEffect } from 'react';
import { useWorker } from '../context/WorkerContext';
import { useAlert } from '../context/AlertContext';
import WorkerCard from '../components/worker/WorkerCard';
import './DashboardPage.css';

/**
 * Dashboard 페이지
 * 전체 작업자 상태 및 실시간 모니터링
 */
const DashboardPage = () => {
  const { workers, fetchWorkers, loading, error } = useWorker();
  const { alerts, unreadCount } = useAlert();

  useEffect(() => {
    fetchWorkers();
    // 5초마다 데이터 갱신
    const interval = setInterval(fetchWorkers, 5000);
    return () => clearInterval(interval);
  }, [fetchWorkers]);

  // 상태별 작업자 통계
  const stats = {
    total: workers.length,
    normal: workers.filter((w) => w.status === 'normal').length,
    warning: workers.filter((w) => w.status === 'warning').length,
    danger: workers.filter((w) => w.status === 'danger').length,
  };

  return (
    <div className="dashboard-page">
      {/* 통계 영역 */}
      <section className="stats-section">
        <div className="stat-card">
          <h4>전체 작업자</h4>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card normal">
          <h4>정상</h4>
          <p className="stat-number">{stats.normal}</p>
        </div>
        <div className="stat-card warning">
          <h4>주의</h4>
          <p className="stat-number">{stats.warning}</p>
        </div>
        <div className="stat-card danger">
          <h4>위험</h4>
          <p className="stat-number">{stats.danger}</p>
        </div>
        <div className="stat-card alert">
          <h4>읽지 않은 알림</h4>
          <p className="stat-number">{unreadCount}</p>
        </div>
      </section>

      {/* 오류 메시지 */}
      {error && <div className="error-message">{error}</div>}

      {/* 로딩 상태 */}
      {loading && <div className="loading">데이터 로딩 중...</div>}

      {/* 작업자 카드 목록 */}
      <section className="workers-section">
        <h2>작업자 상태 모니터링</h2>
        <div className="workers-grid">
          {workers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </section>

      {/* 최근 알림 */}
      <section className="recent-alerts-section">
        <h2>최근 알림</h2>
        <div className="alerts-list">
          {alerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className="alert-item">
              <span className="alert-badge">{alert.title}</span>
              <span className="alert-message">{alert.message}</span>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="empty-state">최근 알림이 없습니다.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
