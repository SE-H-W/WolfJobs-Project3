const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 8000;

const expressLayouts = require("express-ejs-layouts");

const connectDB = require("./config/mongoose");

//Used for session cookie

const session = require("express-session");

const passport = require("passport");

const passportLocal = require("./config/passport-local-strategy");

const passportJWT = require("./config/passport-jwt-strategy");

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

app.use(expressLayouts);

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//Set up view engine

app.set("view engine", "ejs");

app.set("views", "./views");

app.use(
  session({
    name: "wolfjobs",
    //TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use express router

app.use("/", require("./routes"));

async function startServer() {
  try {
    await connectDB();
    console.log("Connected to database :: MongoDB");

    const server = app.listen(8000, () => {
      console.log(`Server is running on port ${8000}`);
    });

    // Export the server for testing
    module.exports = server;
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
