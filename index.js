require("dotenv").config();
console.log(`Running in ${process.env.NODE_ENV}`);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const db = require("./src/models");
const apirouter = require("./src/routes/");
const logger = require("./logging/index.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
};
app.use(cors(corsOptions));
app.use(cookieParser());

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Routes
app.use("/api", apirouter);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server is running on port  ${PORT}.`);
    // logger.warn(`Server is running on port  ${PORT}.`);
    // logger.debug(`Server is running on port  ${PORT}.`);
  });
});