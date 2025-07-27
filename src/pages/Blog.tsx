import { FullBlog } from "../components/FullBlog";
import { Loading } from "../components/Loading";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
export const Blog = () => {
  const { id } = useParams();

  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading || !blog) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
