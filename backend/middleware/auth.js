const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: { message: 'Access denied' } });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(400).json({ error: { message: 'Invalid token' } });
  }
};
