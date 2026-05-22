import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5001/api";

const Users = () => {
  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          (u.email && u.email.toLowerCase().includes(q)),
      ),
    );
  }, [search, users]);

 const loadUsers = async () => {

  try {

    const res = await axios.get(
      `${API_URL}/auth/users`,
      { headers }
    );

    const guests = res.data
      .filter(u => u.role === 'guest')
      .map(user => {

        const bookings = user.bookings || [];

        const totalBookings = bookings.length;

        const totalSpent = bookings.reduce(
          (sum, b) => sum + (b.totalAmount || 0),
          0
        );

        const completedBookings = bookings.filter(
          b => b.bookingStatus === 'completed'
        ).length;

        return {
          ...user,
          totalBookings,
          totalSpent,
          completedBookings,
          isVIP: totalSpent > 100000,
        };

      });

    setUsers(guests);
    setFiltered(guests);

  } catch (err) {

    console.error(err);

  }

};
const openView = (u) => {
  setSelectedUser(u);
  setShowViewModal(true);
};

const walkinCount = users.filter((u) =>
  u.guestType === "walk-in"
).length;

const colors = [
  "bg-primary",
  "bg-success",
  "bg-warning",
  "bg-info",
  "bg-danger",
];

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Registered Users (Guests)</h4>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row mb-3">
        {[
          {
            label: "Total Users",
            value: users.length,
            icon: "bx bx-user",
            color: "info",
          },
          {
            label: "Online Guests",
            value: users.length - walkinCount,
            icon: "bx bx-user-check",
            color: "success",
          },
          {
            label: "Walk-in Guests",
            value: walkinCount,
            icon: "bx bx-user-x",
            color: "warning",
          },
        ].map((s, i) => (
          <div className="col-md-4" key={i}>
            <div className="card card-animate">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="avatar-sm flex-shrink-0">
                    <span
                      className={`avatar-title bg-${s.color}-subtle rounded fs-3`}
                    >
                      <i className={`${s.icon} text-${s.color}`}></i>
                    </span>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p className="text-uppercase fw-medium text-muted mb-1 fs-12">
                      {s.label}
                    </p>
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
          <h5 className="card-title mb-0 flex-grow-1">All Registered Users</h5>
          <input
            type="text"
            className="form-control form-control-sm w-auto"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Type</th>
                  <th>Registered</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((u, i) => {
                    const isWalkin = u.guestType === "walk-in";
                    const initials = u.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2);
                    return (
                      <tr key={u._id}>
                        <td>{i + 1}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="avatar-xs">
                              <span
                                className={`avatar-title rounded-circle ${colors[i % colors.length]} text-white`}
                                style={{ fontSize: "11px" }}
                              >
                                {initials}
                              </span>
                            </div>
                            <div>
                              <div className="fw-medium d-flex align-items-center gap-2">

  {u.name}

  {u.isVIP && (
    <span className="badge bg-warning text-dark">
      VIP
    </span>
  )}

</div>
{u.totalBookings > 3 && (
  <span className="badge bg-success">
    Returning
  </span>
)}
                              {isWalkin && (
                                <small className="text-muted">
                                  Walk-in Guest
                                </small>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>{u.phone || "—"}</td>
                        <td>
                          <span className="badge bg-info-subtle text-info">
                            {isWalkin ? "Walk-in" : "Online"}
                          </span>
                        </td>
                        <td>
                          <small className="text-muted">
                            {new Date(u.createdAt).toLocaleDateString("en-PK")}
                          </small>
                        </td>
                        <td>
                          <button
                            className="btn btn-soft-info btn-sm"
                            onClick={() => openView(u)}
                          >
                            <i className="ri-eye-line"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View User Modal */}

      {showViewModal && selectedUser && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Guest Profile</h5>

                <button
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1">Guest Name</p>

                      <h5>{selectedUser.name}</h5>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1">Guest Type</p>

                      <h5>
                        {selectedUser.guestType === "walk-in"
                          ? "Walk-in Guest"
                          : "Online Guest"}
                      </h5>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1">Total Bookings</p>

                      <h5>{selectedUser.totalBookings}</h5>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1">Total Revenue</p>

                      <h5>
                        PKR {Number(selectedUser.totalSpent).toLocaleString()}
                      </h5>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1">VIP Status</p>

                      <h5>
                        {selectedUser.isVIP ? (
                          <span className="badge bg-warning text-dark">
                            VIP Guest
                          </span>
                        ) : (
                          <span className="badge bg-secondary">
                            Normal Guest
                          </span>
                        )}
                      </h5>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="p-3 bg-light rounded">
                      <p className="text-muted mb-1">Registered Date</p>

                      <h5>
                        {new Date(selectedUser.createdAt).toLocaleDateString(
                          "en-PK",
                        )}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;