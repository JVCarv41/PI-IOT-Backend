const jwt = require('jsonwebtoken');

// Middleware para proteger rotas
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization; // Pega token do header
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

  const token = authHeader.split(' ')[1]; // Separa "Bearer token"

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica token
    req.userId = decoded.userId; // Salva ID no request
    next(); // Continua
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = authMiddleware;
