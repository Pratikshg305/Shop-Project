import { useLanguage } from '../context/LanguageContext';
import './ProductCard.css';

export default function ProductCard({ product, onEdit, onDelete, onStockUpdate }) {
  const { t, td } = useLanguage();

  const discount = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const stockStatus = product.stock === 0
    ? 'out-of-stock'
    : product.stock <= product.minStock
    ? 'low-stock'
    : 'in-stock';

  const stockLabel = {
    'out-of-stock': t.productCard.outOfStock,
    'low-stock': t.productCard.lowStock,
    'in-stock': t.productCard.inStock,
  };

  const categoryColors = {
    'Cattle Feed': '#4caf50',
    'Poultry Feed': '#ff9800',
    'Fish Feed': '#2196f3',
    'Pet Food': '#9c27b0',
    'Goat & Sheep Feed': '#795548',
    'Horse Feed': '#607d8b',
    'Fodder & Hay': '#8bc34a',
    'Feed Supplements': '#e91e63',
    'Feed Equipment': '#00bcd4',
    'Organic Feed': '#388e3c',
  };

  const color = categoryColors[product.category] || '#666';

  return (
    <div className="product-card">
      {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
      <div className="product-image" style={{ background: `${color}12` }}>
        <span className="product-emoji">
          {product.category === 'Cattle Feed' ? '🐄' :
           product.category === 'Poultry Feed' ? '🐔' :
           product.category === 'Fish Feed' ? '🐟' :
           product.category === 'Pet Food' ? '🐕' :
           product.category === 'Goat & Sheep Feed' ? '🐐' :
           product.category === 'Horse Feed' ? '🐴' :
           product.category === 'Fodder & Hay' ? '🌾' :
           product.category === 'Feed Supplements' ? '💊' :
           product.category === 'Feed Equipment' ? '⚙️' :
           product.category === 'Organic Feed' ? '🌿' : '📦'}
        </span>
      </div>
      <div className="product-details">
        <span className="product-category" style={{ color, background: `${color}12` }}>
          {td(product.category)}
        </span>
        <h3 className="product-name">{td(product.name)}</h3>
        <p className="product-brand">{product.brand}</p>
        <div className="product-pricing">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          {discount > 0 && <span className="product-mrp">₹{product.mrp.toLocaleString()}</span>}
          {discount > 0 && <span className="product-save">{t.productCard.save} ₹{(product.mrp - product.price).toLocaleString()}</span>}
        </div>
        <div className="product-stock-row">
          <span className={`stock-badge ${stockStatus}`}>{stockLabel[stockStatus]}</span>
          <span className="stock-count">{product.stock} {product.unit}</span>
        </div>
        <div className="product-actions">
          <button className="btn-sm btn-primary" onClick={() => onEdit(product)}>{t.productCard.edit}</button>
          <button className="btn-sm btn-outline" onClick={() => onStockUpdate(product)}>{t.productCard.stock}</button>
          <button className="btn-sm btn-danger" onClick={() => onDelete(product.id)}>{t.productCard.delete}</button>
        </div>
      </div>
    </div>
  );
}
