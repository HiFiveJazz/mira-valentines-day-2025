import { Link } from "react-router";
import "./CSS/BlogIndex.css";

const BlogIndex = ({ posts = [] }) => {
  return (
    <section className="blog-index">
      {posts.map((post) => {
        const firstText = post.blocks?.find((b) => b.type === "text")?.content;

        return (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="blog-index__card"
            aria-label={`Open blog post: ${post.title}`}
          >
            <div className="blog-index__inner">
              <h2 className="blog-index__title">{post.title}</h2>
              {post.meta ? <div className="blog-index__meta">{post.meta}</div> : null}

              {firstText ? (
                <p className="blog-index__preview">{firstText}</p>
              ) : null}
            </div>
          </Link>
        );
      })}
    </section>
  );
};

export default BlogIndex;
