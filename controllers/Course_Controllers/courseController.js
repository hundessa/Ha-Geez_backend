import sequelize from "../../configurations/sequelize";
import { CourseDetailModel } from "../../models/Course_Creation/CourseCreationModel";


const CourseCreationController = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { courseOutcome, courseRequirement, courseName, courseDescription, courseCategory, courseLevel, courseImage, intendedLearner} = req.body;

        const preCourse = await CourseDetailModel.findOne({
            where: {courseName},
        });

        if(preCourse) {
            await transaction.rollback();
            return res.status(400).json({ message: "Course name already exists" });
        }

        const newCourse = await CourseDetailModel.create({
          courseOutcome,
          courseRequirement,
          courseName,
          courseDescription,
          courseCategory,
          courseLevel,
          courseImage,
          intendedLearner,
        },
    { transaction }
);

await transaction.commit();
res.status(200).json({ message: "Course created successfuly" })
    } catch (error) {
        await transaction.rollback();
        console.error("Error: ", error.message);
        res.status(400).json({ message: "Failed to create course" });   
    }
}

export default CourseCreationController;