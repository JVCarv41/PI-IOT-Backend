const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Rota protegida - só com token válido
router.get('/protected', authMiddleware, (req, res) => {
  console.log('Register Route');
  res.json({ message: 'Acesso autorizado!' });
});

module.exports = router;
