import { useState, useEffect } from "react";
import Layout from "../layouts/Layout";
import { Card, CardContent, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Avatar } from "../components/Avatar";
import { Badge } from "../components/ui/Badge";
import { Link } from "react-router-dom";

// API Placeholder - Replace with actual API call
const fetchUserProfile = async () => {
  // Simulated API response
  return {
    id: "user123",
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    bio: "Software Engineer passionate about building user-friendly applications. Love to write about technology and share knowledge with the community.",
    joinedDate: "2024-01-15",
    postsCount: 12,
    followersCount: 245,
    followingCount: 89,
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    socialLinks: {
      twitter: "@johndoe",
      github: "johndoe",
      linkedin: "johndoe",
    },
  };
};

export const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Container>
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-slate-200 rounded-lg"></div>
            <div className="h-64 bg-slate-200 rounded-lg"></div>
          </div>
        </Container>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <Container>
          <Card>
            <CardContent className="text-center py-12">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Profile not found
              </h2>
              <p className="text-slate-600">
                Unable to load profile information.
              </p>
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
          {/* Profile Header */}
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar name={profile.name} size="small" />

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900">
                        {profile.name}
                      </h1>
                      <p className="text-lg text-slate-600">
                        @{profile.username}
                      </p>
                      {profile.location && (
                        <p className="text-sm text-slate-500 mt-1">
                          {profile.location}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link to="/edit-profile">
                        <Button variant="outline">Edit Profile</Button>
                      </Link>
                      <Link to="/my-blogs">
                        <Button>My Blogs</Button>
                      </Link>
                    </div>
                  </div>

                  {profile.bio && (
                    <p className="text-slate-700 mt-4 leading-relaxed">
                      {profile.bio}
                    </p>
                  )}

                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-slate-900 mt-2 inline-block"
                    >
                      {profile.website}
                    </a>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-6 pt-6 border-t border-slate-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    {profile.postsCount}
                  </div>
                  <div className="text-sm text-slate-600">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    {profile.followersCount}
                  </div>
                  <div className="text-sm text-slate-600">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    {profile.followingCount}
                  </div>
                  <div className="text-sm text-slate-600">Following</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    {new Date(profile.joinedDate).getFullYear()}
                  </div>
                  <div className="text-sm text-slate-600">Joined</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Links */}
          {profile.socialLinks && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-slate-900">
                  Connect
                </h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {profile.socialLinks.twitter && (
                    <Badge variant="secondary">
                      Twitter: {profile.socialLinks.twitter}
                    </Badge>
                  )}
                  {profile.socialLinks.github && (
                    <Badge variant="secondary">
                      GitHub: {profile.socialLinks.github}
                    </Badge>
                  )}
                  {profile.socialLinks.linkedin && (
                    <Badge variant="secondary">
                      LinkedIn: {profile.socialLinks.linkedin}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-slate-900">
                Recent Activity
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-slate-900">
                      Published &quot;The Future of Web Development&quot;
                    </p>
                    <p className="text-xs text-slate-500">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-slate-900">
                      Updated profile information
                    </p>
                    <p className="text-xs text-slate-500">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-slate-900">
                      Joined the community
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(profile.joinedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Layout>
  );
};
