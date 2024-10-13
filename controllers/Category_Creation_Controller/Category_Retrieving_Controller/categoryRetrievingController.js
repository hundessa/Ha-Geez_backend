import CategoryCreationModel from "../../../models/Category_Creation/categoryCreationModel.js";

const CategoryRetrievingController = async (req, res) => {
  const { role } = req.body;

  if (role !== "Admin") {
    return res.status(200).json({ message: "Invalid role" });
  }

  try {
    const categories = await CategoryCreationModel.findAll();
    const categoriesDetails = categories.map((category) => ({
      categoryName: category.categoryName,
      categoryDescription: category.categoryDescription,
      categoryImage: {
        data: category.categoryImage,
        contentType: category.categoryImageContentType
      }
    }));
    console.log('Categories:', categoriesDetails); // Log the categories
    res.status(200).json(categoriesDetails);
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ message: "Server error" });
  }
}

export default CategoryRetrievingController;

