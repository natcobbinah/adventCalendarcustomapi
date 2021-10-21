const express = require("express");
const app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const flutterUserRoute = require("./routes/flutterUserRoute");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

//initialize db connectivity options
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Sports Management System",
      description: "SPORTS-MGMT-SYSTEM API Information",
      contact: {
        name: "Cobbinah Nathaniel",
      },
      servers: ["https://localhost:3002"],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//use middlewares
let jsonParser = bodyParser.json();

app.use(express.json());
app.use(cors());
app.use("/flutter", jsonParser, flutterUserRoute);
app.use("/adventCalendar", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.listen(5000 || 5000, () => {
  console.log("Server running");
});
