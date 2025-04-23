const express = require('express');
const { FlightController } = require('../../controllers');
const {FlightMiddlewares,AuthMiddlewares} = require('../../middlewares')

const router = express.Router();

router.post('/',
    FlightMiddlewares.validateCreateRequest,AuthMiddlewares.authenticate, AuthMiddlewares.authorizeRole('admin'),FlightController.createFlight);

router.get('/',
    AuthMiddlewares.authenticate,
    FlightController.getAllFlights);

router.get('/:id',
    AuthMiddlewares.authenticate,
    FlightController.getFlight);

router.patch('/:id/seats',
    FlightMiddlewares.validateUpdateSeatsRequest,
    AuthMiddlewares.authenticate,AuthMiddlewares.authorizeRole('admin'),
    FlightController.updateSeats);

module.exports = router;