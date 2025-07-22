const fs = require('fs');

const commonNames = [
  'Spider Plant', 'Fiddle Leaf Fig', 'Rose', 'Snake Plant', 'Basil', 'Aloe Vera', 'Peace Lily', 'Jade Plant', 'English Ivy', 'Pothos',
  'Lavender', 'Mint', 'Orchid', 'Cactus', 'Fern', 'Rubber Plant', 'Palm', 'Daisy', 'Sunflower', 'Tulip',
  'Maple Tree', 'Oak Tree', 'Pine Tree', 'Bamboo', 'Lemon Tree', 'Apple Tree', 'Cherry Blossom', 'Magnolia', 'Camellia', 'Gardenia',
  'Begonia', 'Coleus', 'Croton', 'Dracaena', 'Echeveria', 'Ficus', 'Geranium', 'Hibiscus', 'Impatiens', 'Jasmine',
  'Kalanchoe', 'Lily', 'Maranta', 'Nasturtium', 'Oleander', 'Peperomia', 'Quince', 'Rhododendron', 'Schefflera', 'Tradescantia'
];

const scientificPrefixes = [
  'Chlorophytum', 'Ficus', 'Rosa', 'Sansevieria', 'Ocimum', 'Aloe', 'Spathiphyllum', 'Crassula', 'Hedera', 'Epipremnum',
  'Lavandula', 'Mentha', 'Orchidaceae', 'Cactaceae', 'Polypodiopsida', 'Ficus', 'Arecaceae', 'Bellis', 'Helianthus', 'Tulipa',
  'Acer', 'Quercus', 'Pinus', 'Bambusoideae', 'Citrus', 'Malus', 'Prunus', 'Magnolia', 'Camellia', 'Gardenia',
  'Begonia', 'Plectranthus', 'Codiaeum', 'Dracaena', 'Echeveria', 'Ficus', 'Pelargonium', 'Hibiscus', 'Impatiens', 'Jasminum',
  'Kalanchoe', 'Lilium', 'Maranta', 'Tropaeolum', 'Nerium', 'Peperomia', 'Cydonia', 'Rhododendron', 'Schefflera', 'Tradescantia'
];

const careTemplates = [
  "Bright, indirect light. Water when top inch of soil is dry.",
  "Full sun. Water deeply but infrequently.",
  "Low to bright light. Allow soil to dry between waterings.",
  "Keep soil moist but not soggy. Pinch off flowers to encourage leaf growth.",
  "Partial shade. Mist leaves regularly.",
  "Tolerates occasional neglect. Fertilize monthly during growing season.",
  "Avoid drafts. Prune in early spring.",
  "Well-draining soil. Repot every 2 years.",
  "Protect from frost. Remove dead leaves promptly.",
  "Use rainwater if possible."
];

const descriptions = [
  "A popular houseplant known for its air-purifying qualities.",
  "A beautiful flowering plant with vibrant colors.",
  "A hardy succulent, perfect for beginners.",
  "A classic garden shrub with fragrant blooms.",
  "A trendy indoor tree with large, glossy leaves.",
  "A fragrant herb used in cooking and teas.",
  "A fast-growing vine ideal for hanging baskets.",
  "A tropical plant with striking foliage.",
  "A small tree prized for its fruit.",
  "A perennial favorite for outdoor landscapes."
];

const imageUrls = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
];

const plants = [];
for (let i = 0; i < 1000; i++) {
  const idx = i % commonNames.length;
  const sciIdx = i % scientificPrefixes.length;
  const careIdx = i % careTemplates.length;
  const descIdx = i % descriptions.length;
  const imgIdx = i % imageUrls.length;
  plants.push({
    commonName: `${commonNames[idx]} ${i + 1}`,
    scientificName: `${scientificPrefixes[sciIdx]} species ${i + 1}`,
    description: descriptions[descIdx],
    careInstructions: careTemplates[careIdx],
    imageUrl: imageUrls[imgIdx]
  });
}

fs.writeFileSync('plant_seed_data.json', JSON.stringify(plants, null, 2));
console.log('Generated 1,000+ synthetic plant entries in plant_seed_data.json'); 