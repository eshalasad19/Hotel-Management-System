import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

const RestaurantOrders = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [showNewModal, setShowNewModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState('Pending');
  const [error, setError] = useState('');
  const [orderForm, setOrderForm] = useState({
    guestName: '',
    roomNumber: '',
    notes: '',
    items: [{ menuItemId: '', name: '', quantity: 1, price: 0 }],
  });

  useEffect(() => { loadOrders(); loadMenu(); }, []);

  useEffect(() => {
    setFiltered(filterStatus ? orders.filter(o => o.status === filterStatus) : orders);
  }, [filterStatus, orders]);

  const loadOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/restaurant/orders`, { headers });
      setOrders(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  const loadMenu = async () => {
    try {
      const res = await axios.get(`${API_URL}/restaurant/menu`, { headers });
      setMenuItems((res.data.data || []).filter(i => i.isAvailable));
    } catch (err) { console.error(err); }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    preparing: orders.filter(o => ['Confirmed', 'Preparing'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
  };

  const formatPKR = (n) => 'PKR ' + Number(n).toLocaleString('en-PK');

  const statusBadge = (status) => {
    const map = {
      Pending: 'bg-warning-subtle text-warning',
      Confirmed: 'bg-info-subtle text-info',
      Preparing: 'bg-primary-subtle text-primary',
      Ready: 'bg-success-subtle text-success',
      Delivered: 'bg-success text-white',
      Cancelled: 'bg-danger-subtle text-danger',
    };
    return <span className={`badge ${map[status] || 'bg-secondary'}`}>{status}</span>;
  };

  const calcTotal = (items) => items.reduce((s, i) => s + (i.price * i.quantity), 0);

  const addOrderLine = () => {
    setOrderForm({
      ...orderForm,
      items: [...orderForm.items, { menuItemId: '', name: '', quantity: 1, price: 0 }],
    });
  };

  const updateOrderLine = (idx, menuItemId) => {
    const item = menuItems.find(m => m._id === menuItemId);
    const items = [...orderForm.items];
    items[idx] = item
      ? { menuItemId: item._id, name: item.name, quantity: items[idx].quantity || 1, price: item.price }
      : { menuItemId: '', name: '', quantity: 1, price: 0 };
    setOrderForm({ ...orderForm, items });
  };

  const handleCreateOrder = async () => {
    setError('');
    const validItems = orderForm.items.filter(i => i.name && i.quantity > 0);
    if (!orderForm.guestName || validItems.length === 0) {
      setError('Guest name and at least one item are required.');
      return;
    }
    try {
      await axios.post(`${API_URL}/restaurant/orders`, {
        guestName: orderForm.guestName,
        roomNumber: orderForm.roomNumber,
        notes: orderForm.notes,
        items: validItems,
        totalAmount: calcTotal(validItems),
        status: 'Pending',
      }, { headers });
      setShowNewModal(false);
      setOrderForm({ guestName: '', roomNumber: '', notes: '', items: [{ menuItemId: '', name: '', quantity: 1, price: 0 }] });
      loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order.');
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.put(`${API_URL}/restaurant/orders/${selected._id}`, { status: newStatus }, { headers });
      setShowStatusModal(false);
      loadOrders();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Restaurant Orders</h4>
            <button className="btn btn-success" onClick={() => { setError(''); setShowNewModal(true); }}>
              <i className="ri-add-line me-1"></i> New Order
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        {[
          { label: 'Total Orders', value: stats.total, color: 'primary' },
          { label: 'Pending', value: stats.pending, color: 'warning' },
          { label: 'In Kitchen', value: stats.preparing, color: 'info' },
          { label: 'Delivered', value: stats.delivered, color: 'success' },
        ].map((s, i) => (
          <div className="col-md-3" key={i}>
            <div className="card card-animate">
              <div className="card-body">
                <p className="text-muted mb-1 fs-12 text-uppercase">{s.label}</p>
                <h4 className={`mb-0 text-${s.color}`}>{s.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header d-flex align-items-center gap-2">
          <h5 className="card-title mb-0 flex-grow-1">All Orders</h5>
          <select className="form-select form-select-sm w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th><th>Guest</th><th>Room</th><th>Items</th><th>Total</th><th>Status</th><th>Time</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="8" className="text-center py-4 text-muted">No orders found.</td></tr>
                ) : filtered.map((o, i) => (
                  <tr key={o._id}>
                    <td>{i + 1}</td>
                    <td className="fw-medium">{o.guestName || o.userId?.name || 'Guest'}</td>
                    <td>{o.roomNumber || '—'}</td>
                    <td>
                      <small>{o.items?.map(it => `${it.name} x${it.quantity}`).join(', ')}</small>
                    </td>
                    <td>{formatPKR(o.totalAmount)}</td>
                    <td>{statusBadge(o.status)}</td>
                    <td><small className="text-muted">{new Date(o.createdAt).toLocaleString('en-PK')}</small></td>
                    <td>
                      <button className="btn btn-soft-primary btn-sm" onClick={() => { setSelected(o); setNewStatus(o.status); setShowStatusModal(true); }}>
                        <i className="ri-refresh-line"></i> Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showNewModal && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Restaurant Order</h5>
                <button type="button" className="btn-close" onClick={() => setShowNewModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Guest Name</label>
                    <input className="form-control" value={orderForm.guestName} onChange={e => setOrderForm({ ...orderForm, guestName: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Room Number</label>
                    <input className="form-control" value={orderForm.roomNumber} onChange={e => setOrderForm({ ...orderForm, roomNumber: e.target.value })} />
                  </div>
                </div>
                <label className="form-label">Order Items</label>
                {orderForm.items.map((line, idx) => (
                  <div className="row mb-2 align-items-end" key={idx}>
                    <div className="col-6">
                      <select className="form-select" value={line.menuItemId} onChange={e => updateOrderLine(idx, e.target.value)}>
                        <option value="">Select item</option>
                        {menuItems.map(m => <option key={m._id} value={m._id}>{m.name} — {formatPKR(m.price)}</option>)}
                      </select>
                    </div>
                    <div className="col-3">
                      <input type="number" min="1" className="form-control" placeholder="Qty"
                        value={line.quantity}
                        onChange={e => {
                          const items = [...orderForm.items];
                          items[idx].quantity = Number(e.target.value);
                          setOrderForm({ ...orderForm, items });
                        }} />
                    </div>
                    <div className="col-3">
                      <span className="form-control-plaintext">{formatPKR(line.price * line.quantity)}</span>
                    </div>
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-outline-primary" onClick={addOrderLine}>+ Add Item</button>
                <div className="mt-3">
                  <label className="form-label">Notes</label>
                  <textarea className="form-control" rows={2} value={orderForm.notes} onChange={e => setOrderForm({ ...orderForm, notes: e.target.value })} />
                </div>
                <p className="mt-3 mb-0 fw-semibold">Total: {formatPKR(calcTotal(orderForm.items))}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowNewModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleCreateOrder}>Place Order</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && (
        <div className="modal fade show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Update Order Status</h5>
                <button type="button" className="btn-close" onClick={() => setShowStatusModal(false)}></button>
              </div>
              <div className="modal-body">
                <select className="form-select" value={newStatus} onChange={e => setNewStatus(e.target.value)}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowStatusModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdateStatus}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantOrders;
