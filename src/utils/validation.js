const validator = require("validator");

const validateSingnUpData = (req) => {
  const { firstName, lastName, emailId, Password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("please enter valid Name" );
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "about",
    "skills",
    "photoUrl",
    "age",
    "gender",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = {
  validateSingnUpData,
  validateEditProfileData,
};
