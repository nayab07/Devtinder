var jwt = require('jsonwebtoken');
const User=require("../models/user")



const userAuth= async(req,res,next)=>{
    //Reading the token from the req cookies
 try{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).send("please login");
    }

    const decodeObj=await jwt.verify(token,"ShamsTinder$266")

    const{_id}=decodeObj;
    const user=await User.findById(_id);
    if(!user){
        throw new Error("User does not exist")
    }
    
    req.user=user;
    next()
    } catch (err){
        res.status(400).send("ERROR:" + err.message)
    }


}
module.exports={
    userAuth,
}