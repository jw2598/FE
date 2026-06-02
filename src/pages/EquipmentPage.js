import React, { useEffect } from 'react';
import { useWorker } from '../context/WorkerContext';
import './EquipmentPage.css';

/**
 * Equipment 페이지
 * 작업자별 안전장비 착용 상태 확인
 */
const EquipmentPage = () => {
  const { workers, fetchWorkers, loading } = useWorker();

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  // 안전장비별 착용 현황
  const getEquipmentStats = () => {
    return {
      helmet: workers.filter(
        (w) => w.sensorData?.equipmentStatus?.helmet
      ).length,
      safeSuit: workers.filter(
        (w) => w.sensorData?.equipmentStatus?.safeSuit
      ).length,
      safeShoes: workers.filter(
        (w) => w.sensorData?.equipmentStatus?.safeShoes
      ).length,
      belt: workers.filter(
        (w) => w.sensorData?.equipmentStatus?.belt
      ).length,
    };
  };

  const equipmentStats = getEquipmentStats();

  return (
    <div className="equipment-page">
      <h1>안전장비 관리</h1>

      {/* 장비별 착용률 */}
      <section className="stats-section">
        <h2>전체 착용률</h2>
        <div className="equipment-stats">
          {[
            { name: '안전모', key: 'helmet' },
            { name: '안전복', key: 'safeSuit' },
            { name: '안전화', key: 'safeShoes' },
            { name: '안전벨트', key: 'belt' },
          ].map((equipment) => {
            const equipped = equipmentStats[equipment.key];
            const total = workers.length;
            const percentage =
              total > 0 ? Math.round((equipped / total) * 100) : 0;

            return (
              <div key={equipment.key} className="equipment-stat">
                <h3>{equipment.name}</h3>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="stat-text">
                  {equipped} / {total} ({percentage}%)
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 미착용자 현황 */}
      <section className="non-equipped-section">
        <h2>안전장비 미착용자 현황</h2>

        {loading ? (
          <div className="loading">로딩 중...</div>
        ) : (
          <div className="equipment-table">
            <table>
              <thead>
                <tr>
                  <th>작업자</th>
                  <th>안전모</th>
                  <th>안전복</th>
                  <th>안전화</th>
                  <th>안전벨트</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.id}>
                    <td>{worker.name}</td>
                    <td>
                      {worker.sensorData?.equipmentStatus?.helmet ? (
                        <span className="equipped">착용</span>
                      ) : (
                        <span className="not-equipped">미착용</span>
                      )}
                    </td>
                    <td>
                      {worker.sensorData?.equipmentStatus?.safeSuit ? (
                        <span className="equipped">착용</span>
                      ) : (
                        <span className="not-equipped">미착용</span>
                      )}
                    </td>
                    <td>
                      {worker.sensorData?.equipmentStatus?.safeShoes ? (
                        <span className="equipped">착용</span>
                      ) : (
                        <span className="not-equipped">미착용</span>
                      )}
                    </td>
                    <td>
                      {worker.sensorData?.equipmentStatus?.belt ? (
                        <span className="equipped">착용</span>
                      ) : (
                        <span className="not-equipped">미착용</span>
                      )}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${worker.status}`}
                      >
                        {worker.status === 'normal' && '정상'}
                        {worker.status === 'warning' && '주의'}
                        {worker.status === 'danger' && '위험'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default EquipmentPage;
