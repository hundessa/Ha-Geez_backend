import express from "express";
import session from "express-session";
import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from "dotenv";
import SequelizeStore from 'connect-session-sequelize';
import bcrypt from "bcryptjs";
import { LOCALHOST_PORT, sessionSecret } from "./configurations/config.js";
import sequelize from "./configurations/sequelize.js";
import studentRegistrationRoute from "./routes/Student_Routes/Student_Registration_Route/StudentRegistrationRoute.js";
import loginRouter from "./routes/Authentication_Routes/loginRoute.js";
import contactUsRouter from "./routes/Home_Page_Routes/contact_Us_Route.js";
import instructorRegisterRouter from "./routes/Instructor_Routes/Instructor_Registration_Route/instructorRegisterRoute.js";
import forgotpasswordroute from "./routes/Password_Recovery_Routes/forgot_password_route.js"
import otpRoutes from "./routes/Password_Recovery_Routes/otp_Route.js"
import ChangePasswordRoute from "./routes/Password_Recovery_Routes/Change_Password_Route.js";
import instructorListRoute from "./routes/Instructors_list_route/instructors_list_route.js";
import students_list_route from "./routes/Students_list_route/students_list_route.js";
import Users from "./models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";
import Roles from "./helpers/Roles.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SequelizeStoreSession = SequelizeStore(session.Store);
const sessionStore = new SequelizeStoreSession({
  db: sequelize,
});

app.use(
  session({
    secret: sessionSecret,
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      maxAge: 300000, // 5 minutes for testing
    },
  })
);

sessionStore.sync(); // Make sure the session table is created

(async () => {
  try {
    await sequelize.sync();

 // Check if an admin user exists; if not, create one
 try {
  const prevAdmin = await Users.findOne({ where: { role: 'Admin' } });
  if (!prevAdmin) {
   const hashedPassword = await bcrypt.hash("admin@ha", 10)
    const newAdmin = await Users.create({
      firstname: "admin",
      lastname: "adminn",
      username: "admin",
      email: "admin@mail.com",
      phonenumber: "0909090909",
      password: hashedPassword,
      role: Roles.Admin
    });
    console.log("Admin user created:", newAdmin);
  } else {
    console.log("Admin user already exists.");
  }
} catch (err) {
  console.error("Error creating admin user:", err);
}

    console.log("Database Connected successfully");
} catch (error) {
    console.log("Error connecting to db: ", error);
  }
})();

app.use("/", studentRegistrationRoute);

app.use("/", loginRouter);

app.use("/", contactUsRouter);

app.use("/", instructorRegisterRouter);

app.use("/", forgotpasswordroute);

app.use("/", otpRoutes);

app.use("/", ChangePasswordRoute);

app.use("/", instructorListRoute);

app.use("/", students_list_route);

// app.use('/api/protected', verifyToken, (req, res) => {
//   res.status(200).json({ message: 'This is a protected route.' });
// });

// // Other routes...
// app.get('/api/public', (req, res) => {
//   res.status(200).json({ message: 'This is a public route.' });
// });

app.use((req, res, next) => {
  console.log('Session data:', req.session);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to");
});

app.listen(LOCALHOST_PORT || 3000, () => {
  console.log(`server listening on port ${LOCALHOST_PORT}`);
});

