const express=require("express");
const {validateSingnUpData}=require("../utils/validation")
const User=require("../models/user")
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser')


const authRouter=express.Router();

authRouter.post("/signup",async(req,res)=>{
    const {firstName,lastName,emailId,Password,photoUrl,gender,age,about}=req.body;
try{
    // validation of data
    validateSingnUpData(req);

    //encryption password
    const PasswordHash=await bcrypt.hash(Password,10)

    const user=new User({firstName,photoUrl,gender,age,about ,lastName,emailId,Password:PasswordHash})
      
    await user.save();
    res.send("user added successfull");
 }catch (err){
   res.status(400).send("ERROR:" +err.message)
 }
})

//Login api
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, Password } = req.body;

        // Validate inputs
        if (!emailId || !Password) {
            return res.status(400).send("Email and password are required");
        }

        // Fetch user from database
        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(401).send("Invalid email or password");
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid email or password");
        }

        // Successful login
        //create jwt token
        const token=await user.getJWT(); 

        //add the token to cookie and send the response back to the user
        res.cookie("token",token)
        res.json(user);
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).send("An error occurred during login");
    }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("Logout Successful")
})

module.exports=authRouter;