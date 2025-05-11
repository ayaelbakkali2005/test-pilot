const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Accès refusé : token manquant' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.profId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide' });
  }
};

module.exports = verifyToken;
