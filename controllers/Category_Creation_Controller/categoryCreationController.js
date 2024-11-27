import CategoryCreationModel from "../../models/Category_Creation/categoryCreationModel.js";
import sequelize from "../../configurations/sequelize.js";

const CategoryCreationController = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { categoryName, categoryDescription, categoryImage } = req.body;

    // Log incoming data to debug
    console.log("Request body:", req.body);

    if (!categoryName || !categoryDescription || !categoryImage) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Category name, description, and image URL are required",
      });
    }

    const precategory = await CategoryCreationModel.findOne({
      where: { categoryName },
      transaction,
    });

    if (precategory) {
      await transaction.rollback();
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = await CategoryCreationModel.create(
      {
        categoryName,
        categoryDescription,
        categoryImage, // Save the URL directly
      },
      { transaction }
    );

    await transaction.commit();
    res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    await transaction.rollback();
    console.error("Error:", error.message);
    res.status(400).json({ message: "Failed to create category" });
  }
};

export default CategoryCreationController;
