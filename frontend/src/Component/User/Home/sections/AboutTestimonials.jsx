import { userAsset } from '../../../../utils/userAssets';

const testimonials = [
  {
    img: 'images/testimonial/client-sm-1.jpg',
    name: 'Dennis Jacques',
    country: 'From Australia',
    text: 'Easy to use, reasonably priced simply dummy text of the printing and typesetting industry. Quidam lisque persius interesset his et, in quot quidam possim iriure. Simply dummy text of the printing and typesetting industry.”',
  },
  {
    img: 'images/testimonial/client-sm-2.jpg',
    name: 'Patrick Cary',
    country: 'From USA',
    text: '“We hosted our anniversary celebration here, and it was simply perfect. The event team handled every detail flawlessly. Our guests are still talking about how beautiful everything was. It truly felt like a home away from home.”',
  },
  {
    img: 'images/testimonial/client-sm-3.jpg',
    name: 'Sarah Mitchell',
    country: 'From Spain',
    text: '“We traveled as a family and couldn’t have asked for a better place to stay. The staff was incredibly kind, the amenities were perfect for both adults and kids, and we felt right at home the entire time.”',
  },
  {
    img: 'images/testimonial/client-sm-4.jpg',
    name: 'Olivia Bennett',
    country: 'From United Kingdom',
    text: '“As a frequent business traveler, I appreciate efficiency and comfort — and this hotel delivers both flawlessly. Fast check-in, reliable Wi-Fi, and a peaceful atmosphere made my trip productive and stress-free.”',
  },
];

export default function AboutTestimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto text-center mb-5">
          <p className="wow fadeInUp">
            <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
              Our Testimonials
            </span>
          </p>
          <h2 className="heading-font-family text-13 fw-600 lh-sm wow fadeInUp" data-wow-delay=".2s">
            What Our <span className="text-primary">Client Says <br className="d-none d-md-block" />About</span> Hotel The Mist
          </h2>
        </div>

        <div className="swiper wow fadeInUp" data-loop="true" data-autoplay="true" data-margin="30" data-items-xs="1" data-items-sm="1" data-items-md="1" data-items-lg="2">
          <div className="swiper-wrapper">
            {testimonials.map((item) => (
              <div className="swiper-slide" key={item.name}>
                <div className="bg-white rounded-5 p-5">
                  <p className="lh-lg">{item.text}</p>
                  <div className="d-flex align-items-center gap-3">
                    <img className="rounded-circle w-auto" src={userAsset(item.img)} alt={item.name} />
                    <div>
                      <h3 className="text-4 fw-600 mb-1">{item.name}</h3>
                      <div className="text-3 fw-500 text-body-tertiary">{item.country}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="swiper-button-next mt-n5"><i className="fa-solid fa-angle-right"></i></div>
          <div className="swiper-button-prev mt-n5"><i className="fa-solid fa-angle-left"></i></div>
          <div className="swiper-pagination position-relative mt-4"></div>
        </div>

        <div className="fw-500 text-center mt-4 wow fadeInUp">
          View On <a href="#" className="fw-600 link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-0-hover">Tripadvisor</a>
        </div>
      </div>
    </section>
  );
}