import React, { useState, useEffect } from 'react';

const RestaurantMenu = () => {
  // 1. Shuru me menu array ko khali [] rakhenge
  const [menuData, setMenuData] = useState([]);
  const [activeTab, setActiveTab] = useState('starters');
  const [loading, setLoading] = useState(true); // Loading state dikhane ke liye

  // 2. Database/Backend API se data fetch karne ke liye useEffect
  useEffect(() => {
    // Apni API ka URL yahan dalein (e.g., '/api/menu')
    fetch('YOUR_BACKEND_API_URL_HERE') 
      .then((response) => response.json())
      .then((data) => {
        setMenuData(data); // Database se aaya hua data state me save ho jayega
        setLoading(false); // Loading khatam
      })
      .catch((error) => {
        console.error("Data fetch karne me error aaya:", error);
        setLoading(false);
      });
  }, []); // [] ka matlab ye page load hote hi sirf ek baar chalega

  // 3. Filtered data nikalna
  const filteredMenu = menuData.filter(item => item.category === activeTab);

  if (loading) {
    return <div className="text-center my-5">Menu load ho raha hai...</div>;
  }

  return (
    <section className="section bg-light-1">
      <div className="container">
        <div className="mx-auto text-center mb-5">
          <p className="wow fadeInUp">
            <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
              Meal options
            </span>
          </p>
          <h2 className="heading-font-family text-13 fw-600 lh-sm wow fadeInUp" data-wow-delay=".2s">
            Restaurant <span className="text-primary">Menu</span>
          </h2>
        </div>
        
        {/* Navigation Tabs */}
        <ul id="menuTab" role="tablist" className="nav nav-pills gap-3 fw-600 justify-content-center mb-5 wow fadeInUp">
          <li className="nav-item"> 
            <button className={`nav-link rounded-pill ${activeTab === 'starters' ? 'active' : ''}`} onClick={() => setActiveTab('starters')}>Starters</button> 
          </li>
          <li className="nav-item"> 
            <button className={`nav-link rounded-pill ${activeTab === 'main-courses' ? 'active' : ''}`} onClick={() => setActiveTab('main-courses')}>Main Courses</button> 
          </li>
          <li className="nav-item"> 
            <button className={`nav-link rounded-pill ${activeTab === 'desserts' ? 'active' : ''}`} onClick={() => setActiveTab('desserts')}>Desserts</button> 
          </li>
        </ul>
        
        {/* Dynamic Tab Content */}
        <div id="menuTabContent" className="tab-content my-3 wow fadeInUp">
          <div className="tab-pane fade show active">
            <div className="row gy-4 gx-5">
              
              {filteredMenu.length === 0 ? (
                <div className="text-center col-12">Is category me koi item nahi hai.</div>
              ) : (
                filteredMenu.map((item) => (
                  <div className="col-md-6" key={item._id || item.id}> {/* Database ki ID handle karne ke liye */}
                    <div className="d-flex justify-content-between gap-2">
                      <div className="text-5 fw-600">{item.title}</div>
                      <div className="line flex-grow-1"><hr /></div>
                      <div className="text-5 fw-600">${item.price}</div>
                    </div>
                    <p className="text-3 text-body-tertiary mb-0">{item.description}</p>
                  </div>
                ))
              )}

            </div>
          </div>
        </div>

        <div className="text-center mt-5 wow fadeInUp">
          <a className="btn btn-new btn-primary rounded-pill" href="#">
            <span className="btn-text"><span>View Full Menu</span></span>
            <span className="btn-icon"><i className="fa-solid fa-arrow-right"></i></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default RestaurantMenu;