import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../../../Context/AuthContext";

const BASE_URL = "http://localhost:5001";

const getImageUrl = (img) => {
  if (!img) return "https://via.placeholder.com/70x70?text=Food";
  if (img.startsWith("http")) return img;
  return `${BASE_URL}/Uploads/${img}`;
};

const TABS = [
  { key: "Desi",      label: "Desi",      icon: "fa-bowl-rice"    },
  { key: "Italian",   label: "Italian",   icon: "fa-pizza-slice"  },
  { key: "Chinese",   label: "Chinese",   icon: "fa-utensils"     },
  { key: "Fast Food", label: "Fast Food", icon: "fa-burger"       },
];

// ✅ Dietary tag config
const DIETARY_CONFIG = {
  spicy:     { label: "Spicy",    icon: "fa-fire",         color: "#e74c3c", bg: "rgba(231,76,60,0.1)"    },
  veg:       { label: "Veg",      icon: "fa-leaf",         color: "#27ae60", bg: "rgba(39,174,96,0.1)"    },
  "non-veg": { label: "Non-Veg",  icon: "fa-drumstick-bite", color: "#e67e22", bg: "rgba(230,126,34,0.1)" },
  halal:     { label: "Halal",    icon: "fa-star-and-crescent", color: "#2980b9", bg: "rgba(41,128,185,0.1)" },
};

const STYLES = `
  .menu-section {
    background: #f5f0eb;
    min-height: 80vh;
    padding: 48px 0;
    font-family: 'Jost', sans-serif;
  }

  .menu-title {
    font-size: 38px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 6px;
  }

  .menu-title span { color: #c9a96e; }

  .menu-subtitle {
    font-size: 13px;
    color: #aaa;
    letter-spacing: 0.5px;
  }

  /* TABS */
  .menu-tabs {
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 36px;
  }

  .menu-tab-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 9px 22px;
    border-radius: 50px;
    border: 1px solid #e0d5c8;
    background: #fff;
    color: #888;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Jost', sans-serif;
  }

  .menu-tab-btn:hover {
    border-color: #c9a96e;
    color: #c9a96e;
  }

  .menu-tab-btn.active {
    background: linear-gradient(135deg, #c9a96e, #a67c45);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 4px 14px rgba(201,169,110,0.35);
  }

  /* CARDS */
  .menu-card {
    background: #fff;
    border: 1px solid #ede5d8;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    gap: 14px;
    height: 100%;
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .menu-card:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,0.08);
    transform: translateY(-2px);
  }

  .menu-card-img {
    width: 80px;
    height: 80px;
    border-radius: 12px;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid #f0e8dc;
  }

  .menu-card-body { flex: 1; }

  .menu-card-name {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 4px;
  }

  .menu-card-desc {
    font-size: 12px;
    color: #aaa;
    margin-bottom: 10px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .menu-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }

  .menu-card-price {
    font-size: 16px;
    font-weight: 700;
    color: #c9a96e;
  }

  .menu-dietary-tags {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  .menu-dietary-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 9px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .menu-unavailable-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
    background: rgba(231,76,60,0.1);
    color: #e74c3c;
  }

  .menu-order-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 16px;
    border-radius: 50px;
    border: none;
    background: linear-gradient(135deg, #c9a96e, #a67c45);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Jost', sans-serif;
    box-shadow: 0 3px 10px rgba(201,169,110,0.3);
  }

  .menu-order-btn:hover {
    box-shadow: 0 5px 16px rgba(201,169,110,0.5);
    transform: translateY(-1px);
  }

  .menu-order-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* MODAL */
  .menu-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(8px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    animation: fadeIn 0.2s ease;
  }

  .menu-modal {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 460px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }

  .menu-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 24px;
    border-bottom: 1px solid #f0e8dc;
    background: #fdf8f2;
  }

  .menu-modal-title {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0;
  }

  .menu-modal-close {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid #e0d5c8;
    background: #fff;
    color: #888;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s;
    line-height: 1;
  }

  .menu-modal-close:hover {
    background: #c9a96e;
    color: #fff;
    border-color: #c9a96e;
  }

  .menu-modal-body { padding: 20px 24px; }

  .menu-modal-item {
    display: flex;
    gap: 14px;
    align-items: center;
    background: #fdf8f2;
    border: 1px solid #f0e8dc;
    border-radius: 12px;
    padding: 14px;
    margin-bottom: 16px;
  }

  .menu-modal-item img {
    width: 60px;
    height: 60px;
    border-radius: 10px;
    object-fit: cover;
  }

  .menu-modal-item-name {
    font-size: 14px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 2px;
  }

  .menu-modal-item-price {
    font-size: 14px;
    font-weight: 700;
    color: #c9a96e;
  }

  .menu-modal-input {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #ede5d8;
    border-radius: 50px;
    font-size: 13px;
    color: #333;
    background: #fdf8f2;
    outline: none;
    transition: border 0.2s, box-shadow 0.2s;
    font-family: 'Jost', sans-serif;
    margin-bottom: 10px;
  }

  .menu-modal-input:focus {
    border-color: #c9a96e;
    box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
    background: #fff;
  }

  .menu-modal-textarea {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #ede5d8;
    border-radius: 14px;
    font-size: 13px;
    color: #333;
    background: #fdf8f2;
    outline: none;
    resize: none;
    font-family: 'Jost', sans-serif;
    transition: border 0.2s;
    margin-bottom: 10px;
  }

  .menu-modal-textarea:focus {
    border-color: #c9a96e;
    box-shadow: 0 0 0 3px rgba(201,169,110,0.12);
    background: #fff;
  }

  .menu-qty-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fdf8f2;
    border: 1px solid #f0e8dc;
    border-radius: 12px;
    padding: 10px 16px;
    margin-bottom: 10px;
  }

  .menu-qty-label {
    font-size: 12px;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .menu-qty-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .menu-qty-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #e0d5c8;
    background: #fff;
    color: #333;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    line-height: 1;
  }

  .menu-qty-btn:hover {
    background: #c9a96e;
    color: #fff;
    border-color: #c9a96e;
  }

  .menu-qty-num {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a1a;
    min-width: 20px;
    text-align: center;
  }

  .menu-total-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fdf8f2;
    border: 1px dashed #e0d5c8;
    border-radius: 12px;
    padding: 10px 16px;
    margin-bottom: 16px;
  }

  .menu-total-label {
    font-size: 12px;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .menu-total-amount {
    font-size: 16px;
    font-weight: 700;
    color: #27ae60;
  }

  .menu-modal-footer {
    display: flex;
    gap: 10px;
    padding: 16px 24px;
    border-top: 1px solid #f0e8dc;
    background: #fdf8f2;
  }

  .menu-modal-cancel {
    flex: 1;
    padding: 10px;
    border-radius: 50px;
    border: 1px solid #e0d5c8;
    background: #fff;
    color: #888;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Jost', sans-serif;
  }

  .menu-modal-cancel:hover {
    border-color: #aaa;
    color: #444;
  }

  .menu-modal-confirm {
    flex: 1;
    padding: 10px;
    border-radius: 50px;
    border: none;
    background: linear-gradient(135deg, #c9a96e, #a67c45);
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    font-family: 'Jost', sans-serif;
    box-shadow: 0 4px 14px rgba(201,169,110,0.35);
  }

  .menu-modal-confirm:hover {
    box-shadow: 0 6px 20px rgba(201,169,110,0.5);
  }

  .menu-empty {
    text-align: center;
    padding: 60px 24px;
    color: #bbb;
  }

  @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px) }
    to   { opacity: 1; transform: translateY(0) }
  }
`;

