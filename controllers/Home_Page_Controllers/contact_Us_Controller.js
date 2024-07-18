import Contact_Us_Model from "../../models/Home_Page_Models/contact_Us_Model.js"

const contact_us_controller = async (req, res) => {
  const { name, email, phonenumber, message } = req.body;
  try {
    const newmessage = await Contact_Us_Model.create({
      name,
      email,
      phonenumber,
      message,
    });
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export default contact_us_controller;
