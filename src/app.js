const express=require("express");
const connectDB=require("./config/database")
const app=express();
var cookieParser = require('cookie-parser')
const cors=require("cors")


const corsOptions = {
    origin: "http://localhost:5173", 
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  };
  
app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())


const authRouter=require("./routers/auth")
const profileRouter=require("./routers/profile")
const requestRouter=require("./routers/requests")
const userRouter=require("./routers/user")

app.use("/",authRouter);
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)

connectDB().then(()=>{
    console.log("Database connnection is successful")
    app.listen(7777,()=>{
        console.log("server is sccessfully running")
    });
})
.catch((err)=>{
    console.error("database can not be connected",err.message)
})
