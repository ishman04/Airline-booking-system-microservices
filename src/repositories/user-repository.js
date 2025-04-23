const CrudRepository = require('./crud-repository');
const { User } = require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new AppError('User not found', StatusCodes.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new AppError('Something went wrong while fetching user by email', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser({ email, password, role = 'user' }) {
    try {
      const user = await User.create({ email, password, role });
      return user;
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new AppError('Email already exists', StatusCodes.BAD_REQUEST);
      }
      throw new AppError('Failed to create user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

module.exports = UserRepository;
