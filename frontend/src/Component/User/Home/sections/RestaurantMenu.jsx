import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:5001";

/* IMAGE HELPER */
const getImageUrl = (img) => {
  if (!img) return "https://via.placeholder.com/70x70?text=Food";
  if (img.startsWith("http")) return img;
  return `${BASE_URL}/Uploads/${img}`;
};

/* TABS */
const TABS = [
  { key: "Desi", label: "Desi", icon: "fa-bowl-rice" },
  { key: "Italian", label: "Italian", icon: "fa-pizza-slice" },
  { key: "Chinese", label: "Chinese", icon: "fa-utensils" },
  { key: "Fast Food", label: "Fast Food", icon: "fa-burger" },
];

const RestaurantMenu = () => {

  /* STATES */
  const [menuData, setMenuData] = useState([]);
  const [activeTab, setActiveTab] = useState("Desi");
  const [loading, setLoading] = useState(true);

  const [guestName, setGuestName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  /* FETCH MENU */
  const fetchMenu = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/restaurant/menu`);
      const data = await res.json();
      setMenuData(data.data || []);
    } catch (err) {
      toast.error("Menu load error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  /* OPEN MODAL */
  const openOrderModal = (item) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      return;
    }

    setSelectedItem(item);
    setQuantity(1);
    setGuestName(user.name || "");
    setRoomNumber(user.roomNumber || "");
    setNotes("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  /* ⭐ PLACE ORDER (FIXED BACKEND CALL) */
  const placeOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        toast.error("Login required (No token found)");
        return;
      }

      const orderData = {
        guestName,
        roomNumber,
        item: selectedItem,
        quantity,
        notes,
        total: selectedItem.price * quantity,
      };

      const res = await fetch(`${BASE_URL}/api/restaurant/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Order failed");
      }

      toast.success("Order placed successfully!");
      closeModal();

    } catch (err) {
      toast.error(err.message);
    }
  };

  /* FILTER */
  const filteredMenu = menuData.filter((item) =>
    item.category?.replace(/\s/g, "").toLowerCase() ===
    activeTab.replace(/\s/g, "").toLowerCase()
  );

  return (
    <section className="section bg-light-1 py-5">
      <div className="container">

        {/* HEADER */}
        <h2 className="text-center mb-4">
          Restaurant <span className="text-primary">Menu</span>
        </h2>

        {/* TABS */}
        <div className="d-flex justify-content-center gap-2 mb-4">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`btn btn-sm ${activeTab === tab.key ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MENU CARDS */}
        <div className="row g-3">
          {filteredMenu.map((item) => (
            <div key={item._id} className="col-md-6">

              <div className="p-3 border rounded bg-white d-flex gap-3 h-100">

                <img
                  src={getImageUrl(item.image)}
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 10,
                    objectFit: "cover"
                  }}
                />

                <div className="flex-grow-1">

                  <div className="d-flex justify-content-between">
                    <b>{item.name}</b>
                    <span className="text-primary">Rs {item.price}</span>
                  </div>

                  {/* DESCRIPTION FIXED */}
                  <p className="small text-muted mb-1">
                    {item.description}
                  </p>

                

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

  {/* MODAL */}
{showModal && selectedItem && (
  <div 
    className="d-flex align-items-center justify-content-center p-3"
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(8px)",
      zIndex: 9999,
    }}
  >
    <div 
      className="bg-white rounded-4 shadow-xl border-0 overflow-hidden" 
      style={{ 
        width: "100%", 
        maxWidth: "480px", // Width thori barha di
        animation: "slideUp 0.25s ease-out" 
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center px-4 pt-3 pb-2 border-bottom">
        <h6 className="fw-bold mb-0" style={{ color: "#2d3748" }}>Place Order</h6>
        <button 
          className="btn-close bg-light p-2 rounded-circle" 
          onClick={closeModal}
          style={{ transform: "scale(0.75)" }}
        ></button>
      </div>

      <div className="p-4">
        {/* ROW-1: ITEM DETAILS & GUEST INPUTS SIDE BY SIDE */}
        <div className="row g-3 mb-3">
          {/* Left: Item Detail */}
          <div className="col-6 border-end pe-3">
            <div className="text-center bg-light p-2 rounded-3 h-100 d-flex flex-column justify-content-center align-items-center">
              <img
                src={getImageUrl(selectedItem.image)}
                alt={selectedItem.name}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 10,
                  objectFit: "cover"
                }}
              />
              <span className="fw-bold small text-dark text-truncate w-100 mt-2 mb-0">
                {selectedItem.name}
              </span>
              <span className="small fw-semibold text-primary">
                PKR {selectedItem.price}
              </span>
            </div>
          </div>

          {/* Right: Inputs */}
          <div className="col-6 ps-3 d-flex flex-column justify-content-between">
            <input
              className="form-control form-control-sm rounded-3 py-2"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Guest Name"
              style={{ fontSize: "0.85rem", borderColor: "#e2e8f0" }}
            />
            <input
              className="form-control form-control-sm rounded-3 py-2"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Room Number"
              style={{ fontSize: "0.85rem", borderColor: "#e2e8f0" }}
            />
          </div>
        </div>

        {/* ROW-2: QUANTITY & TOTAL IN ONE LINE */}
        <div className="row g-2 align-items-center mb-3">
          {/* Quantity */}
          <div className="col-6">
            <div className="d-flex align-items-center justify-content-between bg-light p-1.5 px-3 rounded-3" style={{ height: "42px" }}>
              <span className="small fw-semibold text-muted">Qty</span>
              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn btn-sm btn-white shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 26, height: 26, padding: 0 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="fw-bold small" style={{ minWidth: 16, textAlign: "center" }}>{quantity}</span>
                <button 
                  className="btn btn-sm btn-white shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 26, height: 26, padding: 0 }}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="col-6">
            <div className="d-flex align-items-center justify-content-between px-3 rounded-3 border" style={{ height: "42px", background: "#f8fafc", borderStyle: "dashed" }}>
              <span className="small fw-semibold text-secondary">Total:</span>
              <span className="fw-bold text-success" style={{ fontSize: "0.95rem" }}>
                PKR {selectedItem.price * quantity}
              </span>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div className="mb-3">
          <textarea
            className="form-control rounded-3"
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special Instructions (Optional)..."
            style={{ fontSize: "0.85rem", borderColor: "#e2e8f0", resize: "none" }}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="d-flex gap-2 pt-2 border-top">
          <button 
            className="btn btn-light w-50 py-2 rounded-3 fw-semibold text-secondary" 
            onClick={closeModal}
            style={{ fontSize: "0.9rem" }}
          >
            Cancel
          </button>
          <button 
            className="btn btn-success w-50 py-2 rounded-3 fw-semibold shadow-sm" 
            onClick={placeOrder}
            style={{ fontSize: "0.9rem", backgroundColor: "#10b981", border: "none" }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  </div>
)}{/* MODAL */}
{showModal && selectedItem && (
  <div 
    className="d-flex align-items-center justify-content-center p-3"
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(8px)",
      zIndex: 9999,
    }}
  >
    <div 
      className="bg-white rounded-4 shadow-xl border-0 overflow-hidden" 
      style={{ 
        width: "100%", 
        maxWidth: "480px", // Width thori barha di
        animation: "slideUp 0.25s ease-out" 
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center px-4 pt-3 pb-2 border-bottom">
        <h6 className="fw-bold mb-0" style={{ color: "#2d3748" }}>Place Order</h6>
        <button 
          className="btn-close bg-light p-2 rounded-circle" 
          onClick={closeModal}
          style={{ transform: "scale(0.75)" }}
        ></button>
      </div>

      <div className="p-4">
        {/* ROW-1: ITEM DETAILS & GUEST INPUTS SIDE BY SIDE */}
        <div className="row g-3 mb-3">
          {/* Left: Item Detail */}
          <div className="col-6 border-end pe-3">
            <div className="text-center bg-light p-2 rounded-3 h-100 d-flex flex-column justify-content-center align-items-center">
              <img
                src={getImageUrl(selectedItem.image)}
                alt={selectedItem.name}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 10,
                  objectFit: "cover"
                }}
              />
              <span className="fw-bold small text-dark text-truncate w-100 mt-2 mb-0">
                {selectedItem.name}
              </span>
              <span className="small fw-semibold text-primary">
                PKR {selectedItem.price}
              </span>
            </div>
          </div>

          {/* Right: Inputs */}
          <div className="col-6 ps-3 d-flex flex-column justify-content-between">
            <input
              className="form-control form-control-sm rounded-3 py-2"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Guest Name"
              style={{ fontSize: "0.85rem", borderColor: "#e2e8f0" }}
            />
            <input
              className="form-control form-control-sm rounded-3 py-2"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Room Number"
              style={{ fontSize: "0.85rem", borderColor: "#e2e8f0" }}
            />
          </div>
        </div>

        {/* ROW-2: QUANTITY & TOTAL IN ONE LINE */}
        <div className="row g-2 align-items-center mb-3">
          {/* Quantity */}
          <div className="col-6">
            <div className="d-flex align-items-center justify-content-between bg-light p-1.5 px-3 rounded-3" style={{ height: "42px" }}>
              <span className="small fw-semibold text-muted">Qty</span>
              <div className="d-flex align-items-center gap-2">
                <button 
                  className="btn btn-sm btn-white shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 26, height: 26, padding: 0 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="fw-bold small" style={{ minWidth: 16, textAlign: "center" }}>{quantity}</span>
                <button 
                  className="btn btn-sm btn-white shadow-sm border rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: 26, height: 26, padding: 0 }}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="col-6">
            <div className="d-flex align-items-center justify-content-between px-3 rounded-3 border" style={{ height: "42px", background: "#f8fafc", borderStyle: "dashed" }}>
              <span className="small fw-semibold text-secondary">Total:</span>
              <span className="fw-bold text-success" style={{ fontSize: "0.95rem" }}>
                PKR {selectedItem.price * quantity}
              </span>
            </div>
          </div>
        </div>

        {/* NOTES */}
        <div className="mb-3">
          <textarea
            className="form-control rounded-3"
            rows="2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special Instructions (Optional)..."
            style={{ fontSize: "0.85rem", borderColor: "#e2e8f0", resize: "none" }}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="d-flex gap-2 pt-2 border-top">
          <button 
            className="btn btn-light w-50 py-2 rounded-3 fw-semibold text-secondary" 
            onClick={closeModal}
            style={{ fontSize: "0.9rem" }}
          >
            Cancel
          </button>
          <button 
            className="btn btn-success w-50 py-2 rounded-3 fw-semibold shadow-sm" 
            onClick={placeOrder}
            style={{ fontSize: "0.9rem", backgroundColor: "#10b981", border: "none" }}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  );
};

export default RestaurantMenu;