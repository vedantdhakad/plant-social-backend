const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listComments = async (req, res) => {
  try {
    const comments = await prisma.commentOnTip.findMany({
      where: { tipId: req.params.tipId, parentId: null },
      include: {
        user: true,
        replies: { include: { user: true, replies: { include: { user: true } } } },
      },
      orderBy: { createdAt: 'asc' },
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments', error: err.message });
  }
};

exports.addComment = async (req, res) => {
  const { content, parentId } = req.body;
  try {
    const comment = await prisma.commentOnTip.create({
      data: {
        tipId: req.params.tipId,
        userId: req.user.userId,
        content,
        parentId,
      },
      include: { user: true },
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add comment', error: err.message });
  }
};

exports.editComment = async (req, res) => {
  const { content } = req.body;
  try {
    const comment = await prisma.commentOnTip.update({
      where: { id: req.params.id, userId: req.user.userId },
      data: { content },
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to edit comment', error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await prisma.commentOnTip.delete({ where: { id: req.params.id, userId: req.user.userId } });
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment', error: err.message });
  }
}; 