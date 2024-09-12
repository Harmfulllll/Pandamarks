import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";
const verify= async(req,res,next)=>{
   try {
    const token= req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json(new apiResponse(401,null,"Unauthorized"));
    }
    const data= jwt.verify(token,process.env.JWT_SECRET);
    if(!data){
        return res.status(401).json(new apiResponse(401,null,"Invalid token"));
    }

    const user= await userModel.findById(data.id).select("-password");
    if(!user){
        return res.status(404).json(new apiResponse(404,null,"User not found"));
    }
    req.user=user;
    req.user.token=token;
    next();
    
   } catch (error) {
     console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
   }
}

export default verify;