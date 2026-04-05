import { useState, useEffect } from 'react';
import { FiPlus, FiFilter } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import Modal, { ProductForm, StockUpdateForm } from '../components/Modal';
import './Products.css';

export default function Products() {
  const { state, actions } = useAppContext();
  const { t, td } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [stockProduct, setStockProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => { actions.fetchProducts(); actions.fetchCategories(); }, []);

  const filteredProducts = state.products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = !state.searchTerm ||
      p.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(state.searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = async (product) => {
    await actions.addProduct(product);
  };

  const handleEdit = async (product) => {
    await actions.updateProduct(product);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.productsPage.deleteConfirm)) {
      await actions.deleteProduct(id);
    }
  };

  const handleStockUpdate = async ({ productId, quantity, type }) => {
    await actions.updateStock({ productId, quantity, type });
  };

  const categoryNames = ['All', ...state.categories.map(c => c.name)];

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>{t.productsPage.title}</h1>
          <p>{filteredProducts.length} {t.productsPage.productsFound}</p>
        </div>
        <button className="btn btn-add" onClick={() => setShowAddModal(true)}>
          <FiPlus /> {t.productsPage.addProduct}
        </button>
      </div>

      <div className="filters-bar">
        <FiFilter className="filter-icon" />
        <div className="category-filters">
          {categoryNames.map(cat => (
            <button
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? t.all : td(cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={setEditProduct}
            onDelete={handleDelete}
            onStockUpdate={setStockProduct}
          />
        ))}
        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">📦</span>
            <h3>{t.productsPage.noProducts}</h3>
            <p>{t.productsPage.tryAdjusting}</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <Modal title={t.productsPage.addNewProduct} onClose={() => setShowAddModal(false)}>
          <ProductForm categories={state.categories} onSubmit={handleAdd} onClose={() => setShowAddModal(false)} />
        </Modal>
      )}

      {editProduct && (
        <Modal title={t.productsPage.editProduct} onClose={() => setEditProduct(null)}>
          <ProductForm product={editProduct} categories={state.categories} onSubmit={handleEdit} onClose={() => setEditProduct(null)} />
        </Modal>
      )}

      {stockProduct && (
        <Modal title={t.productsPage.updateStock} onClose={() => setStockProduct(null)}>
          <StockUpdateForm product={stockProduct} onSubmit={handleStockUpdate} onClose={() => setStockProduct(null)} />
        </Modal>
      )}
    </div>
  );
}
