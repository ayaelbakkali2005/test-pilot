require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(✅ Serveur en ligne sur http://localhost:${PORT});
    });
  } catch (err) {
    console.error('❌ Échec de démarrage du serveur:', err.message);
    process.exit(1);
  }
};

startServer();