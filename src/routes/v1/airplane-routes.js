const express = require('express');
const { AirplaneController } = require('../../controllers');
const {AirplaneMiddlewares,AuthMiddlewares} = require('../../middlewares')

const router = express.Router();

router
    .post('/',AirplaneMiddlewares.validateCreateRequest,AuthMiddlewares.authenticate, AuthMiddlewares.authorizeRole('admin') ,AirplaneController.createPlane);

router
    .get('/',AuthMiddlewares.authenticate,AirplaneController.getAirplanes);

router
    .get('/:id',AuthMiddlewares.authenticate,AirplaneController.getAirplane);

router
    .delete('/:id',AuthMiddlewares.authenticate, AuthMiddlewares.authorizeRole('admin'),AirplaneController.destroyAirplane);

module.exports = router;