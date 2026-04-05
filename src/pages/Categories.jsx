import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import './Categories.css';

export default function Categories() {
  const { state, actions } = useAppContext();
  const { t, td } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', icon: '📦', color: '#4caf50', description: '' });

  useEffect(() => { actions.fetchCategories(); actions.fetchProducts(); }, []);

  const categoriesWithStats = state.categories.map(cat => {
    const products = state.products.filter(p => p.category === cat.name);
    const totalStock = products.reduce((s, p) => s + p.stock, 0);
    const totalValue = products.reduce((s, p) => s + (p.price * p.stock), 0);
    const lowStock = products.filter(p => p.stock <= p.minStock).length;
    return { ...cat, productCount: products.length, totalStock, totalValue, lowStock };
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCat.name) return;
    try {
      await actions.addCategory(newCat);
      setNewCat({ name: '', icon: '📦', color: '#4caf50', description: '' });
      setShowForm(false);
    } catch (err) { alert(err.message); }
  };

  const handleDelete = async (id) => {
    const cat = state.categories.find(c => c.id === id);
    if (window.confirm(`Delete category "${cat.name}"?`)) {
      try {
        await actions.deleteCategory(id);
      } catch (err) { alert(err.message); }
    }
  };

  return (
    <div className="categories-page">
      <div className="page-header">
        <div>
          <h1>{t.categoriesPage.title}</h1>
          <p>{state.categories.length} {t.categoriesPage.feedCategories}</p>
        </div>
        <button className="btn btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? t.cancel : t.categoriesPage.addCategory}
        </button>
      </div>

      {showForm && (
        <form className="add-category-form" onSubmit={handleAdd}>
          <input
            placeholder={t.categoriesPage.categoryName}
            value={newCat.name}
            onChange={e => setNewCat({ ...newCat, name: e.target.value })}
            required
          />
          <input
            placeholder={t.categoriesPage.iconEmoji}
            value={newCat.icon}
            onChange={e => setNewCat({ ...newCat, icon: e.target.value })}
            style={{ width: '80px', textAlign: 'center' }}
          />
          <input
            type="color"
            value={newCat.color}
            onChange={e => setNewCat({ ...newCat, color: e.target.value })}
            style={{ width: '50px', padding: '4px' }}
          />
          <input
            placeholder={t.categoriesPage.description}
            value={newCat.description}
            onChange={e => setNewCat({ ...newCat, description: e.target.value })}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-submit">{t.add}</button>
        </form>
      )}

      <div className="categories-grid">
        {categoriesWithStats.map(cat => (
          <div key={cat.id} className="cat-card" style={{ borderTopColor: cat.color }}>
            <div className="cat-card-header">
              <div className="cat-icon-wrapper" style={{ background: `${cat.color}15` }}>
                <span className="cat-icon">{cat.icon}</span>
              </div>
              <button className="cat-delete" onClick={() => handleDelete(cat.id)} title="Delete category">×</button>
            </div>
            <h3 className="cat-name">{td(cat.name)}</h3>
            <p className="cat-desc">{td(cat.description)}</p>
            <div className="cat-stats">
              <div className="cat-stat">
                <span className="cat-stat-value">{cat.productCount}</span>
                <span className="cat-stat-label">{t.categoriesPage.productsLabel}</span>
              </div>
              <div className="cat-stat">
                <span className="cat-stat-value">{cat.totalStock}</span>
                <span className="cat-stat-label">{t.categoriesPage.totalStock}</span>
              </div>
              <div className="cat-stat">
                <span className="cat-stat-value">₹{(cat.totalValue / 1000).toFixed(0)}K</span>
                <span className="cat-stat-label">{t.categoriesPage.value}</span>
              </div>
            </div>
            {cat.lowStock > 0 && (
              <div className="cat-alert">
                ⚠️ {cat.lowStock} {t.categoriesPage.lowOnStock}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
