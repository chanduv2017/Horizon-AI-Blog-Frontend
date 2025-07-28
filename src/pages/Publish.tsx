import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import EditorHeader from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/simple-image";
import { Container } from "../components/ui/Container";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const editorRef = useRef<EditorJS | null>(null);

  const handlePublish = async () => {
    if (!title.trim()) {
      setError("Please enter a title");
      return;
    }

    if (!editorRef.current) {
      setError("Editor not initialized");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const editorData = await editorRef.current.save();

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/blog`,
        { title, content: editorData },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );
      navigate(`/blog/${response.data.id}`);
    } catch (e) {
      setError("Failed to publish post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const initializeEditor = (data?: any) => {
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }

      const editorElement = document.getElementById("editorjs-publish");
      if (!editorElement) {
        console.error("Editor element not found");
        return;
      }

      try {
        editorRef.current = new EditorJS({
          holder: "editorjs-publish",
          data: data || {
            time: Date.now(),
            blocks: [
              {
                type: "paragraph",
                data: {
                  text: "Start writing your story...",
                },
              },
            ],
            version: "2.28.2",
          },
          tools: {
            header: {
              class: EditorHeader,
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
          placeholder: "Tell your story...",
          readOnly: false,
          minHeight: 400,
        });
      } catch (error) {
        console.error("Failed to initialize editor:", error);
      }
    }, 100);
  };

  useEffect(() => {
    // Check if we have content from navigation state (e.g., from YouTube to Blog)
    if (location.state?.title) {
      setTitle(location.state.title);
    }

    if (location.state?.content) {
      initializeEditor(location.state.content);
    } else {
      initializeEditor();
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
      }
    };
  }, [location.state]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Container className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Write a Story
            </h1>
            <p className="text-slate-600">Share your thoughts with the world</p>
          </div>

          <Card>
            <CardContent className="space-y-6">
              <Input
                placeholder="Write your story title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-2xl font-bold border-0 px-0 focus:ring-0 placeholder:text-slate-400"
              />

              <div>
                <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <div
                    id="editorjs-publish"
                    className="min-h-[400px] p-4 prose max-w-none"
                    style={{ minHeight: "400px" }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Use the block-based editor to create rich content. Press Tab
                  to see available blocks or click the + button.
                </p>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => navigate("/blogs")}>
                  Cancel
                </Button>
                <Button onClick={handlePublish} isLoading={isLoading}>
                  Publish Story
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
};
