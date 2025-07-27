import Header from "../components/Header";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Please fill in both title and content");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/blog`,
        { title, content },
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

              <TextEditor
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

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

interface TextEditorProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextEditor({ value, onChange }: TextEditorProps) {
  return (
    <div className="min-h-[400px]">
      <textarea
        value={value}
        onChange={onChange}
        rows={20}
        className="w-full h-full resize-none border-0 focus:ring-0 focus:outline-none text-lg leading-relaxed placeholder:text-slate-400"
        placeholder="Tell your story..."
        required
      />
    </div>
  );
}
