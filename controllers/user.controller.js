const {userFormat} = require("../utils/zodValidation");
const {User} = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUserGET = (req,res)=>{
    res.render("sign-up");
}

const signInUserGET = (req,res)=>{
    res.render("login");
}

const signUpUserPOST = async(req,res)=>{
       
    const {username,email,password} = req.body;
     
    const obj = req.body;

    const result = userFormat.safeParse(obj);
    if (!result.success) {
        const errors = result.error.issues.map(issue => ({
            path: issue.path[0],
            message: issue.message
        }));

        return res.status(401).json({
            message: "Invalid data",
            errors: errors
        });
    }

    const isUserExist = await User.findOne({email:email})

    if(isUserExist)
        throw new Error("User with this username already exist, try login");
   
    const encryptedPassword = await bcrypt.hash(password,10);

    const savedUser = await User.create({
        username,
        email,
        password:encryptedPassword
    })
    res.json({
        msg:"Registered Successfully"
    })
}

const signInUserPOST = async(req,res)=>{
    const {email,password}= req.body;
    console.log(req.body);
    if(!email || !password)
    throw new Error("Email and password both field are required");
   
    const user=await User.findOne({email:email});
     if(!user)
     throw new Error("User not exists,kindly signup first")
     
     const isPasswordCorrect= await bcrypt.compare(password,user.password);
     if(!isPasswordCorrect)
      throw new Error("Incorrect Password!!!")
      
      const token=jwt.sign({id:user._id},process.env.SECRET_KEY);
   
   
      // setting the cookies
      // new date(Date.now() + days * hours * minutes * seconds * miliseconds)
      const options={
       expire: new Date(Date.now()+ 1 * 24 * 60 * 60 *1000),
       httpOnly:true,
       secure:true
      }
     res.status(200).cookie("token",token,options);
   
     res.status(201).json({
       msg:"Successfully logged in"
     })
}

module.exports={signUpUserGET, signInUserGET,signUpUserPOST,signInUserPOST};