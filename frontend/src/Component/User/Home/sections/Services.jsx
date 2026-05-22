import { userAsset } from '../../../../utils/userAssets';

const services = [
  {
    image: 'images/restaurant/restaurant-about.jpg',
    tag: 'Meal With Us',
    title: 'The Restaurant',
    text: 'The Mist introduces guests to a memorable experience in dining out, fast becoming a preferred choice in dining out, The Mist offers a choice of dining options available to our guests with a zest for the good life.',
    link: '/restaurant',
    imageFirst: true,
  },
  {
    image: 'images/banquets/banquets.jpg',
    tag: 'We Find Happiness',
    title: 'Banquet Hall',
    text: 'The Mist offers a choice of banqueting venues, with extensive facilities for wedding functions, social gatherings, parties, conferences, and seminars to suit all needs. From booking inquiries to the finale.',
    link: '/banquets',
    imageFirst: false,
  },
  {
    image: 'images/spa/spa.jpg',
    tag: 'Stay in great shape',
    title: 'Spa',
    text: 'Welcome to holistic rejuvenation through relaxing regimens with our natural range of treatments. Each spa experience is customised to recharge and refresh you both physically and mentally and to bring out your inner radiance.',
    link: '/spa',
    imageFirst: true,
  },
];

export default function Services() {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto text-center mb-5">
          <p className="wow fadeInUp">
            <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
              Services
            </span>
          </p>
          <h2 className="heading-font-family text-13 fw-600 lh-sm wow fadeInUp" data-wow-delay=".2s">
            We provide <span className="text-primary">Top Class <br className="d-none d-md-block" />Facility</span> for
            You
          </h2>
        </div>

        {services.map((item, index) => (
          <div
            key={item.title}
            className={`row gx-5 gy-4 gy-lg-5 ${index < services.length - 1 ? 'mb-5' : ''}`}
          >
            <div
              className={`col-lg-6 text-center wow fadeInLeft ${item.imageFirst ? '' : 'order-1 order-lg-2 wow fadeInRight'}`}
            >
              <img className="img-fluid rounded-5" src={userAsset(item.image)} alt={item.title} />
            </div>
            <div
              className={`col-lg-6 align-content-center wow fadeInRight ${item.imageFirst ? 'wow fadeInRight' : 'order-2 order-lg-1 wow fadeInLeft'}`}
            >
              <p>
                <span className="d-inline-flex text-2 text-uppercase fw-500 rounded-pill border border-dark border-opacity-10 px-3">
                  {item.tag}
                </span>
              </p>
              <h3 className="heading-font-family text-8 fw-600 mb-3">{item.title}</h3>
              <p className="text-3 text-body-secondary">{item.text}</p>
              <a className="btn btn-new btn-primary rounded-pill" href={item.link}>
                <span className="btn-text">
                  <span>Read More</span>
                </span>
                <span className="btn-icon">
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
