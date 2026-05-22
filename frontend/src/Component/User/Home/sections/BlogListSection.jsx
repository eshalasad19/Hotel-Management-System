import { Link } from "react-router-dom";

export default function BlogListSection({ blogs }) {
  return (
    <div className="row">
      {blogs.map((post) => (
        <div key={post.id} className="col-12 mb-4">

          <Link to={`/blog/${post._id || post.id}`}>
            <img src={post.image} className="img-fluid rounded-5" />
          </Link>

          <h3>
            <Link to={`/blog/${post._id || post.id}`}>
              {post.title}
            </Link>
          </h3>

        </div>
      ))}
    </div>
  );
}