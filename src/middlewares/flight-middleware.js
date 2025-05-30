const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require('../utils/errors/app-error')


function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message = "Something went wrong while creating flight"
        ErrorResponse.error = new AppError(['Flight number not found in request']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = "Something went wrong while creating flight"
        ErrorResponse.error = new AppError(['AirplaneId not found in request']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = "Something went wrong while creating flight"
        ErrorResponse.error = new AppError(['Departure airport id not found in request']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "Something went wrong while creating flight"
        ErrorResponse.error = new AppError(['Arrival airport id not found in request']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = "Something went wrong while creating flight"
        ErrorResponse.error = new AppError(['Arrival time not found in request']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message = "Something went wrong while creating flight"
        ErrorResponse.error = new AppError(['Departure time not found in request']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message = "Something went wrong while creating flight"
        ErrorResponse.error = new AppError(['Price not found in request']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message = "Something went wrong while creating flight"
        ErrorResponse.error = new AppError(['Total seats not found in request']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();

}

function validateUpdateSeatsRequest(req,res,next){
    console.log('Incoming Body:', req.body);
    if(!req.body.seats){
        ErrorResponse.message = "Something went wrong while updating flight"
        ErrorResponse.error = new AppError(['seats not found in request']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest,
    validateUpdateSeatsRequest
}