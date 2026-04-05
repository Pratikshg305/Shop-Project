import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiSearch, FiBell, FiUser, FiX, FiLogOut, FiLock, FiGlobe } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { authApi } from '../services/api';
import './Navbar.css';

const LANG_OPTIONS = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'mr', label: 'मराठी', flag: '🇮🇳' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
];

export default function Navbar({ onToggleSidebar, user, onLogout }) {
  const { state, actions } = useAppContext();
  const { lang, setLang, t, td } = useLanguage();
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const userMenuRef = useRef(null);
  const langMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => { actions.fetchProducts(); }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setShowUserMenu(false);
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) setShowLangMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const lowStockProducts = state.products.filter(p => p.stock <= p.minStock);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return t.nav.dashboard;
    if (path === '/products') return t.nav.products;
    if (path === '/categories') return t.nav.categories;
    if (path === '/stock') return t.nav.stockManagement;
    if (path === '/orders') return t.nav.orders;
    if (path === '/suppliers') return t.nav.suppliers;
    return t.nav.feedShop;
  };

  const currentLang = LANG_OPTIONS.find(l => l.code === lang) || LANG_OPTIONS[0];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onToggleSidebar}>
          <FiMenu />
        </button>
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">🌾</div>
          <span className="brand-text">{t.appName}</span>
        </Link>
        <span className="page-title">{getPageTitle()}</span>
      </div>

      <div className="navbar-center">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={state.searchTerm}
            onChange={e => actions.setSearch(e.target.value)}
          />
          {state.searchTerm && (
            <button className="search-clear" onClick={() => actions.setSearch('')}>
              <FiX />
            </button>
          )}
        </div>
      </div>

      <div className="navbar-right">
        {/* Language Switcher */}
        <div className="lang-wrapper" ref={langMenuRef}>
          <button className="icon-btn lang-btn" onClick={() => setShowLangMenu(!showLangMenu)}>
            <FiGlobe />
            <span className="lang-code">{currentLang.flag}</span>
          </button>
          {showLangMenu && (
            <div className="lang-dropdown">
              {LANG_OPTIONS.map(opt => (
                <button
                  key={opt.code}
                  className={`lang-option ${lang === opt.code ? 'active' : ''}`}
                  onClick={() => { setLang(opt.code); setShowLangMenu(false); }}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.label}</span>
                  {lang === opt.code && <span className="lang-check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="notif-wrapper">
          <button className="icon-btn" onClick={() => setShowNotif(!showNotif)}>
            <FiBell />
            {lowStockProducts.length > 0 && (
              <span className="badge">{lowStockProducts.length}</span>
            )}
          </button>
          {showNotif && (
            <div className="notif-dropdown">
              <div className="notif-header">
                <h4>{t.notif.lowStockAlerts}</h4>
              </div>
              <div className="notif-list">
                {lowStockProducts.length === 0 ? (
                  <p className="notif-empty">{t.notif.allHealthy}</p>
                ) : (
                  lowStockProducts.map(p => (
                    <div key={p.id} className="notif-item">
                      <span className="notif-dot"></span>
                      <div>
                        <p className="notif-text">{td(p.name)}</p>
                        <p className="notif-sub">
                          {t.notif.stock}: <strong>{p.stock}</strong> / {t.notif.min}: {p.minStock} {p.unit}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="user-wrapper" ref={userMenuRef}>
          <button className="user-info" onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className="avatar">
              <FiUser />
            </div>
            <span className="user-name">{user?.name || 'Admin'}</span>
          </button>
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-dropdown-header">
                <p className="user-dropdown-name">{user?.name || 'Admin'}</p>
                <p className="user-dropdown-role">{user?.role || 'admin'}</p>
              </div>
              <div className="user-dropdown-divider"></div>
              <button
                className="user-dropdown-item"
                onClick={() => { setShowUserMenu(false); setShowPasswordModal(true); setPwError(''); setPwSuccess(''); setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' }); }}
              >
                <FiLock /> {t.userMenu.changePassword}
              </button>
              <button className="user-dropdown-item logout" onClick={onLogout}>
                <FiLogOut /> {t.userMenu.signOut}
              </button>
            </div>
          )}
        </div>
      </div>

      {showPasswordModal && (
        <div className="pw-modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="pw-modal" onClick={e => e.stopPropagation()}>
            <h3>{t.userMenu.changePassword}</h3>
            {pwError && <p className="pw-error">{pwError}</p>}
            {pwSuccess && <p className="pw-success">{pwSuccess}</p>}
            <form onSubmit={async (e) => {
              e.preventDefault();
              setPwError(''); setPwSuccess('');
              if (pwForm.newPassword !== pwForm.confirmPassword) {
                setPwError(t.userMenu.passwordMismatch);
                return;
              }
              try {
                await authApi.changePassword({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
                setPwSuccess(t.userMenu.passwordChanged);
                setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
              } catch (err) {
                setPwError(err.message);
              }
            }}>
              <input type="password" placeholder={t.userMenu.currentPassword} value={pwForm.currentPassword} onChange={e => setPwForm({ ...pwForm, currentPassword: e.target.value })} required autoComplete="current-password" />
              <input type="password" placeholder={t.userMenu.newPassword} value={pwForm.newPassword} onChange={e => setPwForm({ ...pwForm, newPassword: e.target.value })} required minLength={4} autoComplete="new-password" />
              <input type="password" placeholder={t.userMenu.confirmNewPassword} value={pwForm.confirmPassword} onChange={e => setPwForm({ ...pwForm, confirmPassword: e.target.value })} required minLength={4} autoComplete="new-password" />
              <div className="pw-modal-actions">
                <button type="button" className="pw-cancel" onClick={() => setShowPasswordModal(false)}>{t.cancel}</button>
                <button type="submit" className="pw-submit">{t.userMenu.changePassword}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
