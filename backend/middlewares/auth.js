const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: 'Accès refusé : token manquant' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'SECRET_KEY');
    req.userId = decoded.id;
    req.typeUtilisateur = decoded.typeUtilisateur;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide  ou expiré' });
  }
};

module.exports = verifyToken;
