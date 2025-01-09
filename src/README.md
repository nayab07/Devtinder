<!-- serer / routing -->

app.use("/hello",(req,res)=>{
res.send({ userName:"shams",password:"123456"})
})

app.use("/hello",(req,res)=>{
res.send("hello hello hello")
})

app.use("/",(req,res)=>{
res.send("hi shams")
}) -->
