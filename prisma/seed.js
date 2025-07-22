require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  // Seed plants
  const dataPath = path.join(__dirname, 'plant_seed_data.json');
  const plants = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  console.log(`Seeding ${plants.length} plants...`);
  for (const plant of plants) {
    await prisma.plant.create({ data: plant });
  }

  // Seed demo badges
  const badges = [
    { name: 'First Watered', description: 'Logged your first watering!', iconUrl: 'https://img.icons8.com/color/48/000000/watering-can.png' },
    { name: 'Bloomed', description: 'Your plant bloomed!', iconUrl: 'https://img.icons8.com/color/48/000000/flower.png' },
    { name: 'Kept Alive 1 Year', description: 'Kept a plant alive for 1 year!', iconUrl: 'https://img.icons8.com/color/48/000000/medal.png' },
    { name: 'Fertilizer Pro', description: 'Fertilized your plant 10 times.', iconUrl: 'https://img.icons8.com/color/48/000000/fertilizer.png' },
    { name: 'Pest Buster', description: 'Treated your plant for pests.', iconUrl: 'https://img.icons8.com/color/48/000000/bug.png' }
  ];
  for (const badge of badges) {
    await prisma.badge.create({ data: badge });
  }
  console.log('Seeded demo badges.');

  // Seed demo tips (if at least one user and plant exist)
  const users = await prisma.user.findMany();
  const demoUser = users[0];
  const demoPlant = await prisma.plant.findFirst();
  if (demoUser && demoPlant) {
    await prisma.tip.create({
      data: {
        content: 'Water your Spider Plant once a week for best results.',
        userId: demoUser.id,
        plantId: demoPlant.id,
        upvotes: 5,
      },
    });
    await prisma.tip.create({
      data: {
        content: 'Keep your Fiddle Leaf Fig near a bright window, but out of direct sun.',
        userId: demoUser.id,
        upvotes: 3,
      },
    });
    console.log('Seeded demo tips.');
  } else {
    console.log('No users or plants found, skipping demo tips.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 