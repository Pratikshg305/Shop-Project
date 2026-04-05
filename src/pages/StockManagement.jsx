import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import Modal, { StockUpdateForm } from '../components/Modal';
import './StockManagement.css';

export default function StockManagement() {
  const { state, actions } = useAppContext();
  const { t, td } = useLanguage();
  const [stockProduct, setStockProduct] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => { actions.fetchProducts(); }, []);

  let filteredProducts = [...state.products];

  if (filter === 'low') {
    filteredProducts = filteredProducts.filter(p => p.stock > 0 && p.stock <= p.minStock);
  } else if (filter === 'out') {
    filteredProducts = filteredProducts.filter(p => p.stock === 0);
  } else if (filter === 'healthy') {
    filteredProducts = filteredProducts.filter(p => p.stock > p.minStock);
  }

  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term)
    );
  }

  if (sortBy === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === 'stock-asc') {
    filteredProducts.sort((a, b) => a.stock - b.stock);
  } else if (sortBy === 'stock-desc') {
    filteredProducts.sort((a, b) => b.stock - a.stock);
  } else if (sortBy === 'category') {
    filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
  }

  const handleStockUpdate = async ({ productId, quantity, type }) => {
    await actions.updateStock({ productId, quantity, type });
  };

  const totalItems = state.products.length;
  const healthyCount = state.products.filter(p => p.stock > p.minStock).length;
  const lowCount = state.products.filter(p => p.stock > 0 && p.stock <= p.minStock).length;
  const outCount = state.products.filter(p => p.stock === 0).length;

  return (
    <div className="stock-page">
      <div className="page-header">
        <div>
          <h1>{t.stockPage.title}</h1>
          <p>{t.stockPage.subtitle}</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="stock-summary">
        <button className={`summary-card ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
          <span className="summary-count">{totalItems}</span>
          <span className="summary-label">{t.stockPage.allProducts}</span>
        </button>
        <button className={`summary-card healthy ${filter === 'healthy' ? 'active' : ''}`} onClick={() => setFilter('healthy')}>
          <span className="summary-count">{healthyCount}</span>
          <span className="summary-label">{t.stockPage.inStock}</span>
        </button>
        <button className={`summary-card warning ${filter === 'low' ? 'active' : ''}`} onClick={() => setFilter('low')}>
          <span className="summary-count">{lowCount}</span>
          <span className="summary-label">{t.stockPage.lowStock}</span>
        </button>
        <button className={`summary-card danger ${filter === 'out' ? 'active' : ''}`} onClick={() => setFilter('out')}>
          <span className="summary-count">{outCount}</span>
          <span className="summary-label">{t.stockPage.outOfStock}</span>
        </button>
      </div>

      {/* Sort */}
      <div className="stock-toolbar">
        <span className="results-count">{filteredProducts.length} {t.stockPage.productsLabel}</span>
        <div className="sort-group">
          <label>{t.stockPage.sortBy}</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="name">{t.stockPage.sortName}</option>
            <option value="stock-asc">{t.stockPage.sortStockLow}</option>
            <option value="stock-desc">{t.stockPage.sortStockHigh}</option>
            <option value="category">{t.stockPage.sortCategory}</option>
          </select>
        </div>
      </div>

      {/* Stock Table */}
      <div className="stock-table-wrapper">
        <table className="stock-table">
          <thead>
            <tr>
              <th>{t.stockPage.product}</th>
              <th>{t.stockPage.category}</th>
              <th>{t.stockPage.brand}</th>
              <th>{t.stockPage.price}</th>
              <th>{t.stockPage.stock}</th>
              <th>{t.stockPage.minLevel}</th>
              <th>{t.stockPage.status}</th>
              <th>{t.stockPage.value}</th>
              <th>{t.stockPage.action}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => {
              const status = product.stock === 0 ? 'out' : product.stock <= product.minStock ? 'low' : 'ok';
              return (
                <tr key={product.id} className={`stock-row ${status}`}>
                  <td className="product-cell">
                    <strong>{td(product.name)}</strong>
                  </td>
                  <td>{td(product.category)}</td>
                  <td>{product.brand}</td>
                  <td>₹{product.price.toLocaleString()}</td>
                  <td className="stock-cell">
                    <span className={`stock-number ${status}`}>{product.stock}</span>
                    <small>{product.unit}</small>
                  </td>
                  <td>{product.minStock}</td>
                  <td>
                    <span className={`status-pill ${status}`}>
                      {status === 'out' ? t.stockPage.outOfStock : status === 'low' ? t.stockPage.lowStock : t.stockPage.inStock}
                    </span>
                  </td>
                  <td>₹{(product.price * product.stock).toLocaleString()}</td>
                  <td>
                    <button className="btn-sm btn-primary" onClick={() => setStockProduct(product)}>
                      {t.update}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">📦</span>
            <h3>{t.stockPage.noMatch}</h3>
          </div>
        )}
      </div>

      {stockProduct && (
        <Modal title={t.stockPage.updateStock} onClose={() => setStockProduct(null)}>
          <StockUpdateForm product={stockProduct} onSubmit={handleStockUpdate} onClose={() => setStockProduct(null)} />
        </Modal>
      )}
    </div>
  );
}
