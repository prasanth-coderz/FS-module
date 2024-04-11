// THIS FILE IS USED TO CREATE & RUN LOCAL SERVER (PORT:3000)

const express = require("express");
const cors = require("cors");
const routes = require("./routes/jsonRoutes");

const app = express();
const port = 3000;

app.use(cors());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
