// controllers/auth-controller.js
const { StatusCodes } = require('http-status-codes');
const { AuthService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function register(req, res) {
  try {
    const response = await AuthService.register({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role || 'user'
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

async function login(req, res) {
  try {
    const response = await AuthService.login({
      email: req.body.email,
      password: req.body.password
    });

    res.cookie('token', response.token, {
      httpOnly: true,
      maxAge: 3600000,  // 1 hour
      sameSite: 'Strict'
    });

    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = { register, login };
