const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const session = require("express-session");
const mongoDbsession = require("connect-mongodb-session")(session);
const userRouter = require("./routes/userRouter");
const MONGO_URI='mongodb+srv://Kumar:1234567890@cluster0.y0tweds.mongodb.net/geoDataApp'
const app = express();

// Middlewares
const corsOptions = {
  origin: 'https://geo-data-mern-1f9l.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  credentials:true
};


app.use(cors(corsOptions));
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store = new mongoDbsession({
    uri: MONGO_URI,
    collection: "sessions",
});

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

app.use(
    session({
        secret: "Hello World",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use("/api/users", userRouter);

app.get("/", (req, res) => {
    res.send("Welcome to Application");
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
