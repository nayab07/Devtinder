const mongoose = require("mongoose");
var validator = require('validator');
var jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trin: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error ("invalid email")
        }
    },
  },
  Password: {
    type: String,
    required: true,
    validate(value){
        if(!validator.isStrongPassword(value)){
            throw new Error ("password is not strong")
        }
    },
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender data is not valid");
      }
    },
  },
  photoUrl: {
    type: String,
  },
  about: {
    type: String,
    default: "some random string",
  },
  skills: {
    type: [String],
  },
},
{
    timestamps:true,
});

userSchema.methods.getJWT=async function (){
  const user= this;

  const token=await jwt.sign({_id:user._id},"ShamsTinder$266",{expiresIn:"1d",})

  return token;
}

const User = mongoose.model("User", userSchema);
module.exports = User;
