import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  // useRoutes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blog } from "./pages/Blog";
import { Blogs } from "./pages/Blogs";
import { Publish } from "./pages/Publish";
import { ProfileSection } from "./pages/EditProfile";
import { Profile } from "./pages/Profile";
import { MyBlogs } from "./pages/MyBlogs";
import { EditBlog } from "./pages/EditBlog";
import { YoutubeToBlog } from "./pages/YoutubeToBlog";
import Landing from "./pages/Landing";
// import routes from "tempo-routes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  return (
    <>
      {/* {import.meta.env.VITE_TEMPO && useRoutes(routes)} */}
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/youtube-to-blog" element={<YoutubeToBlog />} />
        <Route path="/edit-profile" element={<ProfileSection />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="" element={<Landing />} />

        {/* {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />} */}
        <Route path="*" element={<Navigate to="" />} />
      </Routes>
    </>
  );
}

export default App;
