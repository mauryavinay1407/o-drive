const {app} = require("./app");
const {connectDB} = require("./config/db");
const dotenv=require("dotenv")
dotenv.config({path:"./.env"})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||3001,()=>{
        console.log(`Server is running at http://localhost:${process.env.PORT||3001}`);
    })
})
.catch((err)=>{
    console.error("Server and DB connection is failed");
})