const router = require('express').Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { listing_id, name, phone, message } = req.body;
  if (!listing_id || !phone) return res.status(400).json({ error: 'Listing and phone required' });
  await pool.query('INSERT INTO contacts (listing_id,name,phone,message) VALUES ($1,$2,$3,$4)', [listing_id, name, phone, message]);
  res.status(201).json({ message: 'Message sent' });
});

module.exports = router;
