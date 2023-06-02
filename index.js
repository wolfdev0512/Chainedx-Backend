const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config/config");

// routes
const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const faqRoutes = require("./routes/faqRoutes");
// const statusRoutes = require("./routes/statusRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", userRoutes.routes);
app.use("/api/team", teamRoutes.routes);
app.use("/api/faq", faqRoutes.routes);
// app.use("/api/status", statusRoutes.routes);

// Start the server
app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}...`)
);
