const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect(
    "mongodb+srv://shams:MocXLULJ0CQEFZLr@tinder.rbwjo.mongodb.net/Tinder-Database"
    )
}

module.exports=connectDB;
