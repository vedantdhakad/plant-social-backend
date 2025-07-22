const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listTips = async (req, res) => {
  const { plantId, search, sort } = req.query;
  try {
    const where = {
      ...(plantId ? { plantId } : {}),
      ...(search
        ? {
            content: { contains: search, mode: 'insensitive' },
          }
        : {}),
    };
    const orderBy = sort === 'upvotes' ? { upvotes: 'desc' } : { createdAt: 'desc' };
    const tips = await prisma.tip.findMany({
      where,
      orderBy,
      include: { user: true, plant: true },
      take: 50,
    });
    res.json(tips);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tips', error: err.message });
  }
};

exports.createTip = async (req, res) => {
  const { content, plantId } = req.body;
  try {
    const tip = await prisma.tip.create({
      data: {
        content,
        plantId,
        userId: req.user.userId,
      },
      include: { user: true, plant: true },
    });
    res.status(201).json(tip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create tip', error: err.message });
  }
};

exports.updateTip = async (req, res) => {
  const { content } = req.body;
  try {
    const tip = await prisma.tip.update({
      where: { id: req.params.id, userId: req.user.userId },
      data: { content },
    });
    res.json(tip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update tip', error: err.message });
  }
};

exports.deleteTip = async (req, res) => {
  try {
    await prisma.tip.delete({ where: { id: req.params.id, userId: req.user.userId } });
    res.json({ message: 'Tip deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete tip', error: err.message });
  }
};

exports.upvoteTip = async (req, res) => {
  try {
    const tip = await prisma.tip.update({
      where: { id: req.params.id },
      data: { upvotes: { increment: 1 } },
    });
    res.json(tip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to upvote tip', error: err.message });
  }
}; 