const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const session = require("express-session");
const MongoDbSession = require("connect-mongodb-session")(session);
const userRouter = require("./routes/userRouter");
require("dotenv").config();

const app = express();
const MONGO_URI = process.env.MONGO_URI;

// CORS options
const corsOptions = {
<<<<<<< HEAD
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders:[
    'content-type',
  ],
=======
origin: 'https://geo-data-mern-s3w1.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
>>>>>>> c2d6a0ccf368996613f5e94c08cbbe0145b8fbdd
  credentials: true // Enable credentials (cookies, authorization headers)
};

// Middleware setup
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB session store setup
const store = new MongoDbSession({
  uri: MONGO_URI,
  collection: "sessions",
});

// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret", // Replace with a strong secret
    resave: false,
    saveUninitialized: false,
    store: store, // MongoDB session store instance
  })
);

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch(err => {
  console.error("MongoDB connection error:", err.message);
});

// Routes
app.use("/users", userRouter);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Application");
});

// Logout route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send({
        status: 500,
        message: "Logout failed",
        error: err.message,
      });
    }
    res.clearCookie(process.env.SESSION_NAME);
    res.send({
      status: 200,
      message: "Logout successful",
    });
  });
});

<<<<<<< HEAD

=======
// Start server
>>>>>>> c2d6a0ccf368996613f5e94c08cbbe0145b8fbdd
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
