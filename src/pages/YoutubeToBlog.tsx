import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/simple-image";
import Layout from "../layouts/Layout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";

export const YoutubeToBlog = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [generatedBlog, setGeneratedBlog] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const editorRef = useRef<EditorJS | null>(null);

  const validateYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const handleGenerateBlog = async () => {
    if (!youtubeUrl.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!validateYouTubeUrl(youtubeUrl)) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      // API call placeholder - replace with actual API endpoint
      const response = await fetch("/api/youtube-to-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ youtubeUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate blog");
      }

      const data = await response.json();
      setTitle(data.title || "Generated Blog Post");
      const editorData = {
        time: Date.now(),
        blocks: data.blocks || [
          {
            type: "paragraph",
            data: {
              text: "Blog content will be generated here...",
            },
          },
        ],
        version: "2.28.2",
      };
      setGeneratedBlog(editorData);
      // Initialize editor after state is set
      setTimeout(() => initializeEditor(editorData), 0);
    } catch (error) {
      // For demo purposes, generate mock content
      setTitle("Sample Blog Post from YouTube Video");
      const mockEditorData = {
        time: Date.now(),
        blocks: [
          {
            type: "header",
            data: {
              text: "Sample Blog Post from YouTube Video",
              level: 1,
            },
          },
          {
            type: "paragraph",
            data: {
              text: `This is a generated blog post based on the YouTube video: <b>${youtubeUrl}</b>`,
            },
          },
          {
            type: "header",
            data: {
              text: "Introduction",
              level: 2,
            },
          },
          {
            type: "paragraph",
            data: {
              text: "The video discusses various interesting topics that have been converted into this blog format.",
            },
          },
          {
            type: "header",
            data: {
              text: "Main Content",
              level: 2,
            },
          },
          {
            type: "paragraph",
            data: {
              text: "Here's the main content extracted from the video:",
            },
          },
          {
            type: "list",
            data: {
              style: "unordered",
              items: [
                "Key point 1 from the video",
                "Key point 2 from the video",
                "Key point 3 from the video",
              ],
            },
          },
          {
            type: "header",
            data: {
              text: "Conclusion",
              level: 2,
            },
          },
          {
            type: "paragraph",
            data: {
              text: "This concludes the blog post generated from the YouTube video. You can now edit this content before publishing.",
            },
          },
          {
            type: "paragraph",
            data: {
              text: "<i>Note: This is a demo version. In production, this would contain actual content extracted from the YouTube video.</i>",
            },
          },
        ],
        version: "2.28.2",
      };
      setGeneratedBlog(mockEditorData);
      // Initialize editor after state is set
      setTimeout(() => initializeEditor(mockEditorData), 0);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        // Navigate to publish page with the generated content
        navigate("/publish", {
          state: {
            title,
            content: outputData,
          },
        });
      } catch (error) {
        console.error("Saving failed: ", error);
      }
    }
  };

  const initializeEditor = (data: any) => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }

      const editorElement = document.getElementById("editorjs");
      if (!editorElement) {
        console.error("Editor element not found");
        return;
      }

      try {
        editorRef.current = new EditorJS({
          holder: "editorjs",
          data: data,
          tools: {
            header: {
              class: Header,
              config: {
                placeholder: "Enter a header",
                levels: [1, 2, 3, 4, 5, 6],
                defaultLevel: 2,
              },
            },
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered",
              },
            },
            paragraph: {
              class: Paragraph,
              inlineToolbar: true,
            },
            image: SimpleImage,
          },
          placeholder: "Start writing your blog post...",
          readOnly: false,
          minHeight: 300,
        });
      } catch (error) {
        console.error("Failed to initialize editor:", error);
      }
    }, 100);
  };

  useEffect(() => {
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            YouTube to Blog
          </h1>
          <p className="text-slate-600">
            Convert your YouTube videos into engaging blog posts
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <Input
              label="YouTube Video URL"
              placeholder="https://www.youtube.com/watch?v=..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              error={error}
              helperText="Paste the URL of the YouTube video you want to convert to a blog post"
            />

            <Button
              onClick={handleGenerateBlog}
              isLoading={isGenerating}
              disabled={!youtubeUrl.trim()}
              className="w-full sm:w-auto"
            >
              {isGenerating ? "Generating Blog..." : "Generate Blog Post"}
            </Button>
          </div>
        </Card>

        {generatedBlog && (
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">
                  Generated Blog Post
                </h2>
                <Button onClick={handlePublish} variant="primary">
                  Publish Blog
                </Button>
              </div>

              <Input
                label="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
              />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Blog Content
                </label>
                <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <div
                    id="editorjs"
                    className="min-h-[300px] p-4 prose max-w-none"
                    style={{ minHeight: "300px" }}
                  ></div>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Use the block-based editor to create rich content. Press Tab
                  to see available blocks or click the + button.
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
};
