import React from 'react';
import { useAlert } from '../../context/AlertContext';
import './Navigation.css';

/**
 * Navigation 컴포넌트
 * 좌측 내비게이션 메뉴
 */
const Navigation = ({ activeMenu, onMenuChange }) => {
  const { unreadCount } = useAlert();

  const menus = [
    { id: 'dashboard', label: '대시보드', icon: '⌂' },
    { id: 'workers', label: '작업자 관리', icon: '◉' },
    { id: 'equipment', label: '안전장비', icon: '◈' },
    { id: 'alerts', label: '알림', icon: '!' , badge: unreadCount },
    { id: 'settings', label: '설정', icon: '⚙' },
  ];

  return (
    <nav className="navigation">
      <ul className="menu-list">
        {menus.map((menu) => (
          <li key={menu.id}>
            <button
              className={`menu-item ${activeMenu === menu.id ? 'active' : ''}`}
              onClick={() => onMenuChange(menu.id)}
            >
              <span className="menu-icon">{menu.icon}</span>
              <span className="menu-label">{menu.label}</span>
              {menu.badge > 0 && (
                <span className="menu-badge">{menu.badge}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
