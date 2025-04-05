const express = require("express");

const { ServerConfig } = require("./config");
const apiRoutes = require('./routes')


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
  const {City, Airport} = require('./models')
  const city = await City.findByPk(1)
  console.log(city)
  const airport = await city.createAirport({name: 'Kempegowda Airport',code: 'BLR'})
  console.log(airport)
});
