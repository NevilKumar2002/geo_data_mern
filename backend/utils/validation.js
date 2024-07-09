const validator = require("validator");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const cleanUpAndValidate = ({ name, email, password, confirmPassword, username }) => {
  // Add your validation logic here
};

const generateJWTToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const sendVerificationEmail = async ({ email, verificationToken }) => {
  // Add your email sending logic here
};

module.exports = { cleanUpAndValidate, generateJWTToken, sendVerificationEmail };
