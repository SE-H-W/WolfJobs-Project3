const express = require("express");
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = 8000;

const expressLayouts = require("express-ejs-layouts");
const coverLetterRoutes = require("./routes/coverletter")
const connectDB = require("./config/mongoose");

//Used for session cookie

const session = require("express-session");
// const keywordRoutes = require('./routes/keywords');
const jobRoutes = require('./routes/job');
const passport = require("passport");
const keywordsRoutes = require('./routes/keywords');
const passportLocal = require("./config/passport-local-strategy");

const passportJWT = require("./config/passport-jwt-strategy");
const MongoStore = require('connect-mongo');
const fetch = require('node-fetch');
global.fetch = fetch;

const { Headers } = require('node-fetch');
global.Headers = Headers;

app.use(
  cors({
    origin:["http://localhost:5173", "http://127.0.0.1:5173"], // Replace with your frontend URL
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

// app.use(
//   session({
//     name: "wolfjobs",
//     //TODO change the secret before deployment in production mode
//     secret: "blahsomething",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       maxAge: 1000 * 60 * 100,
//     },
//   })
// );
app.use(
  session({
    name: "wolfjobs",
    secret: "blahsomething", // TODO: Change for production
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL || "mongodb+srv://admin:admin@cluster0.d0pccup.mongodb.net/WolfJobs?retryWrites=true&w=majority",
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
    cookie: {
      maxAge: 10 * 60 * 1000, // Set as session-only cookie (expires on reload/close)
      secure: false, // true if using HTTPS
    },
  })
);


app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// app.use('/keywords', keywordRoutes);
app.use('/api/v1/job', jobRoutes);
app.use('/api/v1/keywords', keywordsRoutes);
//Use express router

app.use("/", require("./routes"));
app.use("/api/v1/coverletter", coverLetterRoutes);
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
