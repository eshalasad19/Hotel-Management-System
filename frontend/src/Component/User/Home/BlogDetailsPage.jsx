import { useParams } from "react-router-dom";
import useBlog from "../../../hooks/useBlog";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const blog = useBlog(id);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container">

      <h1>{blog.title}</h1>

      <img src={blog.image} className="img-fluid rounded-5" />

      <p>{blog.content}</p>

    </div>
  );
}