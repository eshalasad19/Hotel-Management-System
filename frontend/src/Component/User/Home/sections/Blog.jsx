import { userAsset } from '../../../../utils/userAssets';

const posts = [
  {
    image: 'images/blog/post-1.jpg',
    category: 'Event',
    date: '27 Nov 2025',
    title: 'Recap of Recent Events Hosted at Our Hotel',
    excerpt: 'Step inside the highlights of the unforgettable moments recently...',
    delay: undefined,
  },
  {
    image: 'images/blog/post-2.jpg',
    category: 'Restaurant',
    date: '14 Oct 2025',
    title: 'Meet Our Chef: Culinary Inspiration Stories',
    excerpt: 'Discover the passion, creativity, and flavors behind our kitchen...',
    delay: '.2s',
  },
  {
    image: 'images/blog/post-3.jpg',
    category: 'Travel',
    date: '15 Jul 2025',
    title: 'Business Travel Tips for a Productive Stay',
    excerpt: 'Make the most of every work trip with our expert tips designed..',
    delay: '.4s',
  },
];

export default function Blog() {
  return (
    <section className="section bg-light-1">
      <div className="container">
        <div className="mx-auto text-center mb-5">
          <p className="wow fadeInUp">
            <span className="text-3 text-uppercase fw-600 rounded-pill border border-dark border-opacity-10 px-3 py-1">
              News & Events
            </span>
          </p>
          <h2 className="heading-font-family text-13 fw-600 lh-sm wow fadeInUp" data-wow-delay=".2s">
            Explore Our <span className="text-primary">Latest <br className="d-none d-md-block" />News</span> and Events
          </h2>
        </div>

        <div className="row justify-content-center g-4">
          {posts.map((post) => (
            <div key={post.title} className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay={post.delay}>
              <div className="blog-post card h-100 rounded-5 shadow-none border-0">
                <a className="d-flex rounded-5 overflow-hidden" href="/blog-single-post">
                  <img className="card-img-top rounded-5" src={userAsset(post.image)} alt={post.title} />
                  <div className="position-absolute top-0 start-0 text-2 fw-600 bg-primary text-light rounded-pill px-2 py-0 mt-4 ms-4">
                    {post.category}
                  </div>
                </a>
                <div className="card-body p-4">
                  <ul className="meta-blog text-2 mb-2">
                    <li>
                      <i className="fa-solid fa-calendar-alt" /> {post.date}
                    </li>
                    <li>
                      <a href="/blog">
                        <i className="fa-solid fa-user" /> Admin
                      </a>
                    </li>
                  </ul>
                  <h3 className="title-blog text-6 lh-sm mb-2">
                    <a className="text-6" href="/blog-single-post">
                      {post.title}
                    </a>
                  </h3>
                  <p className="text-3 text-body-secondary mb-1">{post.excerpt}</p>
                  <a
                    href="/blog-single-post"
                    className="text-3 fw-600 link-primary link-offset-2 link-underline-opacity-100 link-underline-opacity-0-hover"
                  >
                    Read more
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5 wow fadeInUp">
          <a className="btn btn-new btn-primary rounded-pill" href="/blog">
            <span className="btn-text">
              <span>View all News</span>
            </span>
            <span className="btn-icon">
              <i className="fa-solid fa-arrow-right" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
