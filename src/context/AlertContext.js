import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * AlertContext - 긴급 알림 및 위험 상황 관리
 * 역할: 긴급 알림, 안전장비 미착용 경고, 생체 신호 이상 감지
 */
const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // 새로운 알림 추가
  const addAlert = useCallback((alert) => {
    const newAlert = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...alert,
    };
    setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
    setUnreadCount((prev) => prev + 1);
    return newAlert;
  }, []);

  // 알림 읽음 처리
  const markAsRead = useCallback((alertId) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }, []);

  // 모든 알림 읽음 처리
  const markAllAsRead = useCallback(() => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) => ({ ...alert, read: true }))
    );
    setUnreadCount(0);
  }, []);

  // 알림 삭제
  const removeAlert = useCallback((alertId) => {
    setAlerts((prevAlerts) => {
      const alert = prevAlerts.find((a) => a.id === alertId);
      if (alert && !alert.read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
      return prevAlerts.filter((a) => a.id !== alertId);
    });
  }, []);

  // 특정 타입의 알림만 조회
  const getAlertsByType = useCallback(
    (type) => alerts.filter((alert) => alert.type === type),
    [alerts]
  );

  // 긴급 알림만 조회
  const getEmergencyAlerts = useCallback(
    () => alerts.filter((alert) => alert.severity === 'emergency'),
    [alerts]
  );

  const value = {
    alerts,
    unreadCount,
    addAlert,
    markAsRead,
    markAllAsRead,
    removeAlert,
    getAlertsByType,
    getEmergencyAlerts,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within AlertProvider');
  }
  return context;
};
