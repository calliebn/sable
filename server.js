const express = require("express");
let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
// let numExpectedSources = 2;
const mongoose = require("mongoose");
const routes = require("./routes");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Define API routes here
app.use(routes);

// Connect to Mongo DB
let store = new MongoDBStore({
  uri: process.env.MONGODB_URI || "mongodb://localhost/yarndb",
  collection: "mysession"
});

// Catch errors
store.on('error', function (error) {
  console.log(error);
});

app.use(require('express-session')({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 //cookie valid for 1 week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/yarndb",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   }
// )

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
