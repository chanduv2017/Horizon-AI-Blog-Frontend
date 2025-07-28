import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Container } from "../components/ui/Container";
import { Badge } from "../components/ui/Badge";

// API Placeholder - Replace with actual API calls
const fetchBlogById = async (id: string) => {
  // Simulated API response
  return {
    id,
    title: "The Future of Web Development",
    content:
      "Exploring the latest trends and technologies that are shaping the future of web development. From AI integration to new frameworks, the landscape is evolving rapidly.\n\nIn this comprehensive guide, we'll dive deep into the emerging technologies that are revolutionizing how we build web applications. We'll explore topics such as:\n\n1. AI-powered development tools\n2. Next-generation frameworks\n3. WebAssembly and its impact\n4. Progressive Web Apps evolution\n5. The rise of edge computing\n\nEach of these areas represents a significant shift in how we approach web development, and understanding them is crucial for staying ahead in this rapidly evolving field.",
    status: "published",
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    tags: ["web-development", "technology", "future", "ai"],
  };
};

const updateBlog = async (id: string, data: any) => {
  // Simulated API call
  console.log("Updating blog:", id, data);
  return { success: true, id };
};

const deleteBlog = async (id: string) => {
  // Simulated API call
  console.log("Deleting blog:", id);
  return { success: true };
};

export const EditBlog = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const loadBlog = async () => {
      if (!id) {
        navigate("/my-blogs");
        return;
      }

      try {
        const data = await fetchBlogById(id);
        setBlog(data);
        setTitle(data.title);
        setContent(data.content);
        setStatus(data.status);
        setTags(data.tags?.join(", ") || "");
      } catch (error) {
        console.error("Failed to load blog:", error);
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id, navigate]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Please fill in both title and content");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateBlog(id!, {
        title,
        content,
        status,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      navigate("/my-blogs");
    } catch (error) {
      setError("Failed to save blog. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(id!);
      navigate("/my-blogs");
    } catch (error) {
      setError("Failed to delete blog. Please try again.");
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        </Container>
      </Layout>
    );
  }

  if (!blog) {
    return (
      <Layout>
        <Container>
          <Card>
            <CardContent className="text-center py-12">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Blog not found
              </h2>
              <p className="text-slate-600 mb-4">
                The blog you're looking for doesn't exist.
              </p>
              <Button onClick={() => navigate("/my-blogs")}>
                Back to My Blogs
              </Button>
            </CardContent>
          </Card>
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
              <h1 className="text-3xl font-bold text-slate-900">Edit Story</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-slate-600">
                  Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
                </p>
                <Badge
                  variant={status === "published" ? "success" : "warning"}
                  size="sm"
                >
                  {status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate("/my-blogs")}>
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete
              </Button>
            </div>
          </div>

          {/* Edit Form */}
          <Card>
            <CardContent className="space-y-6">
              <Input
                label="Title"
                placeholder="Enter your story title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-semibold"
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Content
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your story content..."
                  className="w-full min-h-[400px] p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <Input
                label="Tags"
                placeholder="web-development, technology, ai (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={status === "draft" ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setStatus("draft")}
                  >
                    Save as Draft
                  </Button>
                  <Button
                    variant={status === "published" ? "primary" : "outline"}
                    size="sm"
                    onClick={() => setStatus("published")}
                  >
                    Publish
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={handleSave} isLoading={saving}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-md mx-4">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Delete Blog Post
                </h3>
                <p className="text-slate-600 mb-4">
                  Are you sure you want to delete &quot;{title}&quot;? This
                  action cannot be undone.
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleDelete}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Container>
    </Layout>
  );
};
