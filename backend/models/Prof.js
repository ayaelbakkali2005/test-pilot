const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const profSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  }
});

// Crypter le mot de passe avant sauvegarde
profSchema.pre('save', async function (next) {
  if (!this.isModified('motDePasse')) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  next();
});

// Vérifier le mot de passe
profSchema.methods.verifierMotDePasse = function (motDePasse) {
  return bcrypt.compare(motDePasse, this.motDePasse);
};

module.exports = mongoose.model('Prof', profSchema);
