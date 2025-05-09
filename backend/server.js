require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Votre URI MongoDB exacte
const DB_URI = 'mongodb+srv://examUser:hanaefahssi09@cluster0.n7hkske.mongodb.net/test-pilot?retryWrites=true&w=majority&appName=Cluster0';
// Connexion MongoDB optimisée
const startApplication = async () => {
  try {
    // Étape 1: Connexion à MongoDB
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 20000
    });
    console.log('✅ Connexion MongoDB établie');

    // Étape 2: Lancement du serveur
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`✅ Serveur en écoute sur http://localhost:${PORT}`);
    });

    // Gestion propre de la fermeture
    process.on('SIGTERM', () => {
      server.close(() => {
        mongoose.connection.close();
        console.log('Process terminé');
      });
    });

  } catch (error) {
    console.error('❌ Échec critique:', error.message);
    process.exit(1);
  }
};

startApplication();