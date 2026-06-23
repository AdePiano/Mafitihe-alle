require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const listingRoutes = require('./routes/listings');
const adminRoutes = require('./routes/admin');
const uploadRoutes = require('./routes/upload');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Mafitihe Alle Hossana' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Mafitihe Alle API running on port ${PORT}`);
});
