import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use secure: true in production
}));
