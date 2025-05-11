const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const match = await user.verifierMotDePasse(motDePasse);
    if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, typeUtilisateur: user.typeUtilisateur },
      process.env.SECRET_KEY || 'SECRET_KEY',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      token,
      typeUtilisateur: user.typeUtilisateur,
      message: "Connexion réussie"
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Déconnexion (juste supprimer le token côté client)
exports.logout = (req, res) => {
  res.status(200).json({ message: "Déconnexion réussie" });
};