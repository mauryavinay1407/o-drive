const express = require('express')
const app = express();
const userRouter = require("./routes/user.routes")

app.set('view engine','ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/user",userRouter)

app.get("/",(req,res)=>{
    res.render("index")
})

module.exports={app}