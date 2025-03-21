const { StatusCodes } = require("http-status-codes");
const { CityService } = require("../services");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createCity(req,res){
    try {
        const city = await CityService.createCity({
            name: req.body.name,
        })
        SuccessResponse.message = 'city created successfully'
        SuccessResponse.data = city
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = 'Failed to create city'
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
                console.log(error)
    }
}

module.exports = {
    createCity
}