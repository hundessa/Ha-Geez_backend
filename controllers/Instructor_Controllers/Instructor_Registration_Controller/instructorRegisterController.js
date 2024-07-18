import bcrypt from "bcryptjs";
import multer from "multer";
import path from 'path';
import fs from 'fs/promises';
import sequelize from "../../../configurations/sequelize.js";
import instructorRegister from "../../../models/Instructor_Models/Instructor_Registration_Model/instructorRegisterModel.js";
import Users from "../../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";
import Roles from "../../../helpers/Roles.js";


// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: './assets/uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpeg, and jpg format allowed!'));
    }
  },
}).single('file');

const instructorRegisterController = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const {
        firstname,
        lastname,
        username,
        email,
        phonenumber,
        yearsofexperiance,
        fieldofstudy,
        levelofeducation,
        password,
      } = req.body;

      console.log('Request body:', req.body);

      const transaction = await sequelize.transaction();

      try {
        const existingUser = await Users.findOne({ where: { email } }, { transaction });

        if (existingUser) {
          console.log('User already exists:', email);
          return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
          firstname,
          lastname,
          username,
          email,
          phonenumber,
          password: hashedPassword,
          role: Roles.Instructor,
        }, { transaction });

        console.log('User created successfully:', newUser);

        //  // Read file content
        //  const fileData = await fs.readFile(req.file.path);

        // Check if file was uploaded
        let professionalcertificate = null;
        if (req.file) {
          // Read file content if uploaded
          const fileData = await fs.readFile(req.file.path);
          professionalcertificate = fileData;
        }

        const newInstructor = await instructorRegister.create({
          userId: newUser.id,
          email,
          levelofeducation,
          fieldofstudy,
          yearsofexperiance,
          // professionalcertificate: {
          //   name: req.file.originalname,
          //   description: req.body.description,
          //   location: req.body.location,
          //   file: {
          //     data: await fs.readFile(req.file.path),
          //     contentType: req.file.mimetype,
          //   }
          // },
          professionalcertificate, // Store file content as binary data
          
        }, { transaction });

        console.log('Instructor registered successfully:', newInstructor);

        await transaction.commit();
        res.status(201).json({ message: "Account Created" });
      } catch (error) {
        await transaction.rollback();
        console.error('Error:', error.message);
        if (req.file) {
          await fs.unlink(req.file.path);
        }
        res.status(400).json({ message: error.message });
      }
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ message: 'Unexpected error occurred' });
  }
};

export default instructorRegisterController;

