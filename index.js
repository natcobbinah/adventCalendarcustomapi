const express = require("express");
const app = express();
let cors = require("cors");
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const flutterUserRoute = require("./routes/flutterUserRoute");
const testRoute = require("./routes/testroute");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Advent Calendar",
      description: "ADVENT CALENDAR API Information",
      contact: {
        name: "Cobbinah Nathaniel",
      },
      servers: ["https://localhost:5000"],
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

const port = process.env.PORT || 5000; // Heroku will need the PORT environment variable

app.use(express.json());

//use middlewares
let jsonParser = bodyParser.json();
app.use("/flutter", jsonParser, flutterUserRoute);
app.use("/adventCalendar", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/test", testRoute);

//middlewares
app.use(cors());

app.get("/", function (req, res) {
  //when we get an http get request to the root/homepage
  res.send("Hello World");
});

app.listen(port, () => console.log(`App is live on port ${port}!`));
