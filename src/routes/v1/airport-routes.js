const express = require('express');
const { AirportController } = require('../../controllers');
const {AirportMiddlewares,AuthMiddlewares} = require('../../middlewares')

const router = express.Router();

router
    .post('/',AirportMiddlewares.validateCreateRequest,AuthMiddlewares.authenticate, AuthMiddlewares.authorizeRole('admin'),AirportController.createAirport);

router
    .get('/',AuthMiddlewares.authenticate,AirportController.getAirports);

router
    .get('/:id',AuthMiddlewares.authenticate, AirportController.getAirport);

router
    .delete('/:id',AuthMiddlewares.authenticate, AuthMiddlewares.authorizeRole('admin'),AirportController.destroyAirport);

module.exports = router;