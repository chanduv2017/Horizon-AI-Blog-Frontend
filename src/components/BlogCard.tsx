import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";

interface BlogCardProps {
  post_id: string;
  User: string;
  title: string;
  content: string;
  CreatedAt: string;
}

export const BlogCard = ({
  post_id,
  User,
  title,
  content,
  CreatedAt,
}: BlogCardProps) => {
  const readTime = Math.ceil(content.length / 100);
  const formattedDate = new Date(CreatedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link to={`/blog/${post_id}`} className="block">
      <Card
        hover
        className="mb-6 transition-all duration-200 hover:border-slate-300"
      >
        <CardContent>
          <div className="flex items-center space-x-3 mb-4">
            <Avatar name={User} size="small" />
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <span className="font-medium">{User}</span>
              <Circle />
              <span>{formattedDate}</span>
              <Circle />
              <Badge variant="secondary" size="sm">
                {readTime} min read
              </Badge>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 hover:text-slate-700 transition-colors">
            {title}
          </h2>

          <p className="text-slate-600 line-clamp-3 leading-relaxed">
            {content.slice(0, 150)}...
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}
