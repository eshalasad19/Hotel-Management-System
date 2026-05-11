import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function RestaurantPage() {

  const [menu, setMenu] = useState([]);

  // 🔥 FETCH MENU FROM BACKEND
  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/menu");

      setMenu(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {/* HEADER */}
      <header id="header" className="sticky-top">
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3">
          <div className="container">
            <a className="navbar-brand fw-bold" href="#">
              The Mist
            </a>
          </div>
        </nav>
      </header>


      {/* HERO */}
      <section className="text-white text-center d-flex align-items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
          backgroundSize: "cover",
          minHeight: "90vh"
        }}
      >
        <div className="container">
          <h1 className="display-2 fw-bold">Luxury Restaurant</h1>
        </div>
      </section>


      {/* MENU SECTION (🔥 BACKEND CONNECTED) */}
      <section id="menu" className="py-5">
        <div className="container">

          <h2 className="text-center fw-bold mb-5">Restaurant Menu</h2>

          <div className="row g-4">

            {menu.length > 0 ? (
              menu.map((item) => (
                <div className="col-md-6" key={item._id}>
                  <div className="border rounded-4 p-4 shadow-sm h-100">

                    <div className="d-flex justify-content-between">
                      <h4>{item.name}</h4>
                      <span className="text-warning fw-bold">
                        Rs {item.price}
                      </span>
                    </div>

                    <p className="text-muted">{item.description}</p>

                    <span className="badge bg-dark">
                      {item.category}
                    </span>

                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">Loading menu...</p>
            )}

          </div>

        </div>
      </section>

    </>
  );
}