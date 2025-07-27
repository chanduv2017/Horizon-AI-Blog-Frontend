import { Blog } from "../hooks";
import Header from "./Header";
import { Avatar } from "./Avatar";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const readTime = Math.ceil(blog.content.length / 200);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <article>
            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                {blog.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <Avatar name={blog.User?.name || "Anonymous"} size="small" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <span className="font-medium text-slate-900">
                      {blog.User?.name || "Anonymous"}
                    </span>
                    <span>•</span>
                    <span>{formatDate(blog.createdAt)}</span>
                    <span>•</span>
                    <Badge variant="secondary" size="sm">
                      {readTime} min read
                    </Badge>
                  </div>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="prose prose-slate max-w-none p-8">
                    <div className="text-lg leading-relaxed text-slate-700 whitespace-pre-wrap">
                      {blog.content}
                    </div>
                  </CardContent>
                </Card>

                {/* Engagement Section */}
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          👏 Like
                        </Button>
                        <Button variant="ghost" size="sm">
                          💬 Comment
                        </Button>
                        <Button variant="ghost" size="sm">
                          🔗 Share
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        Follow Author
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Author Card */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        About the Author
                      </h3>
                      <div className="flex items-start gap-3">
                        <Avatar
                          name={blog.User?.name || "Anonymous"}
                          size="small"
                        />
                        <div>
                          <h4 className="font-semibold text-slate-900">
                            {blog.User?.name || "Anonymous"}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            Passionate writer sharing insights about technology,
                            development, and the future of digital innovation.
                          </p>
                          <Button variant="outline" size="sm" className="mt-3">
                            Follow
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Articles */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        More from {blog.User?.name || "Anonymous"}
                      </h3>
                      <div className="space-y-4">
                        <div className="border-b border-slate-200 pb-3">
                          <h4 className="font-medium text-slate-900 text-sm mb-1">
                            Mastering React Hooks
                          </h4>
                          <p className="text-xs text-slate-600">
                            A comprehensive guide to React Hooks
                          </p>
                        </div>
                        <div className="border-b border-slate-200 pb-3">
                          <h4 className="font-medium text-slate-900 text-sm mb-1">
                            Building Scalable APIs
                          </h4>
                          <p className="text-xs text-slate-600">
                            Best practices for API development
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 text-sm mb-1">
                            Modern CSS Techniques
                          </h4>
                          <p className="text-xs text-slate-600">
                            Advanced styling with modern CSS
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Container>
    </div>
  );
};
