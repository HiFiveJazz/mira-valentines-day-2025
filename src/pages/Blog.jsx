import Divider from "../components/Divider/Divider";
import Footer from "../components/Footer/Footer";
import BlogIndex from "../components/BlogIndex/BlogIndex";
import posts from "../blog";

const Blog = () => {
  return (
    <div>
      <Divider
        title="Blog"
        gradientLg="linear-gradient(294deg, hsl(251, 58%,49%) 20%, hsl(133,77%,33%) 65%)"
        gradientMd="linear-gradient(294deg, rgb(255,255,0) 20%, rgba(200,200,200,0.3) 65%)"
        gradientSm="linear-gradient(294deg, rgb(0,128,255) 20%, rgba(200,200,200,0.3) 65%)"
      />

      <BlogIndex posts={posts} />

      <Footer />
    </div>
  );
};

export default Blog;
