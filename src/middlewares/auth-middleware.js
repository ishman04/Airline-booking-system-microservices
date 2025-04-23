const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

function authenticate(req, res, next) {
  try {
    const token = req.cookies.token; // Get the token from the cookie
    if (!token) {
      throw new AppError('Token not provided', StatusCodes.UNAUTHORIZED);
    }

    const payload = jwt.verify(token, process.env.JWT_KEY);  // Verify the token
    req.user = payload;  // Attach the user info to the request object
    next();
  } catch (error) {
    return res.status(error.statusCode || StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Failed to authenticate user',
      data: {},
      err: error.message
    });
  }
}


function authorizeRole(role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      throw new AppError('You are not authorized to perform this action', StatusCodes.FORBIDDEN);
    }
    next();
  };
}

module.exports = {
  authenticate,
  authorizeRole
};
