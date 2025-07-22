const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.listBadges = async (req, res) => {
  try {
    const badges = await prisma.badge.findMany({ orderBy: { name: 'asc' } });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch badges', error: err.message });
  }
}; 