const { StatusCodes } = require('http-status-codes')
const {FlightService} = require('../services')
const { SuccessResponse, ErrorResponse } = require('../utils/common')

async function createFlight(req,res){
    try {
        const flight = await FlightService.createFlight({
            flightNumber : req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        })
        SuccessResponse.message = 'Flight created successfully'
        SuccessResponse.data = flight
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Failed to create flight'
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
                console.log(error)
    }
}

async function getAllFlights(req,res){
    try {
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        console.error('Error in getAllFlights:', error);
        ErrorResponse.error = error;
        ErrorResponse.message = 'Failed to get all flights'
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
async function getFlight(req,res){
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}