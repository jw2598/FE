import React, { useEffect, useState } from 'react';
import { useWorker } from '../context/WorkerContext';
import './WorkersPage.css';

/**
 * Workers 페이지
 * 작업자 목록 및 상세 정보 관리
 */
const WorkersPage = () => {
  const { workers, fetchWorkers, selectedWorker, getWorkerDetail, loading, addWorker, updateWorker, deleteWorker } =
    useWorker();
  const [filter, setFilter] = useState('all'); // all, active, normal, warning, danger, off-duty

  // [추가] 모달 및 폼 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', workerId: '' });

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const filteredWorkers =
    filter === 'all'
      ? workers
      : filter === 'active'
      ? workers.filter((w) => w.status !== 'off-duty')
      : workers.filter((w) => w.status === filter);

  // [추가] 모달 열기 (추가 모드)
  const handleOpenAddModal = () => {
    setIsEditing(false);
    setFormData({ name: '', workerId: 'W000', phone: '010', status: 'normal' });
    setIsModalOpen(true);
  };

  // [추가] 모달 열기 (수정 모드)
  const handleOpenEditModal = () => {
    if (selectedWorker) {
      setIsEditing(true);
      setFormData({ name: selectedWorker.name, workerId: selectedWorker.workerId, department: selectedWorker.department, phone: selectedWorker.phone, status: selectedWorker.status });
      setIsModalOpen(true);
    }
  };

  // [추가] 폼 제출 처리 (추가/수정)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.workerId) return alert('모든 정보를 입력해주세요.');

    const isDuplicate = workers.some((worker) => {
      if (isEditing && selectedWorker) {
        return worker.workerId === formData.workerId && worker.id !== selectedWorker.id;
      }
      return worker.workerId === formData.workerId;
    });
    if (isDuplicate) {
      alert('이미 존재하는 작업자 ID입니다. 다른 ID를 입력해주세요.');
      return;
    }

    if (isEditing && selectedWorker) {
      updateWorker(selectedWorker.id, formData);
    } else {
      addWorker(formData);
    }
    setIsModalOpen(false);
  };
  

  // [추가] 삭제 처리
  const handleDelete = () => {
    if (selectedWorker && window.confirm(`${selectedWorker.name} 작업자를 삭제하시겠습니까?`)) {
      deleteWorker(selectedWorker.id);
    }
  };

  return (
    <div className="workers-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>작업자 관리</h1>
        {/* [추가] 작업자 추가 버튼 */}
        <button className="add-btn" onClick={handleOpenAddModal} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          + 작업자 추가
        </button>
      </div>

      {/* 필터 */}
      <div className="filter-section">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          전체 ({workers.length})
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          근무 중 ({workers.filter((w) => w.status !== 'off-duty').length})
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
        <button
          className={`filter-btn off-duty ${filter === 'off-duty' ? 'active' : ''}`}
          onClick={() => setFilter('off-duty')}
        >
          퇴근 ({workers.filter((w) => w.status === 'off-duty').length})
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
                  {worker.status === 'off-duty' && '퇴근'}
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
              <div>
              <h3>{selectedWorker.name}</h3>
              {/* [추가] 상태 변경 버튼 (테스트용) */}
              <button 
                style={{color: 'var(--muted-color)', border: '1px solid', borderRadius: '50px'}}
                onClick={() => updateWorker(selectedWorker.id, { status: selectedWorker.status === 'off-duty' ? 'normal' : 'off-duty' })}
              >{selectedWorker.status === 'off-duty' ? '출근' : '퇴근'}
              </button>
              <br/><br/>
              </div>

              <div className="detail-section">
                <h4>기본 정보</h4>
                <p>작업자 ID: {selectedWorker.workerId}</p>
                <p>부서: {selectedWorker.department}</p>
                <p>연락처: {selectedWorker.phone}</p>
              </div>
              
              {/* [수정] 퇴근 상태에 따른 조건부 렌더링 */}
              {selectedWorker.status === 'off-duty' ? (
                // 퇴근 상태일 때 보여줄 화면

                <div style={{ marginTop: '30px', padding: '40px 20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', color: '#888' }}>
                  <h4 style={{ color: '#555' }}>퇴근한 작업자입니다.</h4>
                  <p>현재 위치, 생체 신호 및 안전장치 착용 여부 데이터 수집이 중지되었습니다.</p>
                </div>
              ) : (
                <div>
              <div className="detail-section">
                <h4>생체 신호</h4>
                <p>위치: 위도 {selectedWorker.location.lat}, 경도 {selectedWorker.location.lng}</p>
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
              {/* [추가] 수정/삭제 버튼 */}
                <div>
                  <br/>
                  <button onClick={handleOpenEditModal} className="update-btn" >수정</button>
                  <button onClick={handleDelete} className="del-btn">삭제</button>
                </div>
            </div>
          )}
        </div>
      )}
      {/* [추가] 추가/수정 모달창 */}
      {isModalOpen && (
        <div className="modal-overlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <div className="modal-content" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
            <h2>{isEditing ? '작업자 수정' : '새 작업자 추가'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ margin: '15px', display: 'flex', alignItems: 'center' }}>
                <label>이름 &nbsp;</label>
                <input 
                  type="text"
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                  style={{ flex: 1, padding: '8px'}}
                />
              </div>
              <div style={{ margin: '15px', display: 'flex', alignItems: 'center' }}>
                <label>작업자 ID &nbsp;</label>
                <input 
                  type="text" 
                  value={formData.workerId} 
                  onChange={(e) => setFormData({...formData, workerId: e.target.value})} 
                  required 
                  style={{ flex: 1, padding: '8px'}}
                />
              </div>
              <div style={{ margin: '15px', display: 'flex', alignItems: 'center' }}>
                <label>소속 부서 &nbsp;</label>
                <input 
                  type="text" 
                  value={formData.department} 
                  onChange={(e) => setFormData({...formData, department: e.target.value})} 
                  required 
                  style={{ flex: 1, padding: '8px'}}
                />
              </div>
              <div style={{ margin: '15px', display: 'flex', alignItems: 'center' }}>
                <label>연락처 &nbsp;</label>
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  required 
                  style={{ flex: 1, padding: '8px'}}
                />
              </div>
              <div style={{ margin: '15px', display: 'flex', alignItems: 'center' }}>
                <label>상태 &nbsp;</label>
                <input 
                  type="text" 
                  value={formData.status} 
                  onChange={(e) => setFormData({...formData, status: e.target.value})} 
                  required 
                  style={{ flex: 1, padding: '8px'}}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button className='modal-btn' type="button" onClick={() => setIsModalOpen(false)}>취소</button>
                <button className='modal-btn' type="submit">{isEditing ? '수정 완료' : '추가하기'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkersPage;
