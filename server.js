require("dotenv").config();
const express = require("express");
const { logger } = require("./middleware/logEvents");
const mongoose = require("mongoose");
const connect = require("./config/connectDB");
const cors = require("cors");
const corsOptions = require("./controllers/corsOptionController");
const handleCors = require("./middleware/handleCors.js");
const verifyAccessToken = require("./middleware/handleAccessToken");
const PORT = process.env.PORT || 5000;
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");

//Connect to database
connect();

//Custom middleware
app.use(logger);

app.use(handleCors);

app.use(cors(corsOptions));

//Middleware for handling req.body
app.use(express.json());
//Middleware for cookies
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//Middleware for handling static file
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/register", require("./routes/register.js"));
app.use("/login", require("./routes/login.js"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

//Middleware for JWT
app.use(verifyAccessToken);
app.use("/contact", require("./routes/contact.js"));

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
