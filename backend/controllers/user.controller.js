const User = require('../models/User')

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil' })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const { bio, socials } = req.body

    const updateData = {
      bio,
      socials: socials ? JSON.parse(socials) : {},
    }

    if (req.file) {
      updateData.avatar = `/uploads/avatars/${req.file.filename}`
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    )

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar perfil' })
  }
}
