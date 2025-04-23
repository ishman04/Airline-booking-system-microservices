const express = require("express");
const cookieParser = require('cookie-parser');
const { ServerConfig } = require("./config");
const apiRoutes = require('./routes')


const app = express();

app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api',apiRoutes);

app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
});
