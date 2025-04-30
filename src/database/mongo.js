const mongoose = require('mongoose');

// Função para conectar ao MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Usa URI do .env
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro na conexão MongoDB:', error);
    process.exit(1); // Se falhar, encerra o processo
  }
};

module.exports = connectDB;
