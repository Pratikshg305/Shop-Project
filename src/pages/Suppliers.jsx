import { useState, useEffect } from 'react';
import { FiPlus, FiStar, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import Modal, { SupplierForm } from '../components/Modal';
import './Suppliers.css';

export default function Suppliers() {
  const { state, actions } = useAppContext();
  const { t, td } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);

  useEffect(() => { actions.fetchSuppliers(); actions.fetchCategories(); }, []);

  let filteredSuppliers = [...state.suppliers];

  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    filteredSuppliers = filteredSuppliers.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.contact.toLowerCase().includes(term) ||
      s.categories.some(c => c.toLowerCase().includes(term))
    );
  }

  const handleAdd = async (supplier) => {
    await actions.addSupplier(supplier);
  };

  const handleEdit = async (supplier) => {
    await actions.updateSupplier(supplier);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t.suppliersPage.deleteConfirm)) {
      await actions.deleteSupplier(id);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`star ${i <= Math.round(rating) ? 'filled' : ''}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="suppliers-page">
      <div className="page-header">
        <div>
          <h1>{t.suppliersPage.title}</h1>
          <p>{filteredSuppliers.length} {t.suppliersPage.suppliers}</p>
        </div>
        <button className="btn btn-add" onClick={() => setShowAddModal(true)}>
          <FiPlus /> {t.suppliersPage.addSupplier}
        </button>
      </div>

      <div className="suppliers-grid">
        {filteredSuppliers.map(supplier => (
          <div key={supplier.id} className="supplier-card">
            <div className="supplier-header">
              <div className="supplier-avatar">
                {supplier.name.charAt(0)}
              </div>
              <div className="supplier-title">
                <h3>{supplier.name}</h3>
                <p>{supplier.contact}</p>
              </div>
            </div>
            <div className="supplier-rating">
              <div className="stars">{renderStars(supplier.rating)}</div>
              <span>{supplier.rating}/5</span>
            </div>
            <div className="supplier-info-list">
              <div className="supplier-info-item">
                <FiPhone className="info-icon" />
                <span>{supplier.phone}</span>
              </div>
              <div className="supplier-info-item">
                <FiMail className="info-icon" />
                <span>{supplier.email}</span>
              </div>
              <div className="supplier-info-item">
                <FiMapPin className="info-icon" />
                <span>{supplier.address}</span>
              </div>
            </div>
            <div className="supplier-categories">
              {supplier.categories.map(cat => (
                <span key={cat} className="supplier-cat-tag">{td(cat)}</span>
              ))}
            </div>
            <div className="supplier-actions">
              <button className="btn-sm btn-primary" onClick={() => setEditSupplier(supplier)}>{t.edit}</button>
              <button className="btn-sm btn-danger" onClick={() => handleDelete(supplier.id)}>{t.delete}</button>
            </div>
          </div>
        ))}
        {filteredSuppliers.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">👥</span>
            <h3>{t.suppliersPage.noSuppliers}</h3>
            <p>{t.suppliersPage.addFirstSupplier}</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <Modal title={t.suppliersPage.addNewSupplier} onClose={() => setShowAddModal(false)}>
          <SupplierForm categories={state.categories} onSubmit={handleAdd} onClose={() => setShowAddModal(false)} />
        </Modal>
      )}

      {editSupplier && (
        <Modal title={t.suppliersPage.editSupplier} onClose={() => setEditSupplier(null)}>
          <SupplierForm supplier={editSupplier} categories={state.categories} onSubmit={handleEdit} onClose={() => setEditSupplier(null)} />
        </Modal>
      )}
    </div>
  );
}
