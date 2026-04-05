import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import './Modal.css';

export default function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ProductForm({ product, categories, onSubmit, onClose }) {
  const { t } = useLanguage();
  const [form, setForm] = useState(product || {
    name: '', category: categories[0]?.name || '', brand: '', price: '',
    mrp: '', stock: '', unit: '50 Kg', description: '', minStock: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: ['price','mrp','stock','minStock'].includes(name) ? Number(value) || '' : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price) return;
    onSubmit(form);
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>{t.productForm.productName}</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t.productForm.category}</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>{t.productForm.brand}</label>
          <input name="brand" value={form.brand} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t.productForm.unit}</label>
          <input name="unit" value={form.unit} onChange={handleChange} placeholder={t.productForm.unitPlaceholder} />
        </div>
        <div className="form-group">
          <label>{t.productForm.sellingPrice}</label>
          <input name="price" type="number" min="0" value={form.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t.productForm.mrp}</label>
          <input name="mrp" type="number" min="0" value={form.mrp} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t.productForm.currentStock}</label>
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t.productForm.minStock}</label>
          <input name="minStock" type="number" min="0" value={form.minStock} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group full-width">
        <label>{t.productForm.description}</label>
        <textarea name="description" rows="3" value={form.description} onChange={handleChange}></textarea>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-cancel" onClick={onClose}>{t.cancel}</button>
        <button type="submit" className="btn btn-submit">{product ? t.productForm.updateProduct : t.productForm.addProduct}</button>
      </div>
    </form>
  );
}

export function StockUpdateForm({ product, onSubmit, onClose }) {
  const { t, td } = useLanguage();
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('in');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quantity || quantity <= 0) return;
    onSubmit({ productId: product.id, quantity: Number(quantity), type });
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="stock-update-info">
        <p><strong>{td(product.name)}</strong></p>
        <p>Current Stock: <strong>{product.stock} {product.unit}</strong></p>
      </div>
      <div className="form-grid">
        <div className="form-group">
          <label>{t.stockForm.type}</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="in">{t.stockForm.stockIn}</option>
            <option value="out">{t.stockForm.stockOut}</option>
          </select>
        </div>
        <div className="form-group">
          <label>{t.stockForm.quantity}</label>
          <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} required />
        </div>
      </div>
      <div className="stock-preview">
        {quantity > 0 && (
          <p>
            {t.stockForm.newStock} <strong>
              {type === 'in' ? product.stock + Number(quantity) : Math.max(0, product.stock - Number(quantity))}
              {' '}{product.unit}
            </strong>
          </p>
        )}
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-cancel" onClick={onClose}>{t.cancel}</button>
        <button type="submit" className="btn btn-submit">{t.stockForm.updateStock}</button>
      </div>
    </form>
  );
}

export function OrderForm({ products, onSubmit, onClose }) {
  const { t, td } = useLanguage();
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [items, setItems] = useState([{ productId: '', quantity: 1 }]);

  const addItem = () => setItems([...items, { productId: '', quantity: 1 }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const updateItem = (idx, field, value) => {
    setItems(items.map((item, i) => i === idx ? { ...item, [field]: field === 'quantity' ? Number(value) : value } : item));
  };

  const getTotal = () => {
    return items.reduce((sum, item) => {
      const prod = products.find(p => p.id === Number(item.productId));
      return sum + (prod ? prod.price * item.quantity : 0);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer || items.some(i => !i.productId)) return;
    const orderItems = items.map(item => {
      const prod = products.find(p => p.id === Number(item.productId));
      return { productId: prod.id, name: prod.name, quantity: item.quantity, price: prod.price };
    });
    onSubmit({
      customer,
      phone,
      items: orderItems,
      total: getTotal(),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>{t.orderForm.customerName}</label>
          <input value={customer} onChange={e => setCustomer(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>{t.orderForm.phone}</label>
          <input value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
      </div>

      <div className="order-items-section">
        <div className="order-items-header">
          <label>{t.orderForm.orderItems}</label>
          <button type="button" className="btn-link" onClick={addItem}>{t.orderForm.addItem}</button>
        </div>
        {items.map((item, idx) => (
          <div key={idx} className="order-item-row">
            <select value={item.productId} onChange={e => updateItem(idx, 'productId', e.target.value)} required>
              <option value="">{t.orderForm.selectProduct}</option>
              {products.filter(p => p.stock > 0).map(p => (
                <option key={p.id} value={p.id}>{td(p.name)} (₹{p.price}) - {t.stockPage.stock}: {p.stock}</option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={e => updateItem(idx, 'quantity', e.target.value)}
              style={{ width: '80px' }}
            />
            {items.length > 1 && (
              <button type="button" className="btn-icon-remove" onClick={() => removeItem(idx)}>×</button>
            )}
          </div>
        ))}
      </div>

      <div className="order-total">
        <span>{t.orderForm.total} </span>
        <strong>₹{getTotal().toLocaleString()}</strong>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-cancel" onClick={onClose}>{t.cancel}</button>
        <button type="submit" className="btn btn-submit">{t.orderForm.createOrder}</button>
      </div>
    </form>
  );
}

export function SupplierForm({ supplier, categories, onSubmit, onClose }) {
  const { t } = useLanguage();
  const [form, setForm] = useState(supplier || {
    name: '', contact: '', phone: '', email: '', address: '', categories: [], rating: 4.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));
  };

  const toggleCategory = (catName) => {
    setForm(prev => ({
      ...prev,
      categories: prev.categories.includes(catName)
        ? prev.categories.filter(c => c !== catName)
        : [...prev.categories, catName],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    onSubmit(form);
    onClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>{t.supplierForm.companyName}</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t.supplierForm.contactPerson}</label>
          <input name="contact" value={form.contact} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t.supplierForm.phone}</label>
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{t.supplierForm.email}</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group full-width">
          <label>{t.supplierForm.address}</label>
          <input name="address" value={form.address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>{t.supplierForm.rating}</label>
          <input name="rating" type="number" min="1" max="5" step="0.1" value={form.rating} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group full-width">
        <label>{t.supplierForm.supplyCategories}</label>
        <div className="category-checkboxes">
          {categories.map(c => (
            <label key={c.id} className="checkbox-label">
              <input
                type="checkbox"
                checked={form.categories.includes(c.name)}
                onChange={() => toggleCategory(c.name)}
              />
              {c.name}
            </label>
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn btn-cancel" onClick={onClose}>{t.cancel}</button>
        <button type="submit" className="btn btn-submit">{supplier ? t.supplierForm.updateSupplier : t.supplierForm.addSupplier}</button>
      </div>
    </form>
  );
}
