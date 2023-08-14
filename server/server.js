require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
};

// Add request body parser and cors middlewares using app.use()
app.use(cors(corsOptions));
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

// Open Mongoose connection to MongoDB database
const db = require("./app/models");
const dbConfig = require("./app/config/db.config.js");
const Role = db.role;
db.mongoose
  // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  // .connect(`mongodb+srv://${dbConfig.HOST}:${dbConfig.PASSWORD}@${dbConfig.DB}.rdkgayz.mongodb.net/${dbConfig.DB_NAME}?retryWrites=true&w=majority`, {
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// Initialize user, admin, moderator entries in Roles collection
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("Error", err);
        }

        console.log("Added 'user' to Roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("Error", err);
        }

        console.log("Added 'moderator' to Roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("Error", err);
        }

        console.log("Added 'admin' to Roles collection");
      });
    }
  });
}

// Base route
app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

// Authentication and authorization routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// Set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});