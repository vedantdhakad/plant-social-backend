require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://plant-social-backend-exmhnalp5-vedant-dhakads-projects.vercel.app', // Vercel frontend URL
  'http://localhost:5173' // local dev
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Route imports
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/plants', require('./routes/plants'));
app.use('/api/tips', require('./routes/tips'));
app.use('/api/myplants', require('./routes/myplants'));
app.use('/api/badges', require('./routes/badges'));
app.use('/api/scan', require('./routes/scan'));

app.get('/', (req, res) => {
  res.send('Plant Social Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 