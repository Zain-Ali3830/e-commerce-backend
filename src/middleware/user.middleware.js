const validateUser =async (req, res, next) => {
  if (
    !req.body.fullName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.phone ||
    !req.body.confirmPassword
  ) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  } else if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      message: "Password and confirm password do not match",
    });
  } else if (req.body.password.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long",
    });
  } else if (req.body.phone.length < 11) {
    return res.status(400).json({
      message: "Phone number must be at least 11 digits long",
    });
  }
  next();
};
export default validateUser;
