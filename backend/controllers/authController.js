const jwt = require('jsonwebtoken');
const Prof = require('../models/Prof');

exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  try {
    const prof = await Prof.findOne({ email });
    if (!prof) return res.status(404).json({ message: "Professeur introuvable" });

    const match = await prof.verifierMotDePasse(motDePasse);
    if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: prof._id }, 'SECRET_KEY', { expiresIn: '1h' });
    res.status(200).json({ token, message: "Connexion réussie" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = (req, res) => {
  // Pas besoin avec JWT, le frontend peut juste supprimer le token
  res.status(200).json({ message: "Déconnexion réussie (côté client)" });
};
