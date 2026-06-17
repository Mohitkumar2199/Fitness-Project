import React, { useEffect, useState } from "react";
import { createBlog, getBlogs } from "../api";
import { useSelector } from "react-redux";
import "./Blogs.css";


const Blogs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    try {
      setError("");
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (err) {
      setError("Couldn't load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) return;
    setPublishing(true);
    try {
      await createBlog(currentUser.token, { title, content });
      setTitle("");
      setContent("");
      await fetchBlogs();
    } catch (err) {
      setError("Couldn't publish your blog. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  const getInitials = (name = "?") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="blogs-page">
      <div className="blogs-hero">
        <h1>Community Blogs</h1>
        <p>Share your fitness journey, tips, and wins with the community</p>
      </div>

      <div className="blogs-container">
        <div className="compose-card">
          <h3>Write a new post</h3>
          <input
            className="compose-input"
            placeholder="Give your blog a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
          <textarea
            className="compose-textarea"
            placeholder="Share your story, tips, or progress..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={2000}
          />
          <div className="compose-footer">
            <span className="char-count">{content.length}/2000</span>
            <button
              className="publish-btn"
              onClick={handlePublish}
              disabled={!title.trim() || !content.trim() || publishing}
            >
              {publishing ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </div>

        {error && <div className="error-banner">{error}</div>}

        <div className="blogs-list">
          {loading ? (
            <div className="state-message">Loading blogs...</div>
          ) : blogs.length === 0 ? (
            <div className="state-message">
              No blogs yet — be the first to share! 🏋️
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <div className="blog-card-header">
                  <div className="avatar">{getInitials(blog.author)}</div>
                  <div>
                    <p className="blog-author">{blog.author || "Anonymous"}</p>
                    <p className="blog-date">{formatDate(blog.createdAt)}</p>
                  </div>
                </div>
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-content">{blog.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs; 