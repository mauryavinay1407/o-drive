const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.routes")

app.set('view engine','ejs');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));

app.use("/user",userRouter)
app.use("/",indexRouter)

app.get("/",(req,res)=>{
    res.render("index")
})

module.exports={app}