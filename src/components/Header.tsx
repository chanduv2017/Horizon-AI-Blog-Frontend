import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import { Button } from "./ui/Button";
import { Container } from "./ui/Container";

const Header = () => {
  const username = localStorage.getItem("username");

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link to="/blogs" className="flex items-center">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Horizon
            </h1>
          </Link>

          <nav className="flex items-center space-x-4">
            {username ? (
              <>
                <Link to="/publish">
                  <Button variant="outline" size="sm">
                    Write
                  </Button>
                </Link>
                <Avatar size="big" name={username} />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
