const express = require('express');
const { CityController } = require('../../controllers');
const { CityMiddlewares,AuthMiddlewares } = require('../../middlewares');

const router = express.Router();

router
    .post('/',CityMiddlewares.validateCreateRequest,AuthMiddlewares.authenticate, AuthMiddlewares.authorizeRole('admin'),CityController.createCity);

module.exports = router