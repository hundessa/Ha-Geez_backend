import express from "express"
import pkg from 'jsonwebtoken';
import { acceesstokensecret } from "../../configurations/config.js"



const app = express();
const secretKey =  acceesstokensecret;

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("No token provided.");
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).send("Failed to authenticate token.");
    }
    req.userId = decoded.id;
    next();
  });
};

// Example protected route
app.get("/api/protected", verifyToken, (req, res) => {
  res.status(200).send("This is a protected route.");
});

// Additional routes and server setup...

export default verifyToken;