const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.searchPlants = async (req, res) => {
  const { search } = req.query;
  try {
    const where = search
      ? {
          OR: [
            { commonName: { contains: search, mode: 'insensitive' } },
            { scientificName: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};
    const plants = await prisma.plant.findMany({
      where,
      take: 50, // limit results for performance
      orderBy: { commonName: 'asc' },
    });
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plants', error: err.message });
  }
};

exports.getPlant = async (req, res) => {
  try {
    const plant = await prisma.plant.findUnique({ where: { id: req.params.id } });
    if (!plant) return res.status(404).json({ message: 'Plant not found' });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch plant', error: err.message });
  }
}; 