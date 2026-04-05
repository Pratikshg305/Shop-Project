import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiAlertTriangle, FiShoppingCart, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import StatsCard from '../components/StatsCard';
import Footer from '../components/Footer';
import './Dashboard.css';

export default function Dashboard() {
  const { state, actions } = useAppContext();
  const { t, td } = useLanguage();
  const stats = state.dashboardStats;

  useEffect(() => { actions.fetchDashboardStats(); }, [actions.fetchDashboardStats]);

  if (!stats) return <div className="dashboard"><p>{t.dashboard.loadingDashboard}</p></div>;

  const categoryStockData = (stats.categoryStats || []).filter(c => c.productCount > 0);
  const lowStockProducts = stats.lowStockProducts || [];
  const recentOrders = stats.recentOrders || [];

  return (
    <div className="dashboard">
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>{t.dashboard.welcome}</h1>
          <p>{t.dashboard.subtitle}</p>
          <div className="hero-actions">
            <Link to="/products" className="hero-btn primary">{t.dashboard.browseProducts}</Link>
            <Link to="/orders" className="hero-btn secondary">{t.dashboard.viewOrders}</Link>
          </div>
        </div>
        <div className="hero-illustration">
          <span className="hero-emoji">🌾🐄🐔🐟</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatsCard
          title={t.dashboard.totalProducts}
          value={stats.totalProducts}
          icon={<FiPackage />}
          color="#2e7d32"
          subtitle={`${categoryStockData.length} ${t.dashboard.categories}`}
        />
        <StatsCard
          title={t.dashboard.totalStock}
          value={stats.totalStock.toLocaleString()}
          icon={<FiTrendingUp />}
          color="#1976d2"
          subtitle={t.dashboard.unitsAcross}
        />
        <StatsCard
          title={t.dashboard.lowStockAlerts}
          value={stats.lowStockCount}
          icon={<FiAlertTriangle />}
          color="#f57c00"
          subtitle={`${stats.outOfStockCount} ${t.dashboard.outOfStock}`}
        />
        <StatsCard
          title={t.dashboard.totalOrders}
          value={stats.totalOrders}
          icon={<FiShoppingCart />}
          color="#9c27b0"
          subtitle={`${stats.pendingOrders} ${t.dashboard.pending}`}
        />
      </div>

      {/* Feature Highlights */}
      <div className="features-strip">
        <div className="feature-item">
          <span>✅</span>
          <p>{t.dashboard.originalProducts}</p>
        </div>
        <div className="feature-item">
          <span>📦</span>
          <p>{t.dashboard.realtimeTracking}</p>
        </div>
        <div className="feature-item">
          <span>📊</span>
          <p>{t.dashboard.smartAlerts}</p>
        </div>
        <div className="feature-item">
          <span>🔒</span>
          <p>{t.dashboard.secureManagement}</p>
        </div>
      </div>

      {/* Shop by Categories */}
      <section className="dashboard-section">
        <div className="section-header">
          <h2>{t.dashboard.shopByCategories}</h2>
          <Link to="/categories" className="view-all-link">{t.dashboard.viewAll} <FiArrowRight /></Link>
        </div>
        <div className="category-grid">
          {categoryStockData.map(cat => (
            <Link to="/products" key={cat.id} className="category-card" style={{ borderColor: cat.color }}>
              <div className="category-icon" style={{ background: `${cat.color}15` }}>
                <span>{cat.icon}</span>
              </div>
              <h3>{td(cat.name)}</h3>
              <p>{cat.productCount} {t.dashboard.products}</p>
              <span className="category-stock" style={{ color: cat.color }}>
                {t.dashboard.stockLabel}: {cat.totalStock}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Low Stock Alerts & Recent Orders */}
      <div className="dashboard-grid-2">
        <section className="dashboard-card">
          <div className="card-header">
            <h2>{t.dashboard.lowStockAlertsSection}</h2>
            <Link to="/stock" className="view-all-link">{t.dashboard.manage} <FiArrowRight /></Link>
          </div>
          <div className="alert-list">
            {lowStockProducts.map(product => (
              <div key={product.id} className={`alert-item ${product.stock === 0 ? 'critical' : 'warning'}`}>
                <div className="alert-info">
                  <h4>{td(product.name)}</h4>
                  <p>{product.brand} - {td(product.category)}</p>
                </div>
                <div className="alert-stock">
                  <span className={product.stock === 0 ? 'text-danger' : 'text-warning'}>
                    {product.stock} / {product.minStock}
                  </span>
                  <small>{product.unit}</small>
                </div>
              </div>
            ))}
            {lowStockProducts.length === 0 && (
              <p className="empty-message">{t.dashboard.allHealthy}</p>
            )}
          </div>
        </section>

        <section className="dashboard-card">
          <div className="card-header">
            <h2>{t.dashboard.recentOrders}</h2>
            <Link to="/orders" className="view-all-link">{t.dashboard.viewAll} <FiArrowRight /></Link>
          </div>
          <div className="orders-list">
            {recentOrders.map(order => (
              <div key={order.id} className="order-item">
                <div className="order-info">
                  <h4>{order.customer}</h4>
                  <p>{order.date} &middot; {order.items.length} {t.dashboard.items}</p>
                </div>
                <div className="order-meta">
                  <span className="order-amount">₹{order.total.toLocaleString()}</span>
                  <span className={`order-status status-${order.status}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Revenue Summary */}
      <section className="revenue-banner">
        <div className="revenue-item">
          <h3>₹{stats.deliveredRevenue.toLocaleString()}</h3>
          <p>{t.dashboard.totalRevenue}</p>
        </div>
        <div className="revenue-item">
          <h3>{stats.totalSuppliers}</h3>
          <p>{t.dashboard.activeSuppliers}</p>
        </div>
        <div className="revenue-item">
          <h3>{stats.wellStocked}</h3>
          <p>{t.dashboard.wellStocked}</p>
        </div>
        <div className="revenue-item">
          <h3>{stats.completedOrders}</h3>
          <p>{t.dashboard.completedOrders}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
