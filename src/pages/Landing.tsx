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

        {/* Featured Posts Section */}
        <section className="py-20">
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
