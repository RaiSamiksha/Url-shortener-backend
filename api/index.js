require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("../src/models");
const apirouter = require("../src/routes");
const logger = require("../logging/index.js");

const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:4200",
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
};

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API! Use /api to access the endpoints.");
});

// Routes
app.use("/api", apirouter);

// Export the app
module.exports = app;

// Conditional start for local development
if (require.main === module) {
  const PORT = process.env.PORT || 8080;

  db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}.`);
    });
  });
}
