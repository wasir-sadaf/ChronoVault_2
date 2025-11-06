const db = require("../config/db");

const createCapsule = (req, res) => {
  const { user_id, title, message, unlock_date } = req.body;

  if (!user_id || !title || !message || !unlock_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `INSERT INTO capsules (user_id, title, message, unlock_date) VALUES (?,?,?,?)`;

  db.query(sql, [user_id, title, message, unlock_date], (err, result) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ message: "Capsule created successfully", capsuleId: result.insertId });
  });
};

const getUserCapsules = (req, res) => {
  const { user_id } = req.params;

  const sql = `SELECT * FROM capsules WHERE user_id = ?`;
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
};

const unlockCapsule = (req, res) => {
  const { capsule_id } = req.params;

  const checkSql = `SELECT * FROM capsules WHERE id = ?`;
  db.query(checkSql, [capsule_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Capsule not found" });

    const capsule = result[0];
    const now = new Date();

    if (new Date(capsule.unlock_date) > now) {
      return res.status(403).json({ message: "Capsule cannot be unlocked yet" });
    }

    const updateSql = `UPDATE capsules SET is_unlocked = TRUE WHERE id = ?`;
    db.query(updateSql, [capsule_id], (err2) => {
      if (err2) return res.status(500).json({ message: err2.message });
      res.json({ message: "Capsule unlocked", capsule });
    });
  });
};

module.exports = { createCapsule, getUserCapsules, unlockCapsule };
