# WORKSAFE+ 프로젝트 구조 완성

## 📁 디렉토리 구조

```
worksafe/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/              # 공통 컴포넌트
│   │   │   ├── Header.js        # 상단 헤더
│   │   │   ├── Header.css
│   │   │   ├── Navigation.js    # 사이드 네비게이션
│   │   │   └── Navigation.css
│   │   ├── layout/              # 레이아웃 컴포넌트
│   │   │   ├── MainLayout.js    # 메인 레이아웃
│   │   │   └── MainLayout.css
│   │   ├── worker/              # 작업자 관련 컴포넌트
│   │   │   ├── WorkerCard.js    # 작업자 카드
│   │   │   └── WorkerCard.css
│   │   └── dashboard/           # 대시보드 컴포넌트
│   │       ├── AlertNotification.js
│   │       └── AlertNotification.css
│   ├── context/                 # 상태 관리 (Context API)
│   │   ├── WorkerContext.js     # 작업자 데이터
│   │   ├── AlertContext.js      # 알림 데이터
│   │   └── SensorContext.js     # 센서 데이터
│   ├── pages/                   # 페이지 컴포넌트
│   │   ├── DashboardPage.js     # 대시보드 페이지
│   │   ├── DashboardPage.css
│   │   ├── WorkersPage.js       # 작업자 관리 페이지
│   │   ├── WorkersPage.css
│   │   ├── EquipmentPage.js     # 안전장비 페이지
│   │   ├── EquipmentPage.css
│   │   ├── AlertsPage.js        # 알림 페이지
│   │   └── AlertsPage.css
│   ├── services/                # API 및 비즈니스 로직
│   │   ├── api.js               # API 통신 모듈
│   │   └── sensorService.js     # 센서 데이터 처리
│   ├── utils/                   # 유틸리티 함수
│   │   ├── constants.js         # 상수
│   │   └── helpers.js           # 헬퍼 함수
│   ├── styles/                  # 전역 스타일
│   │   └── variables.css        # CSS 변수 및 기본 스타일
│   ├── App.js                   # 메인 앱 컴포넌트
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🏗️ 아키텍처 설계

### 1. **상태 관리 (Context API)**
- **WorkerContext**: 작업자 정보, 상태, 위치
- **AlertContext**: 긴급 알림, 경고 메시지
- **SensorContext**: ESP32 센서 실시간 데이터

### 2. **API 통신 레이어**
- `services/api.js`: Node.js 백엔드 통신
- `services/sensorService.js`: 센서 데이터 분석

### 3. **컴포넌트 계층**
```
App (상태 제공자)
├── Header
├── Navigation
└── MainLayout
    └── Pages (Dashboard/Workers/Equipment/Alerts)
        └── Components (WorkerCard, AlertNotification, etc)
```

## 📄 주요 기능

### Dashboard (대시보드)
- 📊 전체 작업자 상태 통계
- 👥 실시간 작업자 모니터링
- 🚨 최근 알림 확인

### Workers (작업자 관리)
- 📋 작업자 목록 필터링 (정상/주의/위험)
- 👤 작업자 상세 정보 조회
- 📍 위치 정보 확인
- 💓 생체 신호 모니터링

### Equipment (안전장비)
- 📈 장비별 착용률 통계
- 📊 착용 현황 테이블
- ⚠️ 미착용자 알림

### Alerts (알림)
- 🚨 긴급 알림 관리
- 📝 알림 읽음/삭제 처리
- 🔔 읽지 않은 알림 카운팅

## 🔌 API 엔드포인트 (준비)

```javascript
// Worker API
GET    /api/workers
GET    /api/workers/:id
POST   /api/workers
PUT    /api/workers/:id
DELETE /api/workers/:id

// Sensor API
GET    /api/sensors/:workerId/latest
POST   /api/sensors/:workerId/history
POST   /api/sensors/:workerId/upload

// Alert API
GET    /api/alerts
GET    /api/alerts/unread
GET    /api/alerts/emergency
POST   /api/alerts
PATCH  /api/alerts/:id/read
DELETE /api/alerts/:id

// Dashboard API
GET    /api/dashboard/summary
GET    /api/dashboard/realtime
POST   /api/dashboard/stats/daily
```

## 🚀 실행 방법

1. **프로젝트 설치**
   ```bash
   npm install
   ```

2. **개발 서버 시작**
   ```bash
   npm start
   ```

3. **빌드**
   ```bash
   npm run build
   ```

## 📝 다음 단계

1. **백엔드 연결**
   - Node.js 서버 구축
   - API 엔드포인트 구현
   - WebSocket 실시간 통신 설정

2. **센서 통합**
   - ESP32 펌웨어 개발
   - Bluetooth/WiFi 통신 프로토콜

3. **지도 기능**
   - 작업자 위치 표시 (Google Maps/Kakao Maps)
   - 지역 선택 및 필터링

4. **데이터 분석**
   - 히스토리 차트 (심박수, 체온 추이)
   - 일간/주간/월간 보고서

5. **푸시 알림**
   - 브라우저 알림
   - 이메일/SMS 연동

## 💾 저장된 상태 관리 구조

### WorkerContext
```javascript
{
  workers: Array<Worker>,
  selectedWorker: Worker | null,
  loading: boolean,
  error: string | null,
  fetchWorkers: () => Promise,
  getWorkerDetail: (id) => Worker,
  updateWorkerStatus: (id, status) => void,
  updateSensorData: (id, data) => void
}
```

### AlertContext
```javascript
{
  alerts: Array<Alert>,
  unreadCount: number,
  addAlert: (alert) => Alert,
  markAsRead: (id) => void,
  markAllAsRead: () => void,
  removeAlert: (id) => void,
  getAlertsByType: (type) => Array<Alert>,
  getEmergencyAlerts: () => Array<Alert>
}
```

### SensorContext
```javascript
{
  sensorData: Object<workerId, sensorData>,
  dataHistory: Object<workerId, Array<sensorData>>,
  isConnected: boolean,
  lastSyncTime: Date | null,
  updateSensorData: (workerId, data) => void,
  getSensorData: (workerId) => sensorData,
  getSensorHistory: (workerId, limit) => Array<sensorData>,
  setConnectionStatus: (status) => void,
  getSensorStatistics: (workerId, type) => statistics
}
```

## 🎨 디자인 시스템

### 색상 스키마
- **Primary**: `#4a90e2` (파랑)
- **Success**: `#44aa44` (초록)
- **Warning**: `#ffaa00` (주황)
- **Danger**: `#ff4444` (빨강)
- **Info**: `#4488ff` (밝은 파랑)

### 상태 표시
- ✅ **정상**: 초록색
- ⚠️ **주의**: 주황색
- 🔴 **위험**: 빨강색
- 🔘 **알 수 없음**: 회색

## 📌 주의사항

1. **환경 변수 설정**
   ```bash
   REACT_APP_API_URL=http://localhost:3001/api
   REACT_APP_WS_URL=ws://localhost:3001
   ```

2. **모킹 데이터**
   - 현재 WorkerContext에서 모킹 데이터 제공
   - 실제 백엔드 연결 시 제거 필요

3. **성능 최적화**
   - 센서 데이터는 100개까지만 히스토리 유지
   - 5초마다 자동 새로고침 (조정 가능)
