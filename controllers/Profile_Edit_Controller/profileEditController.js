// import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";


// const ProfileEditController = async (req, res) =>{
//     const { role, email, firstname, lastname, username, phonenumber, profilepicture} = req.body;
// try{

//     const existingUser = await Users.findOne( {where: {role, email}});
    
//     if( !existingUser ){
//         res.status(200).json({ message: "Invalid User"})
//     }

//   const  updateProfile = await Users.update({
//         firstname,
//         lastname,
//         username,
//         phonenumber,
//         profilepicture
//     }, { where: {email, role}})

//     if (updateProfile[0] === 0) {
//         return res.status(200).json({ message: "Profile update failed" });
//     }

//     res.status(200).json({ message: "Profile updated successfully" });


//     }catch(error){
//         console.log("error: ", error);
//         res.status(500).json({ message: "Server error"})
//     }

// }


// export default ProfileEditController; 



import Users from "../../models/Student_Models/Student_Registration_Model/StudentRegistrationModel.js";

const ProfileEditController = async (req, res) => {
    const { role, email, firstname, lastname, username, phonenumber, profilepicture } = req.body;
    try {
        const existingUser = await Users.findOne({ where: { role, email } });

        if (!existingUser) {
            return res.status(200).json({ message: "Invalid User" }); // Use return to exit early
        }

        const updateProfile = await Users.update({
            firstname,
            lastname,
            username,
            phonenumber,
            profilepicture
        }, { where: { email, role } });

        if (updateProfile[0] === 0) {
            return res.status(200).json({ message: "Profile update failed" }); // Use return to exit early
        }

        res.status(200).json({ message: "Profile updated successfully" });

    } catch (error) {
        console.log("error: ", error);

        // Check if response has already been sent
        if (!res.headersSent) {
            res.status(500).json({ message: "Server error" });
        }
    }
}

export default ProfileEditController;