const RestaurantMenu = () => {

  const { user, token } = useAuth();

  const [menuData, setMenuData]       = useState([]);
  const [activeTab, setActiveTab]     = useState("Desi");
  const [loading, setLoading]         = useState(true);
  const [guestName, setGuestName]     = useState("");
  const [roomNumber, setRoomNumber]   = useState("");
  const [notes, setNotes]             = useState("");
  const [quantity, setQuantity]       = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal]     = useState(false);

  useEffect(() => {
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
    fetchMenu();
  }, []);

  const openOrderModal = (item) => {
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

  const placeOrder = async () => {
    try {
      if (!token) {
        toast.error("Login required");
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
      if (!res.ok) throw new Error(data.message || "Order failed");

      toast.success("Order placed successfully!");
      closeModal();

    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredMenu = menuData.filter((item) =>
    item.category?.replace(/\s/g, "").toLowerCase() ===
    activeTab.replace(/\s/g, "").toLowerCase()
  );

  return (
    <>
      <style>{STYLES}</style>
      <section className="menu-section">
        <div className="container">

          {/* HEADER */}
          <div className="text-center mb-4">
            <h2 className="menu-title">Our <span>Restaurant</span></h2>
            <p className="menu-subtitle">Fresh ingredients, authentic flavors</p>
          </div>

          {/* TABS */}
          <div className="menu-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`menu-tab-btn ${activeTab === tab.key ? "active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                <i className={`fa-solid ${tab.icon}`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* MENU CARDS */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "#c9a96e" }}></div>
              <p className="mt-3" style={{ color: "#bbb", fontSize: "13px" }}>Loading menu...</p>
            </div>
          ) : filteredMenu.length === 0 ? (
            <div className="menu-empty">
              <i className="fa-solid fa-utensils fa-3x mb-3" style={{ color: "#e0d5c8" }}></i>
              <p>No items in this category</p>
            </div>
          ) : (
            <div className="row g-3">
              {filteredMenu.map((item) => (
                <div key={item._id} className="col-md-6 col-lg-4">
                  <div className="menu-card">

                    <img
                      className="menu-card-img"
                      src={getImageUrl(item.image)}
                      alt={item.name}
                    />

                    <div className="menu-card-body">

                      <div className="menu-card-name">{item.name}</div>
                      <div className="menu-card-desc">{item.description}</div>

                      {/* ✅ DIETARY TAGS */}
                      {item.dietaryTags?.length > 0 && (
                        <div className="menu-dietary-tags">
                          {item.dietaryTags.map((tag) => {
                            const config = DIETARY_CONFIG[tag];
                            if (!config) return null;
                            return (
                              <span
                                key={tag}
                                className="menu-dietary-tag"
                                style={{ color: config.color, background: config.bg }}
                              >
                                <i className={`fa-solid ${config.icon}`} style={{ fontSize: "9px" }}></i>
                                {config.label}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      <div className="menu-card-footer">
                        <div className="menu-card-price">Rs {item.price}</div>

                        {!item.isAvailable ? (
                          <span className="menu-unavailable-badge">
                            <i className="fa-solid fa-clock" style={{ fontSize: "9px" }}></i>
                            Unavailable
                          </span>
                        ) : (
                          <button
                            className="menu-order-btn"
                            onClick={() => openOrderModal(item)}
                          >
                            <i className="fa-solid fa-plus" style={{ fontSize: "10px" }}></i>
                            Order
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* ✅ MODAL — sirf ek baar */}
        {showModal && selectedItem && (
          <div className="menu-modal-backdrop" onClick={closeModal}>
            <div className="menu-modal" onClick={(e) => e.stopPropagation()}>

              {/* HEADER */}
              <div className="menu-modal-header">
                <h6 className="menu-modal-title">
                  <i className="fa-solid fa-bag-shopping me-2" style={{ color: "#c9a96e" }}></i>
                  Place Order
                </h6>
                <button className="menu-modal-close" onClick={closeModal}>×</button>
              </div>

              <div className="menu-modal-body">

                {/* ITEM INFO */}
                <div className="menu-modal-item">
                  <img src={getImageUrl(selectedItem.image)} alt={selectedItem.name} />
                  <div>
                    <div className="menu-modal-item-name">{selectedItem.name}</div>
                    <div className="menu-modal-item-price">Rs {selectedItem.price} / item</div>
                    {/* ✅ Tags in modal too */}
                    {selectedItem.dietaryTags?.length > 0 && (
                      <div className="menu-dietary-tags mt-1">
                        {selectedItem.dietaryTags.map((tag) => {
                          const config = DIETARY_CONFIG[tag];
                          if (!config) return null;
                          return (
                            <span
                              key={tag}
                              className="menu-dietary-tag"
                              style={{ color: config.color, background: config.bg }}
                            >
                              <i className={`fa-solid ${config.icon}`} style={{ fontSize: "9px" }}></i>
                              {config.label}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* INPUTS */}
                <input
                  className="menu-modal-input"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Guest Name"
                />
                <input
                  className="menu-modal-input"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  placeholder="Room Number"
                />

                {/* QUANTITY */}
                <div className="menu-qty-row">
                  <span className="menu-qty-label">Quantity</span>
                  <div className="menu-qty-controls">
                    <button
                      className="menu-qty-btn"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >−</button>
                    <span className="menu-qty-num">{quantity}</span>
                    <button
                      className="menu-qty-btn"
                      onClick={() => setQuantity(quantity + 1)}
                    >+</button>
                  </div>
                </div>

                {/* TOTAL */}
                <div className="menu-total-row">
                  <span className="menu-total-label">Total Amount</span>
                  <span className="menu-total-amount">
                    Rs {selectedItem.price * quantity}
                  </span>
                </div>

                {/* NOTES */}
                <textarea
                  className="menu-modal-textarea"
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special instructions (optional)..."
                />

              </div>

              {/* FOOTER */}
              <div className="menu-modal-footer">
                <button className="menu-modal-cancel" onClick={closeModal}>Cancel</button>
                <button className="menu-modal-confirm" onClick={placeOrder}>
                  <i className="fa-solid fa-check me-2"></i>
                  Confirm Order
                </button>
              </div>

            </div>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={2000} />
      </section>
    </>
  );
};

export default RestaurantMenu;