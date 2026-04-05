import { useState } from 'react';
import { FiUser, FiLock, FiLogIn, FiEye, FiEyeOff } from 'react-icons/fi';
import { authApi } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import './Login.css';

export default function Login({ onLogin }) {
  const { t } = useLanguage();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password) {
      setError(t.login.bothRequired);
      return;
    }

    setLoading(true);
    try {
      const data = await authApi.login({ username: username.trim(), password });
      onLogin(data.user);
    } catch (err) {
      setError(err.message || t.login.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-branding">
          <div className="login-logo">🌾</div>
          <h1>{t.appName}</h1>
          <p>{t.tagline}</p>
          <div className="login-features">
            <div className="login-feature">
              <span>📦</span>
              <span>{t.login.features.inventory}</span>
            </div>
            <div className="login-feature">
              <span>📊</span>
              <span>{t.login.features.alerts}</span>
            </div>
            <div className="login-feature">
              <span>🛒</span>
              <span>{t.login.features.orders}</span>
            </div>
            <div className="login-feature">
              <span>🤝</span>
              <span>{t.login.features.suppliers}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-header">
            <h2>{t.login.welcomeBack}</h2>
            <p>{t.login.signInSubtitle}</p>
          </div>

          {error && (
            <div className="login-error">
              <span>⚠️</span> {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">
              <FiUser className="field-icon" />
              {t.login.username}
            </label>
            <input
              id="username"
              type="text"
              placeholder={t.login.enterUsername}
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoFocus
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FiLock className="field-icon" />
              {t.login.password}
            </label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t.login.enterPassword}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="login-spinner"></span>
            ) : (
              <>
                <FiLogIn /> {t.login.signIn}
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}
