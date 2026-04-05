import { NavLink } from 'react-router-dom';
import { FiGrid, FiPackage, FiLayers, FiTruck, FiShoppingCart, FiUsers, FiX } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './Sidebar.css';

const navIcons = [
  { path: '/', key: 'dashboard', icon: <FiGrid /> },
  { path: '/products', key: 'products', icon: <FiPackage /> },
  { path: '/categories', key: 'categories', icon: <FiLayers /> },
  { path: '/stock', key: 'stockManagement', icon: <FiTruck /> },
  { path: '/orders', key: 'orders', icon: <FiShoppingCart /> },
  { path: '/suppliers', key: 'suppliers', icon: <FiUsers /> },
];

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useLanguage();

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">{t.nav.navigation}</span>
          <button className="sidebar-close" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <nav className="sidebar-nav">
          {navIcons.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={onClose}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{t.nav[item.key]}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-footer-text">
            <p>{t.nav.feedShopStockMgmt}</p>
            <span>{t.version}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
