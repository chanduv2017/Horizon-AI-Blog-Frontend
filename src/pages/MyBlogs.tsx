import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Badge } from "../components/ui/Badge";
import { Loading } from "../components/Loading";

// API Placeholder - Replace with actual API call
const fetchUserBlogs = async () => {
  // Simulated API response
  return [
    {
      id: "blog1",
      title: "The Future of Web Development",
      content:
        "Exploring the latest trends and technologies that are shaping the future of web development. From AI integration to new frameworks, the landscape is evolving rapidly.",
      status: "published",
      createdAt: "2024-01-20T10:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
      views: 1250,
      likes: 89,
      comments: 23,
    },
    {
      id: "blog2",
      title: "Mastering React Hooks",
      content:
        "A comprehensive guide to understanding and implementing React Hooks in your applications. Learn the best practices and common patterns.",
      status: "published",
      createdAt: "2024-01-15T14:30:00Z",
      updatedAt: "2024-01-16T09:15:00Z",
      views: 890,
      likes: 67,
      comments: 15,
    },
    {
      id: "blog3",
      title: "Building Scalable APIs",
      content:
        "Learn how to design and build APIs that can handle growth and scale with your application needs. Best practices and real-world examples.",
      status: "draft",
      createdAt: "2024-01-22T16:45:00Z",
      updatedAt: "2024-01-22T16:45:00Z",
      views: 0,
      likes: 0,
      comments: 0,
    },
  ];
};

export const MyBlogs = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await fetchUserBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === "all") return true;
    return blog.status === filter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <Loading />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Blogs</h1>
              <p className="text-slate-600 mt-1">
                Manage and track your published stories
              </p>
            </div>
            <Link to="/publish">
              <Button>Write New Story</Button>
            </Link>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              All ({blogs.length})
            </Button>
            <Button
              variant={filter === "published" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setFilter("published")}
            >
              Published ({blogs.filter((b) => b.status === "published").length})
            </Button>
            <Button
              variant={filter === "draft" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setFilter("draft")}
            >
              Drafts ({blogs.filter((b) => b.status === "draft").length})
            </Button>
          </div>

          {/* Blog List */}
          <div className="space-y-4">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <Card key={blog.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-semibold text-slate-900 hover:text-slate-700">
                            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                          </h2>
                          <Badge
                            variant={
                              blog.status === "published"
                                ? "success"
                                : "warning"
                            }
                            size="sm"
                          >
                            {blog.status}
                          </Badge>
                        </div>

                        <p className="text-slate-600 line-clamp-2 mb-3">
                          {blog.content.substring(0, 150)}...
                        </p>

                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>Created {formatDate(blog.createdAt)}</span>
                          {blog.updatedAt !== blog.createdAt && (
                            <span>Updated {formatDate(blog.updatedAt)}</span>
                          )}
                          {blog.status === "published" && (
                            <>
                              <span>{blog.views} views</span>
                              <span>{blog.likes} likes</span>
                              <span>{blog.comments} comments</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link to={`/edit-blog/${blog.id}`}>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </Link>
                        {blog.status === "published" && (
                          <Link to={`/blog/${blog.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-medium text-slate-900 mb-2">
                    {filter === "all" ? "No blogs yet" : `No ${filter} blogs`}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {filter === "all"
                      ? "Start writing your first story!"
                      : `You don't have any ${filter} blogs yet.`}
                  </p>
                  <Link to="/publish">
                    <Button>Write Your First Story</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
};
