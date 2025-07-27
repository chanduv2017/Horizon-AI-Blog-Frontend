import Header from "../components/Header";
import { BlogCard } from "../components/BlogCard";
import { Loading } from "../components/Loading";
import { useBlogs } from "../hooks";
import { Container } from "../components/ui/Container";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <Container className="py-8">
          <div className="max-w-2xl mx-auto">
            <Loading />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Container className="py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Latest Stories
            </h1>
            <p className="text-slate-600">
              Discover stories, thinking, and expertise from writers on any
              topic.
            </p>
          </div>

          <div className="space-y-6">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <BlogCard
                  key={blog.post_id}
                  post_id={blog.post_id}
                  User={blog.User?.name || "Anonymous"}
                  title={blog.title}
                  content={blog.content}
                  CreatedAt={blog.createdAt}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No stories yet
                </h3>
                <p className="text-slate-600">
                  Be the first to share your story!
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
