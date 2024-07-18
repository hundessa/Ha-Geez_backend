import express from "express";
import verifyToken from "../../../routes/Authentication_Routes/jwt_authentication/jwt_verification_route.js"

const app = express();
const verifyToken = require('./path/to/verifyToken');

// Define your routes
app.use('/api/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route.' });
});

// Other routes...
app.get('/api/public', (req, res) => {
  res.status(200).json({ message: 'This is a public route.' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
