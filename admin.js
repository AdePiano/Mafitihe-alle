const express = require('express');
const pool = require('../models/db');
const { auth, adminOnly } = require('../middleware/auth');
const router = express.Router();

router.use(auth, adminOnly);

router.get('/listings', async (req, res) => {
  const { status = 'pending' } = req.query;
  try {
    const result = await pool.query(
      `SELECT l.*, u.name as owner_name, u.phone as owner_phone,
      (SELECT image_url FROM listing_images WHERE listing_id=l.id AND is_primary=true LIMIT 1) as primary_image
      FROM listings l JOIN users u ON l.user_id=u.id WHERE l.status=$1 ORDER BY l.created_at DESC`, [status]);
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed' });
  }
});

router.patch('/listings/:id/status', async (req, res) => {
  const { status } = req.body;
  if (!['active','rejected','pending','sold'].includes(status)) return res.status(400).json({ error: 'Invalid status' });
  try {
    const result = await pool.query('UPDATE listings SET status=$1, updated_at=NOW() WHERE id=$2 RETURNING *', [status, req.params.id]);
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Failed' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const [total, pending, active, users] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM listings'),
      pool.query("SELECT COUNT(*) FROM listings WHERE status='pending'"),
      pool.query("SELECT COUNT(*) FROM listings WHERE status='active'"),
      pool.query('SELECT COUNT(*) FROM users WHERE role=\'user\'')
    ]);
    res.json({
      total: parseInt(total.rows[0].count),
      pending: parseInt(pending.rows[0].count),
      active: parseInt(active.rows[0].count),
      users: parseInt(users.rows[0].count)
    });
  } catch {
    res.status(500).json({ error: 'Failed' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id,name,phone,email,role,created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Failed' });
  }
});

module.exports = router;
