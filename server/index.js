// Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");
// const cors = require('cors');  // we don't need it anymore, because we use proxy server instead

// DB Setup (connect mongoose and instance of mongodb)
mongoose.connect(
  "mongodb://localhost:27017/communaute2019",
  {
    useMongoClient: true,
  },
  (err) => {
    // Check if database was able to connect
    if (err) {
      console.log("Could NOT connect to database: ", err); // Return error message
    } else {
      console.log("Connected to communaute2019"); // Return success message
    }
  }
);

// App Setup (morgan and body-parser are middleware in Express)
app.use(morgan("combined")); // middleware for logging
app.use(bodyParser.json({ type: "*/*" })); // middleware for helping parse incoming HTTP requests
// app.use(cors());  // middleware for circumventing (规避) cors error

// Router Setup
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);
