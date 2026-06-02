import React from 'react';
import { useAlert } from '../context/AlertContext';
import AlertNotification from '../components/dashboard/AlertNotification';
import './AlertsPage.css';

/**
 * Alerts 페이지
 * 모든 알림 확인 및 관리
 */
const AlertsPage = () => {
  const {
    alerts,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeAlert,
    getEmergencyAlerts,
  } = useAlert();

  const emergencyAlerts = getEmergencyAlerts();

  return (
    <div className="alerts-page">
      <h1>알림 관리</h1>

      {/* 요약 정보 */}
      <div className="alerts-summary">
        <div className="summary-card emergency">
          <h3>긴급 알림</h3>
          <p className="count">{emergencyAlerts.length}</p>
        </div>
        <div className="summary-card unread">
          <h3>읽지 않은 알림</h3>
          <p className="count">{unreadCount}</p>
        </div>
        <div className="summary-card total">
          <h3>전체 알림</h3>
          <p className="count">{alerts.length}</p>
        </div>
      </div>

      {/* 일괄 작업 버튼 */}
      {unreadCount > 0 && (
        <div className="action-buttons">
          <button className="btn-primary" onClick={markAllAsRead}>
            모두 읽음 처리
          </button>
        </div>
      )}

      {/* 알림 목록 */}
      <div className="alerts-container">
        {alerts.length === 0 ? (
          <div className="no-alerts">알림이 없습니다.</div>
        ) : (
          alerts.map((alert) => (
            <AlertNotification
              key={alert.id}
              alert={alert}
              onRead={markAsRead}
              onDismiss={removeAlert}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
