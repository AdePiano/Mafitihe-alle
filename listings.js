const express = require('express');
const pool = require('../models/db');
const { auth } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const { category, search, page = 1, limit = 12 } = req.query;
  const offset = (page - 1) * limit;
  let query = `SELECT l.*, u.name as owner_name,
    (SELECT image_url FROM listing_images WHERE listing_id=l.id AND is_primary=true LIMIT 1) as primary_image
    FROM listings l JOIN users u ON l.user_id=u.id WHERE l.status='active'`;
  const params = [];
  if (category) { params.push(category); query += ` AND l.category=$${params.length}`; }
  if (search) { params.push(`%${search}%`); query += ` AND (l.title ILIKE $${params.length} OR l.description ILIKE $${params.length})`; }
  query += ` ORDER BY l.created_at DESC LIMIT $${params.length+1} OFFSET $${params.length+2}`;
  params.push(limit, offset);
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    await pool.query('UPDATE listings SET views=views+1 WHERE id=$1', [req.params.id]);
    const result = await pool.query(
      `SELECT l.*, u.name as owner_name, u.phone as owner_phone,
      json_agg(li.image_url ORDER BY li.is_primary DESC) FILTER (WHERE li.id IS NOT NULL) as images
      FROM listings l JOIN users u ON l.user_id=u.id
      LEFT JOIN listing_images li ON li.listing_id=l.id
      WHERE l.id=$1 AND l.status='active' GROUP BY l.id, u.name, u.phone`, [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Listing not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch listing' });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, title_am, description, description_am, category, price, price_type, payment_method, phone, location, images } = req.body;
  if (!title || !category || !phone) return res.status(400).json({ error: 'Title, category and phone are required' });
  try {
    const result = await pool.query(
      `INSERT INTO listings (user_id,title,title_am,description,description_am,category,price,price_type,payment_method,phone,location)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
      [req.user.id, title, title_am, description, description_am, category, price, price_type||'fixed', payment_method||'both', phone, location||'Hossana']
    );
    const listing = result.rows[0];
    if (images && images.length) {
      for (let i = 0; i < images.length; i++) {
        await pool.query('INSERT INTO listing_images (listing_id,image_url,is_primary) VALUES ($1,$2,$3)',
          [listing.id, images[i], i === 0]);
      }
    }
    res.status(201).json(listing);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create listing' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, title_am, description, description_am, price, price_type, payment_method, phone, location } = req.body;
  try {
    const check = await pool.query('SELECT user_id FROM listings WHERE id=$1', [req.params.id]);
    if (!check.rows.length) return res.status(404).json({ error: 'Not found' });
    if (check.rows[0].user_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    const result = await pool.query(
      `UPDATE listings SET title=$1,title_am=$2,description=$3,description_am=$4,price=$5,price_type=$6,payment_method=$7,phone=$8,location=$9,updated_at=NOW()
       WHERE id=$10 RETURNING *`,
      [title, title_am, description, description_am, price, price_type, payment_method, phone, location, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update listing' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const check = await pool.query('SELECT user_id FROM listings WHERE id=$1', [req.params.id]);
    if (!check.rows.length) return res.status(404).json({ error: 'Not found' });
    if (check.rows[0].user_id !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
    await pool.query('DELETE FROM listings WHERE id=$1', [req.params.id]);
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete listing' });
  }
});

router.get('/user/my', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, (SELECT image_url FROM listing_images WHERE listing_id=l.id AND is_primary=true LIMIT 1) as primary_image
       FROM listings l WHERE l.user_id=$1 ORDER BY l.created_at DESC`, [req.user.id]);
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed to fetch your listings' });
  }
});

module.exports = router;
