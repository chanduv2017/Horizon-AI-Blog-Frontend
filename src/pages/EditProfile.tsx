import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Container } from "../components/ui/Container";
import { Avatar } from "../components/Avatar";

// API Placeholder - Replace with actual API calls
const fetchUserProfile = async () => {
  // Simulated API response
  return {
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    bio: "Software Engineer passionate about building user-friendly applications. Love to write about technology and share knowledge with the community.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    twitter: "@johndoe",
    github: "johndoe",
    linkedin: "johndoe",
  };
};

const updateUserProfile = async (data: any) => {
  // Simulated API call
  console.log("Updating profile:", data);
  return { success: true };
};

export const ProfileSection = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    twitter: "",
    github: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !profile.name.trim() ||
      !profile.username.trim() ||
      !profile.email.trim()
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateUserProfile(profile);
      setSuccess(true);
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
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

  return (
    <Layout>
      <Container>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar name={profile.name || "User"} size="small" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Profile</h1>
            <p className="text-slate-600 mt-1">
              Update your profile information and preferences
            </p>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-slate-900">
                Personal Information
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    placeholder="Enter your full name"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                  <Input
                    label="Username *"
                    placeholder="Choose a username"
                    value={profile.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    required
                  />
                </div>

                <Input
                  label="Email Address *"
                  type="email"
                  placeholder="Enter your email"
                  value={profile.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={profile.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
                  />
                </div>

                <Input
                  label="Location"
                  placeholder="City, Country"
                  value={profile.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />

                <Input
                  label="Website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  value={profile.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                />

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-900">
                    Social Links
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Twitter"
                      placeholder="@username"
                      value={profile.twitter}
                      onChange={(e) =>
                        handleInputChange("twitter", e.target.value)
                      }
                    />
                    <Input
                      label="GitHub"
                      placeholder="username"
                      value={profile.github}
                      onChange={(e) =>
                        handleInputChange("github", e.target.value)
                      }
                    />
                  </div>
                  <Input
                    label="LinkedIn"
                    placeholder="username"
                    value={profile.linkedin}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                    Profile updated successfully! Redirecting...
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/profile")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={saving}>
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Layout>
  );
};
