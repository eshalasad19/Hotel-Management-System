import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const Rooms = () => {
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const [rooms, setRooms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    floor: "",
    roomNumber: "",
    type: "",
    price: "",
    capacity: "",
    amenities: "",
    description: "",
    status: "available",
    images: [],
  });

  useEffect(() => { loadRooms(); }, []);

  useEffect(() => {
    let result = rooms;
    if (filterStatus) result = result.filter(r => r.status === filterStatus);
    if (filterType) result = result.filter(r => r.type === filterType);
    setFiltered(result);
  }, [filterStatus, filterType, rooms]);

  const loadRooms = async () => {
    try {
      const res = await axios.get(`${API_URL}/rooms`, { headers });
      setRooms(res.data);
      setFiltered(res.data);
    } catch (err) { console.error(err); }
  };

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
  };

  const statusBadge = (status) => {
    const map = {
      available:   'bg-success-subtle text-success',
      occupied:    'bg-danger-subtle text-danger',
      maintenance: 'bg-warning-subtle text-warning'
    };
    return <span className={`badge ${map[status]}`}>{status}</span>;
  };

  const typeBadge = (type) => {
    const map = {
      single:  'bg-info-subtle text-info',
      double:  'bg-primary-subtle text-primary',
      suite:   'bg-warning-subtle text-warning',
      deluxe:  'bg-secondary-subtle text-secondary'
    };
    return <span className={`badge ${map[type] || 'bg-secondary'}`}>{type}</span>;
  };

  const handleAdd = async () => {

    setError('');
  
    if (
      !form.roomNumber ||
      !form.type ||
      !form.price ||
      !form.capacity
    ) {
      setError('Please fill all required fields.');
      return;
    }
  
    try {
  
      const formData = new FormData();
  
      formData.append('roomNumber', form.roomNumber);
  
      formData.append('floor', form.floor);
  
      formData.append('type', form.type);
  
      formData.append('price', form.price);
  
      formData.append('capacity', form.capacity);
  
      formData.append('description', form.description);
  
      formData.append('status', 'available');
  
      form.amenities
        .split(',')
        .forEach(a =>
          formData.append('amenities', a.trim())
        );
  
      form.images.forEach((img) => {
        formData.append('images', img);
      });
  
      await axios.post(
        `${API_URL}/rooms`,
        formData,
        {
          headers: {
            ...headers,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      setShowAddModal(false);
  
      setForm({
        floor: "",
        roomNumber: "",
        type: "",
        price: "",
        capacity: "",
        amenities: "",
        description: "",
        status: "available",
        images: [],
      });
  
      loadRooms();
  
    } catch (err) {
  
      setError(
        err.response?.data?.message ||
        'Error adding room'
      );
  
    }
  };
  const handleEdit = async () => {
    setError('');
    try {
      await axios.put(`${API_URL}/rooms/${selectedRoom._id}`, {
        ...form,
        amenities: form.amenities.split(',').map(a => a.trim()).filter(Boolean)
      }, { headers });
      setShowEditModal(false);
      loadRooms();
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating room');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/rooms/${selectedRoom._id}`, { headers });
      setShowDeleteModal(false);
      loadRooms();
    } catch (err) { console.error(err); }
  };

  const changeStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/rooms/${id}`, { status }, { headers });
      loadRooms();
    } catch (err) { console.error(err); }
  };

  const openEdit = (room) => {
    setSelectedRoom(room);
    setForm({
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      capacity: room.capacity,
      amenities: room.amenities?.join(', ') || '',
      description: room.description || '',
      status: room.status
    });
    setError('');
    setShowEditModal(true);
  };

  return (
    <div className="container-fluid">
      {/* Page Title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Rooms</h4>
            <button className="btn btn-success" onClick={() => { setForm({ roomNumber: '', type: '', price: '', capacity: '', amenities: '', description: '', status: 'available' }); setError(''); setShowAddModal(true); }}>
              <i className="ri-add-line me-1"></i> Add Room
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-3">
        {[
          { label: 'Total Rooms', value: stats.total, icon: 'bx bx-building', color: 'info' },
          { label: 'Available', value: stats.available, icon: 'bx bx-check-circle', color: 'success' },
          { label: 'Occupied', value: stats.occupied, icon: 'bx bx-bed', color: 'danger' },
          { label: 'Maintenance', value: stats.maintenance, icon: 'bx bx-wrench', color: 'warning' },
        ].map((s, i) => (
          <div className="col-xl-3 col-md-6" key={i}>
            <div className="card card-animate">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span className={`avatar-title bg-${s.color}-subtle rounded fs-3`}>
                      <i className={`${s.icon} text-${s.color}`}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-medium text-muted mb-1 fs-12">{s.label}</p>
                    <h4 className="mb-0 fw-semibold">{s.value}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header d-flex align-items-center">
          <h5 className="card-title mb-0 flex-grow-1">All Rooms</h5>
          <div className="d-flex gap-2">
            <select className="form-select form-select-sm w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="maintenance">Maintenance</option>
            </select>
            <select className="form-select form-select-sm w-auto" value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="">All Types</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="suite">Suite</option>
              <option value="deluxe">Deluxe</option>
            </select>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-nowrap align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th><th>Room No</th><th>Type</th><th>Price/Night</th>
                  <th>Capacity</th><th>Amenities</th><th>Status</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="8" className="text-center py-4 text-muted">No rooms found.</td></tr>
                ) : filtered.map((room, i) => (
                  <tr key={room._id}>
                    <td>{i + 1}</td>
                    <td><span className="fw-semibold">Room {room.roomNumber}</span></td>
                    <td>{typeBadge(room.type)}</td>
                    <td><span className="fw-medium">PKR {Number(room.price).toLocaleString()}</span></td>
                    <td>{room.capacity} Person(s)</td>
                    <td><small className="text-muted">{room.amenities?.slice(0, 3).join(', ') || '—'}</small></td>
                    <td>{statusBadge(room.status)}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-soft-primary btn-sm" onClick={() => openEdit(room)} title="Edit"><i className="ri-edit-line"></i></button>
                       {room.status === "cleaning" && (
  <button
    className="btn btn-soft-success btn-sm"
    onClick={() =>
      changeStatus(room._id, "available")
    }
    title="Mark Cleaned"
  >
    <i className="ri-check-line"></i>
  </button>
)}
                        {room.status !== "maintenance" && (
  <button
    className="btn btn-soft-warning btn-sm"
    onClick={() =>
      changeStatus(room._id, "maintenance")
    }
    title="Send To Maintenance"
  >
    <i className="ri-tools-line"></i>
  </button>
)}
                        <button className="btn btn-soft-danger btn-sm" onClick={() => { setSelectedRoom(room); setShowDeleteModal(true); }} title="Delete"><i className="ri-delete-bin-line"></i></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Room</h5>
                <button className="btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row g-3">
                <div className="col-md-6">
  <label className="form-label">
    Floor <span className="text-danger">*</span>
  </label>

  <select
    className="form-select"
    value={form.floor}
    onChange={(e) =>
      setForm({
        ...form,
        floor: e.target.value,
      })
    }
  >
    <option value="">Select Floor</option>

    <option value="Ground Floor">
      Ground Floor
    </option>

    <option value="First Floor">
      First Floor
    </option>

    <option value="Second Floor">
      Second Floor
    </option>
  </select>
</div>
<div className="col-md-6">
  <label className="form-label">
    Room Number
  </label>

  <div className="input-group">

    <span className="input-group-text">

      {form.floor === "Ground Floor" && "GF"}

      {form.floor === "First Floor" && "FF"}

      {form.floor === "Second Floor" && "SF"}

    </span>

    <input
      className="form-control"
      value={form.roomNumber}
      onChange={(e) =>
        setForm({
          ...form,
          roomNumber: e.target.value,
        })
      }
      placeholder="101"
    />
  </div>
</div>
                  <div className="col-md-6">
                    <label className="form-label">Type <span className="text-danger">*</span></label>
                    <select
  className="form-select"
  value={form.type}
  onChange={(e) => {

    const type = e.target.value;

    let capacity = "";

    if (type === "single") capacity = 1;

    if (type === "double") capacity = 2;

    if (type === "suite") capacity = 4;

    if (type === "deluxe") capacity = 3;

    setForm({
      ...form,
      type,
      capacity,
    });
  }}
>
  <option value="">Select Type</option>
  <option value="single">Single</option>
  <option value="double">Double</option>
  <option value="suite">Suite</option>
  <option value="deluxe">Deluxe</option>
</select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Price/Night (PKR) <span className="text-danger">*</span></label>
                    <input className="form-control" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="e.g. 5000" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Capacity <span className="text-danger">*</span></label>
                    <input
  className="form-control"
  type="number"
  value={form.capacity}
  readOnly
/>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Amenities <span className="text-muted fs-12">(comma separated)</span></label>
                    <input className="form-control" value={form.amenities} onChange={e => setForm({ ...form, amenities: e.target.value })} placeholder="WiFi, AC, TV" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
                  </div>
                 <div className="col-12">

  <label className="form-label">
    Room Images
  </label>

  <input
    type="file"
    className="form-control"
    multiple
    onChange={(e) =>
      setForm({
        ...form,
        images: [...e.target.files]
      })
    }
  />

  <div className="d-flex gap-2 flex-wrap mt-2">

    {form.images?.map((img, index) => (

      <div key={index}>
        <img
          src={URL.createObjectURL(img)}
          alt="preview"
          width="80"
          height="80"
          style={{
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
      </div>

    ))}

  </div>

</div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleAdd}>Add Room</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Room</h5>
                <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Room Number</label>
                    <input className="form-control" value={form.roomNumber} onChange={e => setForm({ ...form, roomNumber: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Type</label>
                    <select className="form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                      <option value="suite">Suite</option>
                      <option value="deluxe">Deluxe</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Price/Night (PKR)</label>
                    <input className="form-control" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Capacity</label>
                    <input className="form-control" type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Amenities</label>
                    <input className="form-control" value={form.amenities} onChange={e => setForm({ ...form, amenities: e.target.value })} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="2" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
                  </div>
                  <div className="col-12">

  <label className="form-label">
    Room Images
  </label>

  <input
    type="file"
    className="form-control"
    multiple
    onChange={(e) =>
      setForm({
        ...form,
        images: [...e.target.files]
      })
    }
  />

  <div className="d-flex gap-2 flex-wrap mt-2">

    {form.images?.map((img, index) => (

      <div key={index}>
        <img
          src={URL.createObjectURL(img)}
          alt="preview"
          width="80"
          height="80"
          style={{
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
      </div>

    ))}

  </div>

</div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleEdit}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-body text-center p-4">
                <div className="avatar-md mx-auto mb-3">
                  <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                    <i className="ri-delete-bin-line text-danger"></i>
                  </span>
                </div>
                <h5>Delete Room?</h5>
                <p className="text-muted">This action cannot be undone.</p>
                <div className="d-flex gap-2 justify-content-center">
                  <button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;