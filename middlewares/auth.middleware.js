const jwt=require("jsonwebtoken")
const { User } = require("../models/user.model")

const authMiddleware = async(req,res,next)=>{
    try {
        const token=req.cookies?.token;
        if(!token)
            return res.status(403).json({
                message:"Unauthorize access!"
            });

            const decodedToken=await jwt.verify(token,process.env.SECRET_KEY);

        const user=await User.findById(decodedToken.id);
        if(!user)
        return res.status(403).json({
            message:"Unauthorize access!"
        });
        
        next();

    } catch (error) {
        return res.status(500).json({
            message: "Unauthorize access!.",
        });
    }
    

}

module.exports={authMiddleware}