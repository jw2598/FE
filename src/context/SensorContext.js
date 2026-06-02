import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * SensorContext - 센서 데이터 (ESP32) 관리
 * 역할: 웨어러블 센서 실시간 데이터 수집 및 처리
 */
const SensorContext = createContext();

export const SensorProvider = ({ children }) => {
  const [sensorData, setSensorData] = useState({});
  const [dataHistory, setDataHistory] = useState({}); // 센서 데이터 히스토리 (분석용)
  const [isConnected, setIsConnected] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // 센서 데이터 업데이트 (실시간 수신)
  const updateSensorData = useCallback((workerId, data) => {
    setSensorData((prevData) => ({
      ...prevData,
      [workerId]: {
        ...prevData[workerId],
        ...data,
        timestamp: new Date(),
      },
    }));

    // 히스토리에 추가 (최근 100개까지 유지)
    setDataHistory((prevHistory) => {
      const workerHistory = prevHistory[workerId] || [];
      const updatedHistory = [
        {
          ...data,
          timestamp: new Date(),
        },
        ...workerHistory,
      ].slice(0, 100);

      return {
        ...prevHistory,
        [workerId]: updatedHistory,
      };
    });

    setLastSyncTime(new Date());
  }, []);

  // 특정 작업자의 센서 데이터 조회
  const getSensorData = useCallback(
    (workerId) => sensorData[workerId] || null,
    [sensorData]
  );

  // 특정 작업자의 센서 데이터 히스토리 조회
  const getSensorHistory = useCallback(
    (workerId, limit = 50) => {
      const history = dataHistory[workerId] || [];
      return history.slice(0, limit);
    },
    [dataHistory]
  );

  // 센서 연결 상태 업데이트
  const setConnectionStatus = useCallback((status) => {
    setIsConnected(status);
  }, []);

  // 센서 데이터 통계 (평균, 최대, 최소)
  const getSensorStatistics = useCallback(
    (workerId, sensorType) => {
      const history = dataHistory[workerId] || [];
      if (history.length === 0) return null;

      const values = history
        .map((data) => data[sensorType])
        .filter((v) => v !== undefined);

      if (values.length === 0) return null;

      return {
        average: values.reduce((a, b) => a + b, 0) / values.length,
        max: Math.max(...values),
        min: Math.min(...values),
      };
    },
    [dataHistory]
  );

  const value = {
    sensorData,
    dataHistory,
    isConnected,
    lastSyncTime,
    updateSensorData,
    getSensorData,
    getSensorHistory,
    setConnectionStatus,
    getSensorStatistics,
  };

  return (
    <SensorContext.Provider value={value}>{children}</SensorContext.Provider>
  );
};

export const useSensor = () => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error('useSensor must be used within SensorProvider');
  }
  return context;
};
