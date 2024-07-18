// import express from "express"
// import verifyToken from "../../../middlewares/authentication_middleware/jwt_token.js"

// const jwt_router = express.Router();

// // Example protected route
// jwt_router.get('/protected', verifyToken, (req, res) => {
//   res.status(200).send('This is a protected route.');
// });

// export default jwt_router;


// Example protected route

import express from 'express';
import { authMiddleware } from "../../../routes/Authentication_Routes/jwt_authentication/jwt_verification_route.js"

const router = express.Router();

router.get('/api/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route.', user: req.user });
});

export default router;
