const express = require('express');
const router = express.Router();
const Blog = require('./blogmodel');

// Create a new blog
router.post('/blogs', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const newBlog = new Blog({
      title,
      content,
      author  // Assuming you pass `author` from request body or session
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get a single blog by ID
router.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Update a blog by ID
router.put('/blogs/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedBlog) {
      return res.status(404).send('Blog not found');
    }
    res.json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Delete a blog by ID
router.delete('/blogs/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).send('Blog not found');
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
