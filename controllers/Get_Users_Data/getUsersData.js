const getUserData = async (req, res) => {
  // Check if req.user exists (set by authProtect middleware)
  if (req.user) {
    res.json({
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email,
      phonenumber: req.user.phonenumber,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export default getUserData;
