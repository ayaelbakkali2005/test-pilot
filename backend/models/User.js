const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  nom: {
    type: String,       // Nom de l'utilisateur
    required: true
  },
  prenom: {
    type: String,       // Prénom de l'utilisateur
    required: true
  },
  dateNaissance: {
    type: Date,         // Date de naissance
    required: true
  },
  sexe: {
    type: String,       // Sexe (Homme ou Femme)
    enum: ['Homme', 'Femme'], 
    required: true
  },
  etablissement: {
    type: String,       // Établissement scolaire
    required: true
  },
  filiere: {
    type: String,       // Filière d'études
    required: true
  },
  typeUtilisateur: {
    type: String,       // Type d'utilisateur : "enseignant" ou "etudiant"
    enum: ['enseignant', 'etudiant'],
    required: true
  }
});



// Crypter le mot de passe avant sauvegarde
userSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  next();
});

// Vérifier le mot de passe
userSchema.methods.verifierMotDePasse = function (motDePasse) {
  return bcrypt.compare(motDePasse, this.motDePasse);
};

module.exports = mongoose.model('User', userSchema);