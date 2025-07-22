const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({ include: { author: true, post: true } });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
};

exports.getComment = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: req.params.id },
      include: { author: true, post: true },
    });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comment', error: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: req.user.userId,
      },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create comment', error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { content } = req.body;
    const comment = await prisma.comment.update({
      where: { id: req.params.id, authorId: req.user.userId },
      data: { content },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update comment', error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await prisma.comment.delete({ where: { id: req.params.id, authorId: req.user.userId } });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment', error: err.message });
  }
}; 