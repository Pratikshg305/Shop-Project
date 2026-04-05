import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <span className="footer-icon">🌾</span>
            <h3>{t.appName}</h3>
          </div>
          <p className="footer-desc">{t.footer.description}</p>
        </div>
        <div className="footer-section">
          <h4>{t.footer.quickLinks}</h4>
          <ul>
            <li>{t.nav.dashboard}</li>
            <li>{t.nav.products}</li>
            <li>{t.nav.stockManagement}</li>
            <li>{t.nav.orders}</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t.footer.categories}</h4>
          <ul>
            <li>{t.footer.cattleFeed}</li>
            <li>{t.footer.poultryFeed}</li>
            <li>{t.footer.fishFeed}</li>
            <li>{t.footer.petFood}</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t.footer.contact}</h4>
          <ul>
            <li>{t.footer.address}</li>
            <li>{t.footer.phone}</li>
            <li>{t.footer.email}</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t.footer.copyright}</p>
        <div className="footer-features">
          <span>✅ {t.footer.original}</span>
          <span>🚚 {t.footer.delivery}</span>
          <span>🔒 {t.footer.secure}</span>
          <span>📞 {t.footer.support}</span>
        </div>
      </div>
    </footer>
  );
}
