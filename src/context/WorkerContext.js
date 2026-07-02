import React, { createContext, useContext, useState, useCallback } from 'react';

/**
 * WorkerContext - 작업자 데이터 및 상태 관리
 * 역할: 작업자 정보, 위치, 상태(정상/주의/위험) 관리
 */
const WorkerContext = createContext();

export const WorkerProvider = ({ children }) => {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 작업자 목록 조회
  const fetchWorkers = useCallback(async () => {
    setLoading(true);
    try {
      // TODO: API 호출 - 실제 서버 엔드포인트로 교체
      const mockData = [
        {
          id: 1,
          name: '김철수',
          workerId: 'W001',
          location: { lat: 37.4979, lng: 127.0276 },
          status: 'normal', // normal, warning, danger
          sensorData: {
            temperature: 36.5,
            heartRate: 72,
            equipmentStatus: {
              helmet: true,
              safeSuit: true,
              safeShoes: true,
              belt: true,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 2,
          name: '이영희',
          workerId: 'W002',
          location: { lat: 37.4980, lng: 127.0277 },
          status: 'warning',
          sensorData: {
            temperature: 37.2,
            heartRate: 95,
            equipmentStatus: {
              helmet: true,
              safeSuit: true,
              safeShoes: false,
              belt: true,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 3,
          name: '김민철',
          workerId: 'W003',
          location: { lat: 37.4977, lng: 127.0276 },
          status: 'warning', // normal, warning, danger
          sensorData: {
            temperature: 37.0,
            heartRate: 82,
            equipmentStatus: {
              helmet: true,
              safeSuit: true,
              safeShoes: true,
              belt: false,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 4,
          name: '박수영',
          workerId: 'W004',
          location: { lat: 37.4979, lng: 127.0278 },
          status: 'danger', // normal, warning, danger
          sensorData: {
            temperature: 37.7,
            heartRate: 102,
            equipmentStatus: {
              helmet: true,
              safeSuit: true,
              safeShoes: true,
              belt: true,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 5,
          name: '최연우',
          workerId: 'W005',
          location: { lat: 37.4980, lng: 127.0277 },
          status: 'normal', // normal, warning, danger
          sensorData: {
            temperature: 36.8,
            heartRate: 78,
            equipmentStatus: {
              helmet: true,
              safeSuit: true,
              safeShoes: true,
              belt: true,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 6,
          name: '윤병호',
          workerId: 'W006',
          location: { lat: 37.4976, lng: 127.0278 },
          status: 'warning', // normal, warning, danger
          sensorData: {
            temperature: 37.1,
            heartRate: 81,
            equipmentStatus: {
              helmet: false,
              safeSuit: true,
              safeShoes: true,
              belt: true,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 7,
          name: '한다솜',
          workerId: 'W007',
          location: { lat: 37.4978, lng: 127.0280 },
          status: 'normal', // normal, warning, danger
          sensorData: {
            temperature: 36.3,
            heartRate: 69,
            equipmentStatus: {
              helmet: true,
              safeSuit: true,
              safeShoes: true,
              belt: true,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 8,
          name: '장태준',
          workerId: 'W008',
          location: { lat: 37.4976, lng: 127.0274 },
          status: 'normal', // normal, warning, danger
          sensorData: {
            temperature: 37.1,
            heartRate: 72,
            equipmentStatus: {
              helmet: true,
              safeSuit: true,
              safeShoes: true,
              belt: true,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 9,
          name: '송재현',
          workerId: 'W009',
          location: { lat: 37.4978, lng: 127.0276 },
          status: 'danger', // normal, warning, danger
          sensorData: {
            temperature: 35.9,
            heartRate: 68,
            equipmentStatus: {
              helmet: false,
              safeSuit: false,
              safeShoes: true,
              belt: false,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 10,
          name: '류나래',
          workerId: 'W010',
          location: { lat: 37.4977, lng: 127.0277 },
          status: 'normal', // normal, warning, danger
          sensorData: {
            temperature: 36.6,
            heartRate: 84,
            equipmentStatus: {
              helmet: true,
              safeSuit: true,
              safeShoes: true,
              belt: true,
            },
          },
          lastUpdate: new Date(),
        },
        {
          id: 11,
          name: '다람쥐헌쳇바퀴에타고파다람쥐헌쳇바퀴에타고파다람쥐헌쳇바퀴에타고파',
          workerId: 'W011',
          location: { lat: 37.4978, lng: 127.0277 },
          status: 'normal', // normal, warning, danger
          sensorData: {
            temperature: 37.1,
            heartRate: 85,
            equipmentStatus: {
              helmet: true,
              safeSuit: true,
              safeShoes: true,
              belt: true,
            },
          },
          lastUpdate: new Date(),
        },
      ];
      setWorkers(mockData);
      setError(null);
    } catch (err) {
      setError('작업자 데이터 조회 실패');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 특정 작업자 상세 조회
  const getWorkerDetail = useCallback((workerId) => {
    const worker = workers.find((w) => w.id === workerId);
    setSelectedWorker(worker);
    return worker;
  }, [workers]);

  // 작업자 상태 업데이트
  const updateWorkerStatus = useCallback((workerId, status) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) =>
        worker.id === workerId ? { ...worker, status } : worker
      )
    );
  }, []);

  // 센서 데이터 업데이트 (실시간)
  const updateSensorData = useCallback((workerId, sensorData) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) =>
        worker.id === workerId
          ? {
              ...worker,
              sensorData,
              lastUpdate: new Date(),
            }
          : worker
      )
    );
  }, []);

  const value = {
    workers,
    selectedWorker,
    loading,
    error,
    fetchWorkers,
    getWorkerDetail,
    updateWorkerStatus,
    updateSensorData,
  };

  return (
    <WorkerContext.Provider value={value}>{children}</WorkerContext.Provider>
  );
};

export const useWorker = () => {
  const context = useContext(WorkerContext);
  if (!context) {
    throw new Error('useWorker must be used within WorkerProvider');
  }
  return context;
};
