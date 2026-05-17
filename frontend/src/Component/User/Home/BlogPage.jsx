import { Link } from "react-router-dom";
import { blogs } from "./BlogsData"; 

export default function BlogPage() {
  return (
    <div className="container">
      <div className="row">

        {blogs.map((post) => (
          <div key={post.id} className="col-12 mb-4">

            {/* IMAGE */}
            <Link to={`/blog/${post._id || post.id}`} className="d-flex rounded-5 overflow-hidden">
              <img className="card-img-top rounded-5" src={post.image} alt="" />
            </Link>

            {/* TITLE */}
            <h3 className="title-blog text-7 lh-sm mb-2">
              <Link to={`/blog/${post._id || post.id}`} className="text-7">
                {post.title}
              </Link>
            </h3>

            {/* BUTTON */}
            <Link to={`/blog/${post._id || post.id}`} className="btn btn-new btn-primary rounded-pill">
              Read more
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
}