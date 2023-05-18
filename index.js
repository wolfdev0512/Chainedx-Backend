const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");

// routes
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoutes.routes);

// Start the server
app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}...`)
);
