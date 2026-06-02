import React from 'react';
import './AlertNotification.css';

/**
 * AlertNotification 컴포넌트
 * 알림 표시 컴포넌트
 */
const AlertNotification = ({ alert, onDismiss, onRead }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'emergency':
        return '#dc2626';
      case 'warning':
        return '#d97706';
      case 'info':
        return '#2563eb';
      default:
        return '#64748b';
    }
  };

  const handleRead = () => {
    if (onRead) {
      onRead(alert.id);
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss(alert.id);
    }
  };

  return (
    <div
      className={`alert-notification ${alert.severity} ${alert.read ? 'read' : 'unread'}`}
      style={{ borderLeftColor: getSeverityColor(alert.severity) }}
    >
      <div className="alert-content">
        <h4>{alert.title}</h4>
        <p>{alert.message}</p>
      </div>

      <div className="alert-actions">
        {!alert.read && (
          <button className="btn-read" onClick={handleRead}>
            읽음
          </button>
        )}
        <button className="btn-dismiss" onClick={handleDismiss}>
          닫기
        </button>
      </div>

      <small className="alert-time">
        {new Date(alert.timestamp).toLocaleTimeString()}
      </small>
    </div>
  );
};

export default AlertNotification;
