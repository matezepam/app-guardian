const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: 'uploads/avatars',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.id}${ext}`);
  }
});

const uploadAvatar = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } });

module.exports = uploadAvatar;
