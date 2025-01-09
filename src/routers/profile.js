const express = require("express");
const bcrypt = require('bcrypt');
const User=require("../models/user")

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

//profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("invalid edit request");
      // return res.status(400).send("")
    }
    const loggedInUser = req.user;
    
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();

    res.json({message: `${loggedInUser.firstName} , Your profile is updated`,
      data:loggedInUser,
    });
   
    await loggedInUser.save();
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});



profileRouter.patch('/profile/password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        // Find the user by token and check if it's not expired
        const user = await User.findOne({
            resetToken: token,
            tokenExpiry: { $gt: Date.now() }, // Ensure the token is still valid
        });

        if (!user) {
            return res.status(400).send("Invalid or expired token");
        }

        // Hash the new password
        const saltRounds = 10;
        user.Password = await bcrypt.hash(newPassword, saltRounds);

        // Clear the reset token and expiry
        user.resetToken = undefined;
        user.tokenExpiry = undefined;
        await user.save();

        res.send("Password has been reset successfully");
    } catch (err) {
        console.error("Error in reset-password:", err.message);
        res.status(500).send("An error occurred");
    }
});


module.exports = profileRouter;
