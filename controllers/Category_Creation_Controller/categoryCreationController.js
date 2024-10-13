import multer from "multer";
import CategoryCreationModel from "../../models/Category_Creation/categoryCreationModel.js";
import fs from "fs/promises";
import path from "path";
import sequelize from "../../configurations/sequelize.js"; 

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: './assets/uploads/category',
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
}).single('image');

const CategoryCreationController = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const transaction = await sequelize.transaction();

    try {
      const { categoryName, categoryDescription } = req.body;

      // Log to check values
      console.log('Request body:', req.body);

      if (!categoryName || !categoryDescription) {
        await transaction.rollback();
        return res.status(400).json({ message: 'Category name and description are required' });
      }

      const precategory = await CategoryCreationModel.findOne({ where: { categoryName }, transaction });

      if (precategory) {
        await transaction.rollback();
        return res.status(400).json({ message: "Category already exists" });
      }

      // Check if file was uploaded
      let categoryImage = null;
      if (req.file) {
        // Read file content if uploaded
        const fileData = await fs.readFile(req.file.path);
        categoryImage = fileData;
      } else {
        await transaction.rollback();
        return res.status(400).json({ message: 'Category image is required' });
      }

      const newCategory = await CategoryCreationModel.create({
        categoryName,
        categoryDescription,
        categoryImage
      }, { transaction });

      await transaction.commit();
      res.status(200).json({ message: "Category created successfully" });
    } catch (error) {
      await transaction.rollback();
      console.error('Error:', error.message);
      if (req.file) {
        await fs.unlink(req.file.path);
      }
      res.status(400).json({ message: error.message });
    }
  });
};

export default CategoryCreationController;