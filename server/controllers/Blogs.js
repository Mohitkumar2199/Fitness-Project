import Blog from "../models/Blogs.js";
import User from "../models/User.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const user = await User.findById(req.user.id);

    const blog = await Blog.create({
      title,
      content,
      author: user.name,
      userId: user._id,
    });

    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};