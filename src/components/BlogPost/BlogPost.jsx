// BlogPost.jsx
import React, { useEffect, useRef, useState } from "react";
import "./CSS/BlogPost.css";

const BlogPost = ({ title, meta, blocks = [] }) => {
  const postRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = postRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <article
      ref={postRef}
      className={`blog-post ${isVisible ? "fade-in" : "fade-out"}`}
    >
      <header className="blog-post__header">
        <h1 className="blog-post__title">{title}</h1>
        {meta ? <div className="blog-post__meta">{meta}</div> : null}
      </header>

      <div className="blog-post__content">
        {blocks.map((block, idx) => {
          if (block.type === "text") {
            return (
              <p className="blog-post__p" key={idx}>
                {block.content}
              </p>
            );
          }

          if (block.type === "image") {
            const widthClass =
              block.width === "full"
                ? "blog-post__media--full"
                : block.width === "wide"
                ? "blog-post__media--wide"
                : "blog-post__media--normal";

            const mediaStyle = block.vh
              ? { "--media-h": `${block.vh}vh` }
              : undefined;

            const imgStyle = {
              objectFit: block.fit || "cover", // "cover" default; use "contain" for screenshots/logos
            };

            if (!isVisible) {
              return (
                <div
                  key={idx}
                  style={mediaStyle}
                  className={`blog-post__media blog-post__media--placeholder ${widthClass}`}
                />
              );
            }

            return (
              <figure
                key={idx}
                style={mediaStyle}
                className={`blog-post__media ${widthClass} ${
                  block.vh ? "blog-post__media--fixed" : ""
                }`}
              >
                <img
                  className="blog-post__img"
                  src={block.src}
                  alt={block.alt || ""}
                  loading="lazy"
                  style={imgStyle}
                />
                {block.caption ? (
                  <figcaption className="blog-post__caption">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }

          return null;
        })}
      </div>
    </article>
  );
};

export default BlogPost;
