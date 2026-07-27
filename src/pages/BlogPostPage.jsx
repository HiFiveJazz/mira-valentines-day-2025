import { useParams } from "react-router";
import posts from "../blog";
import BlogPost from "../components/BlogPost/BlogPost";
import Divider from "../components/Divider/Divider";
import Footer from "../components/Footer/Footer";

const BlogPostPage = () => {
  const { slug } = useParams();

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        <h2>Post not found</h2>
      </div>
    );
  }

  return (
    <div>
      <Divider title="Blog" />

      <BlogPost
        title={post.title}
        meta={post.meta}
        blocks={post.blocks}
      />

      <Footer />
    </div>
  );
};

export default BlogPostPage;
