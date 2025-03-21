const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require('../utils/errors/app-error')


function validateCreateRequest(req,res,next){
    if(!req.body.name){
        ErrorResponse.message = "Name is required"
        ErrorResponse.error = new AppError(['Name not sent in correct form']) 
        return res 
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}