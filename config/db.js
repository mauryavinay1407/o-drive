const mongoose=require("mongoose");

const connectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        console.log("DB is connected");
    } catch (error) {
        console.log("DB connected failed!!!");
        
    }
}
module.exports={connectDB};