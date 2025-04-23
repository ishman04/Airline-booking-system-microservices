const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user-repository');
const AppError = require('../utils/errors/app-error');

const userRepository = new UserRepository();

async function register(data) {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepository.createUser({
      email: data.email,
      password: hashedPassword,
      role: data.role || 'user'
    });
    return {
      id: user.id,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    throw new AppError('Registration failed', 500);  // You can throw a custom error here
  }
}

async function login({ email, password }) {
  try {
    const user = await userRepository.getUserByEmail(email);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid password', 401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  } catch (error) {
    throw new AppError(error.message, 401);
  }
}

module.exports = { register, login };
