const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { Error } = require("mongoose");
const AppError = require('../utils/errors/app-error')


function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message = "Model number is required"
        ErrorResponse.error = new AppError(['Model number not sent in correct form']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}