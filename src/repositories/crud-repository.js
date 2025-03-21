const { StatusCodes } = require("http-status-codes");
const { where } = require("sequelize");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }
  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    return response;
  }
  async getAll() {
    const response = await this.model.findAll();
    return response;
  }
  async update(id, data) {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    });
    return response;
  }
  async get(id) {
    const response = await this.model.findByPk(id);
    if(!response){
        throw new AppError('Airplane not found',StatusCodes.NOT_FOUND)
    }
    return response;
  }
}


module.exports = CrudRepository;
