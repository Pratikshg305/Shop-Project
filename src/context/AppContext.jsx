import { createContext, useContext, useReducer, useCallback } from 'react';
import { productApi, categoryApi, supplierApi, orderApi, dashboardApi } from '../services/api';

const AppContext = createContext();

const initialState = {
  products: [],
  categories: [],
  suppliers: [],
  orders: [],
  dashboardStats: null,
  searchTerm: '',
  loading: false,
  error: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload, loading: false };
    case 'SET_SUPPLIERS':
      return { ...state, suppliers: action.payload, loading: false };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload, loading: false };
    case 'SET_DASHBOARD_STATS':
      return { ...state, dashboardStats: action.payload, loading: false };
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // ─── Products ───
  const fetchProducts = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await productApi.getAll(params);
      dispatch({ type: 'SET_PRODUCTS', payload: data });
    } catch (e) { dispatch({ type: 'SET_ERROR', payload: e.message }); }
  }, []);

  const addProduct = useCallback(async (product) => {
    await productApi.create(product);
    await fetchProducts();
  }, [fetchProducts]);

  const updateProduct = useCallback(async (product) => {
    await productApi.update(product.id, product);
    await fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = useCallback(async (id) => {
    await productApi.delete(id);
    await fetchProducts();
  }, [fetchProducts]);

  const updateStock = useCallback(async ({ productId, quantity, type }) => {
    await productApi.updateStock(productId, { quantity, type });
    await fetchProducts();
  }, [fetchProducts]);

  // ─── Categories ───
  const fetchCategories = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await categoryApi.getAll();
      dispatch({ type: 'SET_CATEGORIES', payload: data });
    } catch (e) { dispatch({ type: 'SET_ERROR', payload: e.message }); }
  }, []);

  const addCategory = useCallback(async (cat) => {
    await categoryApi.create(cat);
    await fetchCategories();
  }, [fetchCategories]);

  const deleteCategory = useCallback(async (id) => {
    await categoryApi.delete(id);
    await fetchCategories();
  }, [fetchCategories]);

  // ─── Suppliers ───
  const fetchSuppliers = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await supplierApi.getAll(params);
      dispatch({ type: 'SET_SUPPLIERS', payload: data });
    } catch (e) { dispatch({ type: 'SET_ERROR', payload: e.message }); }
  }, []);

  const addSupplier = useCallback(async (supplier) => {
    await supplierApi.create(supplier);
    await fetchSuppliers();
  }, [fetchSuppliers]);

  const updateSupplier = useCallback(async (supplier) => {
    await supplierApi.update(supplier.id, supplier);
    await fetchSuppliers();
  }, [fetchSuppliers]);

  const deleteSupplier = useCallback(async (id) => {
    await supplierApi.delete(id);
    await fetchSuppliers();
  }, [fetchSuppliers]);

  // ─── Orders ───
  const fetchOrders = useCallback(async (params = {}) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await orderApi.getAll(params);
      dispatch({ type: 'SET_ORDERS', payload: data });
    } catch (e) { dispatch({ type: 'SET_ERROR', payload: e.message }); }
  }, []);

  const addOrder = useCallback(async (order) => {
    await orderApi.create(order);
    await fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = useCallback(async (id, status) => {
    await orderApi.updateStatus(id, status);
    await fetchOrders();
  }, [fetchOrders]);

  // ─── Dashboard ───
  const fetchDashboardStats = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await dashboardApi.getStats();
      dispatch({ type: 'SET_DASHBOARD_STATS', payload: data });
    } catch (e) { dispatch({ type: 'SET_ERROR', payload: e.message }); }
  }, []);

  const setSearch = useCallback((term) => {
    dispatch({ type: 'SET_SEARCH', payload: term });
  }, []);

  const actions = {
    fetchProducts, addProduct, updateProduct, deleteProduct, updateStock,
    fetchCategories, addCategory, deleteCategory,
    fetchSuppliers, addSupplier, updateSupplier, deleteSupplier,
    fetchOrders, addOrder, updateOrderStatus,
    fetchDashboardStats, setSearch,
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
