import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import Modal, { OrderForm } from '../components/Modal';
import './Orders.css';

export default function Orders() {
  const { state, actions } = useAppContext();
  const { t, td } = useLanguage();
  const [showAddModal, setShowAddModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => { actions.fetchOrders(); actions.fetchProducts(); }, []);

  let filteredOrders = [...state.orders].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (statusFilter !== 'all') {
    filteredOrders = filteredOrders.filter(o => o.status === statusFilter);
  }

  if (state.searchTerm) {
    const term = state.searchTerm.toLowerCase();
    filteredOrders = filteredOrders.filter(o =>
      o.customer.toLowerCase().includes(term) ||
      o.items.some(i => i.name.toLowerCase().includes(term))
    );
  }

  const handleAddOrder = async (order) => {
    await actions.addOrder(order);
    await actions.fetchProducts();
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await actions.updateOrderStatus(orderId, newStatus);
  };

  const statusOptions = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="orders-page">
      <div className="page-header">
        <div>
          <h1>{t.ordersPage.title}</h1>
          <p>{filteredOrders.length} {t.ordersPage.totalOrders}</p>
        </div>
        <button className="btn btn-add" onClick={() => setShowAddModal(true)}>
          <FiPlus /> {t.ordersPage.newOrder}
        </button>
      </div>

      {/* Status Filters */}
      <div className="order-filters">
        {statusOptions.map(s => (
          <button
            key={s}
            className={`filter-chip ${statusFilter === s ? 'active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === 'all' ? t.all : t.ordersPage[s] || (s.charAt(0).toUpperCase() + s.slice(1))}
            <span className="filter-count">
              {s === 'all' ? state.orders.length : state.orders.filter(o => o.status === s).length}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>{t.ordersPage.orderId}</th>
              <th>{t.ordersPage.customer}</th>
              <th>{t.ordersPage.date}</th>
              <th>{t.ordersPage.items}</th>
              <th>{t.ordersPage.total}</th>
              <th>{t.ordersPage.status}</th>
              <th>{t.ordersPage.action}</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <>
                <tr key={order.id} className="order-row" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                  <td className="order-id">#{order.id}</td>
                  <td>
                    <strong>{order.customer}</strong>
                    {order.phone && <br />}
                    {order.phone && <small className="order-phone">{order.phone}</small>}
                  </td>
                  <td>{order.date}</td>
                  <td>{order.items.length} {t.ordersPage.itemsSuffix}</td>
                  <td className="order-total">₹{order.total.toLocaleString()}</td>
                  <td>
                    <span className={`order-status status-${order.status}`}>{order.status}</span>
                  </td>
                  <td>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) => { e.stopPropagation(); handleStatusChange(order.id, e.target.value); }}
                      onClick={e => e.stopPropagation()}
                    >
                      <option value="pending">{t.ordersPage.pending}</option>
                      <option value="processing">{t.ordersPage.processing}</option>
                      <option value="shipped">{t.ordersPage.shipped}</option>
                      <option value="delivered">{t.ordersPage.delivered}</option>
                      <option value="cancelled">{t.ordersPage.cancelled}</option>
                    </select>
                  </td>
                </tr>
                {expandedOrder === order.id && (
                  <tr key={`${order.id}-details`} className="order-details-row">
                    <td colSpan="7">
                      <div className="order-details">
                        <h4>{t.ordersPage.orderItems}</h4>
                        <div className="detail-items">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="detail-item">
                              <span className="detail-name">{td(item.name)}</span>
                              <span className="detail-qty">x {item.quantity}</span>
                              <span className="detail-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="detail-total">
                          {t.ordersPage.total}: <strong>₹{order.total.toLocaleString()}</strong>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🛒</span>
            <h3>{t.ordersPage.noOrders}</h3>
          </div>
        )}
      </div>

      {showAddModal && (
        <Modal title={t.ordersPage.createNewOrder} onClose={() => setShowAddModal(false)}>
          <OrderForm products={state.products} onSubmit={handleAddOrder} onClose={() => setShowAddModal(false)} />
        </Modal>
      )}
    </div>
  );
}
