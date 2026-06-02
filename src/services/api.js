/**
 * API 통신 모듈
 * 서버와의 HTTP 통신 (Node.js 백엔드)
 * TODO: 서버 URL은 환경 변수로 설정해야 함
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// 기본 요청 헤더
const getHeaders = () => ({
  'Content-Type': 'application/json',
  // TODO: 인증 토큰 추가
  // 'Authorization': `Bearer ${token}`,
});

/**
 * 일반적인 API 요청 함수
 */
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    method,
    headers: getHeaders(),
  };

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    return { success: true, data: responseData };
  } catch (error) {
    console.error('API Request Error:', error);
    return { success: false, error: error.message };
  }
};

// ============================================================
// Worker 관련 API
// ============================================================

export const workerAPI = {
  // 모든 작업자 조회
  getAll: () => apiRequest('/workers'),

  // 특정 작업자 상세 조회
  getById: (workerId) => apiRequest(`/workers/${workerId}`),

  // 작업자 생성
  create: (data) => apiRequest('/workers', 'POST', data),

  // 작업자 정보 업데이트
  update: (workerId, data) => apiRequest(`/workers/${workerId}`, 'PUT', data),

  // 작업자 삭제
  delete: (workerId) => apiRequest(`/workers/${workerId}`, 'DELETE'),
};

// ============================================================
// Sensor 관련 API
// ============================================================

export const sensorAPI = {
  // 특정 작업자의 최신 센서 데이터 조회
  getLatest: (workerId) => apiRequest(`/sensors/${workerId}/latest`),

  // 센서 데이터 히스토리 조회 (시간 범위)
  getHistory: (workerId, startDate, endDate) =>
    apiRequest(`/sensors/${workerId}/history`, 'POST', {
      startDate,
      endDate,
    }),

  // 센서 데이터 업로드 (ESP32에서 호출)
  uploadData: (workerId, data) =>
    apiRequest(`/sensors/${workerId}/upload`, 'POST', data),
};

// ============================================================
// Alert 관련 API
// ============================================================

export const alertAPI = {
  // 모든 알림 조회
  getAll: () => apiRequest('/alerts'),

  // 읽지 않은 알림만 조회
  getUnread: () => apiRequest('/alerts/unread'),

  // 특정 타입의 알림 조회
  getByType: (type) => apiRequest(`/alerts/type/${type}`),

  // 긴급 알림만 조회
  getEmergency: () => apiRequest('/alerts/emergency'),

  // 알림 생성 (긴급 상황 발생 시)
  create: (data) => apiRequest('/alerts', 'POST', data),

  // 알림 읽음 처리
  markAsRead: (alertId) =>
    apiRequest(`/alerts/${alertId}/read`, 'PATCH', { read: true }),

  // 모든 알림 읽음 처리
  markAllAsRead: () => apiRequest('/alerts/read-all', 'PATCH'),

  // 알림 삭제
  delete: (alertId) => apiRequest(`/alerts/${alertId}`, 'DELETE'),
};

// ============================================================
// Dashboard 관련 API
// ============================================================

export const dashboardAPI = {
  // 대시보드 요약 데이터 조회
  getSummary: () => apiRequest('/dashboard/summary'),

  // 실시간 모니터링 데이터
  getRealtimeData: () => apiRequest('/dashboard/realtime'),

  // 일일 통계
  getDailyStats: (date) =>
    apiRequest(`/dashboard/stats/daily`, 'POST', { date }),
};

// ============================================================
// WebSocket 연결 (실시간 데이터)
// ============================================================

let wsConnection = null;

export const setupWebSocket = (onMessage, onError) => {
  const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';

  try {
    wsConnection = new WebSocket(WS_URL);

    wsConnection.onopen = () => {
      console.log('WebSocket connected');
    };

    wsConnection.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (onMessage) {
        onMessage(data);
      }
    };

    wsConnection.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) {
        onError(error);
      }
    };

    wsConnection.onclose = () => {
      console.log('WebSocket disconnected');
      // 재연결 시도 (3초 후)
      setTimeout(() => setupWebSocket(onMessage, onError), 3000);
    };
  } catch (error) {
    console.error('WebSocket setup error:', error);
    if (onError) {
      onError(error);
    }
  }
};

export const closeWebSocket = () => {
  if (wsConnection) {
    wsConnection.close();
  }
};

export const sendWebSocketMessage = (message) => {
  if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
    wsConnection.send(JSON.stringify(message));
  }
};
