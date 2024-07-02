const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//Importing Route
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

app.use("/api/v1",productRoute);
app.use("/api/v1",userRoute);

const errorMiddleware = require("./middleware/error");
app.use(errorMiddleware);


module.exports = app;