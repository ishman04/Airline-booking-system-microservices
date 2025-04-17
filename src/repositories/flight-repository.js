const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport} = require('../models')
const { Sequelize } = require('sequelize')
const db = require('../models');
const { addRowLockOnFlights } = require("./queries");

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }
    async getAllFlights(filter,sort){
        const response = await this.model.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true, //convert outer join to inner join
                    as: "airplaneDetail"
                    
                },
                {
                    model: Airport,
                    required: true,
                    as: "departureAirport",
                    on : {
                        col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                    } ,
                    
                },
                {
                    model: Airport,
                    required: true,
                    as: "arrivalAirport",
                    on : { //needed if want to join using some other column instead of primary key
                        col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    } ,
                    
                }
            ] 
        });
        return response;
    }
    async updateRemainingSeats(flightId,seats,dec = 1){
        await db.sequelize.query(addRowLockOnFlights(flightId))
        const flight = await Flight.findByPk(flightId);
        if(parseInt(dec)){
             await flight.decrement('totalSeats',{by: seats});
        }else{
            await flight.increment('totalSeats',{by: seats});
        }
        return flight;
    }
}

module.exports = FlightRepository;