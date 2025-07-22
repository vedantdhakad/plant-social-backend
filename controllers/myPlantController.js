const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listUserPlants = async (req, res) => {
  try {
    const userPlants = await prisma.userPlant.findMany({
      where: { userId: req.user.userId },
      include: { plant: true, badges: { include: { badge: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json(userPlants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user plants', error: err.message });
  }
};

exports.addUserPlant = async (req, res) => {
  const { plantId, nickname } = req.body;
  try {
    const userPlant = await prisma.userPlant.create({
      data: {
        userId: req.user.userId,
        plantId,
        nickname,
        milestones: {},
      },
      include: { plant: true },
    });
    res.status(201).json(userPlant);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add plant', error: err.message });
  }
};

exports.logCareAction = async (req, res) => {
  const { action, date } = req.body; // e.g. action: 'watered'
  try {
    const userPlant = await prisma.userPlant.findUnique({
      where: { id: req.params.id },
    });
    if (!userPlant || userPlant.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const milestones = userPlant.milestones || {};
    if (!milestones[action]) milestones[action] = [];
    milestones[action].push(date || new Date().toISOString());
    const updated = await prisma.userPlant.update({
      where: { id: req.params.id },
      data: { milestones },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to log care action', error: err.message });
  }
};

exports.getPlantBadges = async (req, res) => {
  try {
    const badges = await prisma.userBadge.findMany({
      where: { userPlantId: req.params.id },
      include: { badge: true },
      orderBy: { awardedAt: 'asc' },
    });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch badges', error: err.message });
  }
}; 