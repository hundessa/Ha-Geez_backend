import { accesstokensecret } from "../configurations/config.js"
import jwt from 'jsonwebtoken';


const generateToken = (res, user) => {
  const token = jwt.sign({email: user.email, id: user.id, role: user.role}, accesstokensecret, { expiresIn: '1h' }); // Adjust expiration as needed
  console.log('Generated Token:', token);
  console.log('User data:', user);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'production',
    sameSite: 'strict',
    domain: 'localhost',
    maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
  })
};

export default generateToken;