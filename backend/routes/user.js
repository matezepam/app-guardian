const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../uploads/avatars");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `avatar_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("El archivo debe ser una imagen"));
    }
    cb(null, true);
  },
});

router.post('/avatar', upload.single('avatar'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No se recibió archivo" });
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    res.status(200).json({ avatarUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir el avatar" });
  }
});

router.get('/me', (req, res) => {
  res.json({
    username: "Paulo",
    email: "paulo@example.com",
    avatar: "/uploads/avatars/default.png",
  });
});

module.exports = router;
