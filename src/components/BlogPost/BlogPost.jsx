// BlogPost.jsx
import React, { useEffect, useRef, useState } from "react";
import "./CSS/BlogPost.css";

/*
Supported blocks:

{ type: "text", content: "..." }
{ type: "heading", content: "Title", level: 2 | 3 }
{ type: "image", src, alt?, caption?, width?, vh?, fit? }
{ type: "download", label, href, filename?, note? }
{ type: "sources", title?, items: [ "url" | { label, href } ] }
*/

// ---------------------
// TEXT RENDERING
// ---------------------

function renderInlineCodeAndNewlines(text) {
  const lines = String(text ?? "").split("\n");

  return lines.map((line, lineIdx) => {
    const parts = line.split(/(``[^`]+``|`[^`]+`)/g);

    return (
      <React.Fragment key={lineIdx}>
        {parts.map((part, i) => {
          const isDouble =
            part.startsWith("``") && part.endsWith("``");
          const isSingle =
            part.startsWith("`") && part.endsWith("`");

          if (isDouble) {
            return (
              <code key={i} className="blog-post__code-inline">
                {part.slice(2, -2)}
              </code>
            );
          }

          if (isSingle) {
            return (
              <code key={i} className="blog-post__code-inline">
                {part.slice(1, -1)}
              </code>
            );
          }

          return <React.Fragment key={i}>{part}</React.Fragment>;
        })}
        {lineIdx !== lines.length - 1 ? <br /> : null}
      </React.Fragment>
    );
  });
}

function renderTextWithCodeBlocks(text) {
  const raw = String(text ?? "");
  const nodes = [];
  const re = /```([\s\S]*?)```/g;

  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = re.exec(raw)) !== null) {
    const before = raw.slice(lastIndex, match.index);

    if (before.trim() !== "" || before.includes("\n")) {
      nodes.push(
        <span key={`t-${key++}`} className="blog-post__text-span">
          {renderInlineCodeAndNewlines(before)}
        </span>
      );
    }

    const code = match[1].replace(/^\n/, "").replace(/\n$/, "");

    nodes.push(
      <pre key={`c-${key++}`} className="blog-post__code-block">
        <code>{code}</code>
      </pre>
    );

    lastIndex = match.index + match[0].length;
  }

  const after = raw.slice(lastIndex);

  if (after.trim() !== "" || after.includes("\n")) {
    nodes.push(
      <span key={`t-${key++}`} className="blog-post__text-span">
        {renderInlineCodeAndNewlines(after)}
      </span>
    );
  }

  return nodes;
}

// ---------------------
// COMPONENT
// ---------------------

const BlogPost = ({ title, meta, blocks = [] }) => {
  const postRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  // One-way observer (prevents infinite scroll glitch)
  useEffect(() => {
    const el = postRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={postRef}
      className={`blog-post ${hasEntered ? "fade-in" : "fade-out"}`}
    >
      <header className="blog-post__header">
        <h1 className="blog-post__title">{title}</h1>
        {meta && <div className="blog-post__meta">{meta}</div>}
      </header>

      <div className="blog-post__content">
        {blocks.map((block, idx) => {
          // HEADINGS
          if (block.type === "heading") {
            const level = block.level === 3 ? 3 : 2;

            return level === 3 ? (
              <h3 key={idx} className="blog-post__h3">
                {block.content}
              </h3>
            ) : (
              <h2 key={idx} className="blog-post__h2">
                {block.content}
              </h2>
            );
          }

          // TEXT
          if (block.type === "text") {
            return (
              <p key={idx} className="blog-post__p">
                {renderTextWithCodeBlocks(block.content)}
              </p>
            );
          }

          // IMAGE
          if (block.type === "image") {
            const widthClass =
              block.width === "full"
                ? "blog-post__media--full"
                : block.width === "wide"
                ? "blog-post__media--wide"
                : "blog-post__media--normal";

            const vhNumber =
              typeof block.vh === "number" ? block.vh : null;

            const isFixedHeight = vhNumber !== null;

            const mediaStyle = isFixedHeight
              ? { "--media-h": `${vhNumber}svh` }
              : undefined;

            const imgStyle = {
              objectFit: block.fit || "cover",
            };

            if (!hasEntered) {
              return (
                <div
                  key={idx}
                  style={mediaStyle}
                  className={`blog-post__media blog-post__media--placeholder ${widthClass} ${
                    isFixedHeight ? "blog-post__media--fixed" : ""
                  }`}
                />
              );
            }

            return (
              <figure
                key={idx}
                style={mediaStyle}
                className={`blog-post__media ${widthClass} ${
                  isFixedHeight ? "blog-post__media--fixed" : ""
                }`}
              >
                <img
                  className="blog-post__img"
                  src={block.src}
                  alt={block.alt || ""}
                  loading="lazy"
                  style={imgStyle}
                />
                {block.caption && (
                  <figcaption className="blog-post__caption">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          // DOWNLOAD
          if (block.type === "download") {
            return (
              <div key={idx} className="blog-post__download">
                <a
                  className="blog-post__download-link"
                  href={block.href}
                  download={block.filename || true}
                >
                  {block.label || "Download"}
                </a>
                {block.note && (
                  <div className="blog-post__download-note">
                    {block.note}
                  </div>
                )}
              </div>
            );
          }

          // SOURCES
          if (block.type === "sources") {
            const items = (block.items || [])
              .map((it) =>
                typeof it === "string"
                  ? { href: it, label: it }
                  : it
              )
              .filter((it) => it?.href);

            return (
              <section key={idx} className="blog-post__sources">
                <h3 className="blog-post__sources-title">
                  {block.title || "Sources"}
                </h3>
                <ul className="blog-post__sources-list">
                  {items.map((it, i) => (
                    <li key={i}>
                      <a
                        className="blog-post__sources-link"
                        href={it.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {it.label || it.href}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          }

          return null;
        })}
      </div>
    </article>
  );
};

export default BlogPost;
