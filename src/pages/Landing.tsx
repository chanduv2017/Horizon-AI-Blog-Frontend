import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { Card, CardContent } from "../components/ui/Card";

export default function Landing() {
  const featuredPosts = [
    {
      title: "The Future of Web Development",
      excerpt:
        "Explore the latest trends and technologies shaping the future of web development.",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80",
    },
    {
      title: "Mastering React Hooks",
      excerpt:
        "Dive deep into the power of React Hooks and learn how to build more efficient applications.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80",
    },
    {
      title: "Optimizing Website Performance",
      excerpt:
        "Learn proven techniques to improve the speed and responsiveness of your website.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80",
    },
    {
      title: "Designing Accessible Interfaces",
      excerpt:
        "Explore best practices for creating inclusive and accessible user experiences.",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&q=80",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-slate-50 to-slate-100">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
                Where great
                <span className="text-slate-600"> stories </span>
                begin
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 mb-8 leading-relaxed">
                Discover and share stories that matter. Join a community of
                writers and readers passionate about ideas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="text-lg px-8 py-4">
                    Start Writing
                  </Button>
                </Link>
                <Link to="/blogs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-4"
                  >
                    Explore Stories
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Powerful Features for Writers
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Everything you need to create, edit, and share amazing content
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card hover className="text-center">
                <CardContent>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Rich Text Editor
                  </h3>
                  <p className="text-slate-600">
                    Create beautiful content with our block-based editor. Add
                    headers, lists, images, and more with ease.
                  </p>
                </CardContent>
              </Card>

              <Card hover className="text-center">
                <CardContent>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    YouTube to Blog
                  </h3>
                  <p className="text-slate-600">
                    Transform YouTube videos into engaging blog posts
                    automatically. Perfect for content creators and educators.
                  </p>
                </CardContent>
              </Card>

              <Card hover className="text-center">
                <CardContent>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    User Profiles
                  </h3>
                  <p className="text-slate-600">
                    Customize your profile, manage your posts, and build your
                    personal brand as a writer.
                  </p>
                </CardContent>
              </Card>

              <Card hover className="text-center">
                <CardContent>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Blog Management
                  </h3>
                  <p className="text-slate-600">
                    Organize, edit, and manage all your blog posts from one
                    central dashboard. Track your writing progress.
                  </p>
                </CardContent>
              </Card>

              <Card hover className="text-center">
                <CardContent>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Easy Sharing
                  </h3>
                  <p className="text-slate-600">
                    Share your stories with the world. Built-in social features
                    help your content reach the right audience.
                  </p>
                </CardContent>
              </Card>

              <Card hover className="text-center">
                <CardContent>
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Fast & Responsive
                  </h3>
                  <p className="text-slate-600">
                    Lightning-fast performance with a responsive design that
                    works perfectly on all devices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        {/* Featured Posts Section */}
        <section className="py-20 bg-slate-50">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Featured Stories
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Discover compelling stories from our community of writers
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredPosts.map((post, index) => (
                <Card key={index} hover className="overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to share your story?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join thousands of writers who are already sharing their ideas
                and connecting with readers.
              </p>
              <Link to="/signup">
                <Button
                  variant="secondary"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Get Started for Free
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
