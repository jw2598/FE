/**
 * 상수 정의
 */

// 작업자 상태
export const WORKER_STATUS = {
  NORMAL: 'normal',
  WARNING: 'warning',
  DANGER: 'danger',
};

// 알림 심각도
export const ALERT_SEVERITY = {
  EMERGENCY: 'emergency',
  WARNING: 'warning',
  INFO: 'info',
};

// 알림 타입
export const ALERT_TYPE = {
  EMERGENCY: 'emergency',
  BIOMETRIC_ABNORMAL: 'biometric_abnormal',
  EQUIPMENT_MISSING: 'equipment_missing',
  SYSTEM: 'system',
};

// 안전장비 목록
export const EQUIPMENT_TYPES = {
  HELMET: 'helmet',
  SAFE_SUIT: 'safeSuit',
  SAFE_SHOES: 'safeShoes',
  BELT: 'belt',
};

// 정상 범위 (생체 신호)
export const BIOMETRIC_RANGES = {
  HEART_RATE: {
    MIN: 50,
    MAX: 100,
    WARNING_MAX: 120,
  },
  TEMPERATURE: {
    MIN: 36.0,
    MAX: 37.5,
    WARNING_MIN: 35.5,
    WARNING_MAX: 38.5,
  },
};
