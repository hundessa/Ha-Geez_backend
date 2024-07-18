// import pkg from 'jsonwebtoken';
// import cookie from "cookie-parser";


// const { sign, verify } = pkg;


// const createToken = (user) => {
//     const accessToken = sign({ email: user.email, id: user.id}, accesstokensecret, { expiresIn: '24h' });

// // resizeBy.json({ acceessToken: accessToken})
//     return accessToken;
// }


// export default createToken;


// jwtMiddleware.js

import { accesstokensecret } from "../../configurations/config.js"
import jwt from 'jsonwebtoken';


export const createToken = (user) => {
  return jwt.sign({email: user.email, id: user.id, rle: user.role}, accesstokensecret, { expiresIn: '1h' }); // Adjust expiration as needed
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    return null;
  }
};

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.sendStatus(403); // Forbidden
    }
  } else {
    res.sendStatus(401); // Unauthorized
  }
};
