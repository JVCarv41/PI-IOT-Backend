const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middlewares/validateUser');

router.post('/register', validateRegister, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await authController.register(name, email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send the error message to the client
  }
});

router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authController.login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send the error message to the client
  }
});

module.exports = router;
