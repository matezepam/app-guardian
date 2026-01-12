const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');
const uploadAvatar = require('../middleware/uploadAvatar'); 

router.put('/profile', auth, uploadAvatar.single('avatar'), async (req, res) => {
  try {
    const { firstName, lastName, bio, pronouns, socials } = req.body;

    const updateData = {
      firstName,
      lastName,
      bio,
      pronouns,
      socials: socials ? JSON.parse(socials) : {}
    };

    if (req.file) {
      updateData.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateData },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al actualizar perfil' });
  }
});

module.exports = router;
