import React, { useEffect, useState } from 'react';
import { useWorker } from '../context/WorkerContext';
import './WorkersPage.css';

/**
 * Workers 페이지
 * 작업자 목록 및 상세 정보 관리
 */
const WorkersPage = () => {
  const { workers, fetchWorkers, selectedWorker, getWorkerDetail, loading } =
    useWorker();
  const [filter, setFilter] = useState('all'); // all, normal, warning, danger

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const filteredWorkers =
    filter === 'all'
      ? workers
      : workers.filter((w) => w.status === filter);

  return (
    <div className="workers-page">
      <h1>작업자 관리</h1>

      {/* 필터 */}
      <div className="filter-section">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          전체 ({workers.length})
        </button>
        <button
          className={`filter-btn normal ${filter === 'normal' ? 'active' : ''}`}
          onClick={() => setFilter('normal')}
        >
          정상 ({workers.filter((w) => w.status === 'normal').length})
        </button>
        <button
          className={`filter-btn warning ${filter === 'warning' ? 'active' : ''}`}
          onClick={() => setFilter('warning')}
        >
          주의 ({workers.filter((w) => w.status === 'warning').length})
        </button>
        <button
          className={`filter-btn danger ${filter === 'danger' ? 'active' : ''}`}
          onClick={() => setFilter('danger')}
        >
          위험 ({workers.filter((w) => w.status === 'danger').length})
        </button>
      </div>

      {loading ? (
        <div className="loading">로딩 중...</div>
      ) : (
        <div className="workers-container">
          {/* 작업자 목록 */}
          <div className="workers-list">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className={`worker-row ${selectedWorker?.id === worker.id ? 'selected' : ''}`}
                onClick={() => getWorkerDetail(worker.id)}
              >
                <div className="worker-col-name">{worker.name}</div>
                <div className="worker-col-id">{worker.workerId}</div>
                <div className={`worker-col-status ${worker.status}`}>
                  {worker.status === 'normal' && '정상'}
                  {worker.status === 'warning' && '주의'}
                  {worker.status === 'danger' && '위험'}
                </div>
                <div className="worker-col-time">
                  {new Date(worker.lastUpdate).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>

          {/* 상세 정보 패널 */}
          {selectedWorker && (
            <div className="worker-detail">
              <h3>{selectedWorker.name}</h3>

              <div className="detail-section">
                <h4>기본 정보</h4>
                <p>작업자 ID: {selectedWorker.workerId}</p>
                <p>위치: 위도 {selectedWorker.location.lat}, 경도 {selectedWorker.location.lng}</p>
              </div>

              <div className="detail-section">
                <h4>생체 신호</h4>
                <p>심박수: {selectedWorker.sensorData?.heartRate} bpm</p>
                <p>체온: {selectedWorker.sensorData?.temperature}°C</p>
              </div>

              <div className="detail-section">
                <h4>안전장비</h4>
                <ul>
                  <li>
                    안전모: {selectedWorker.sensorData?.equipmentStatus?.helmet ? '착용' : '미착용'}
                  </li>
                  <li>
                    안전복: {selectedWorker.sensorData?.equipmentStatus?.safeSuit ? '착용' : '미착용'}
                  </li>
                  <li>
                    안전화: {selectedWorker.sensorData?.equipmentStatus?.safeShoes ? '착용' : '미착용'}
                  </li>
                  <li>
                    안전벨트: {selectedWorker.sensorData?.equipmentStatus?.belt ? '착용' : '미착용'}
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkersPage;
