const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Use env var

// REGISTRO
const register = async (name, email, password) => {
  // Verifica se o e-mail já existe
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  // Cria novo usuário
  const newUser = new User({
    name,
    email,
    password
  });

  return await newUser.save();
};

// LOGIN
const login = async (email, password) => {
  // Verifica se o usuário existe
  const user = await User.findOne({ email }).select('+password'); // Inclui senha
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Compara a senha
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  // Gera token
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};

module.exports = {
  register,
  login
};
