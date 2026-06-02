import React from 'react';
import './WorkerCard.css';

/**
 * WorkerCard 컴포넌트
 * 작업자 정보 카드 - 상태, 생체 신호, 위치 표시
 */
const WorkerCard = ({ worker, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'danger':
        return '#dc2626';
      case 'warning':
        return '#d97706';
      case 'normal':
        return '#16a34a';
      default:
        return '#64748b';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'danger':
        return '위험';
      case 'warning':
        return '주의';
      case 'normal':
        return '정상';
      default:
        return '알 수 없음';
    }
  };

  return (
    <div
      className="worker-card"
      onClick={onClick}
      style={{ borderLeftColor: getStatusColor(worker.status) }}
    >
      <div className="worker-header">
        <h3>{worker.name}</h3>
        <span className="worker-id">{worker.workerId}</span>
      </div>

      <div className="worker-status">
        <span
          className="status-badge"
          style={{ backgroundColor: getStatusColor(worker.status) }}
        >
          {getStatusLabel(worker.status)}
        </span>
      </div>

      <div className="worker-vitals">
        <div className="vital">
          <span className="vital-label">심박수</span>
          <span className="vital-value">{worker.sensorData?.heartRate} bpm</span>
        </div>
        <div className="vital">
          <span className="vital-label">체온</span>
          <span className="vital-value">{worker.sensorData?.temperature}°C</span>
        </div>
      </div>

      <div className="worker-equipment">
        <span className="equipment-item">
          {worker.sensorData?.equipmentStatus?.helmet ? '착용' : '미착용'} 안전모
        </span>
        <span className="equipment-item">
          {worker.sensorData?.equipmentStatus?.safeSuit ? '착용' : '미착용'} 안전복
        </span>
        <span className="equipment-item">
          {worker.sensorData?.equipmentStatus?.safeShoes ? '착용' : '미착용'} 안전화
        </span>
        <span className="equipment-item">
          {worker.sensorData?.equipmentStatus?.belt ? '착용' : '미착용'} 안전벨트
        </span>
      </div>

      <div className="worker-footer">
        <small>
          마지막 업데이트: {new Date(worker.lastUpdate).toLocaleTimeString()}
        </small>
      </div>
    </div>
  );
};

export default WorkerCard;
