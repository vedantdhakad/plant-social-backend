const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ include: { author: true, comments: true } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: { author: true, comments: true },
    });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post', error: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.userId,
      },
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create post', error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: { id: req.params.id, authorId: req.user.userId },
      data: { title, content },
    });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update post', error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await prisma.post.delete({ where: { id: req.params.id, authorId: req.user.userId } });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post', error: err.message });
  }
}; 