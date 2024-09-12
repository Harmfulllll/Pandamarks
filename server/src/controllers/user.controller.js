import userModel from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";
import crypto from 'crypto';
import sendEmail from "../utils/nodemailer.js";

const signup= async(req,res)=>{
    
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.status(400).json(new apiResponse(400,null,"Please provide all the fields"));
        }
        if(name.length<3){
            return res.status(400).json(new apiResponse(400,null,"Name should be atleast 3 characters long"));
        }
        const emailExists= await userModel.findOne({email});
        if(emailExists){
            return res.status(400).json(new apiResponse(400,null,"User already exists"));
        }
        if(password.length<6){
            return res.status(400).json(new apiResponse(400,null,"Password should be atleast 6 characters long"));
        }
        const nameExists= await userModel.findOne({name});
        if(nameExists){
            return res.status(400).json(new apiResponse(400,null,"Username already exists"));
        }
        const user= new userModel({
            name,
            email,
            password,
        });

        if(user){
            await user.save();

            return res.status(200).json(new apiResponse(200,
                {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                  }
                ,"User created successfully"));
        }else{
            return res.status(500).json(new apiResponse(500,null,"User not created. Please try again"));
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
    }
}

const login= async(req,res)=>{
  
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json(new apiResponse(400,null,"Please provide all the fields"));
        }
        const user= await userModel.findOne({email});
        if(!user){
            return res.status(404).json(new apiResponse(404,null,"Invalid credentials"));
        }
        const isMatch= await user.matchPassword(password);
        if(!isMatch){
            return res.status(404).json(new apiResponse(404,null,"Invalid credentials"));
        }
        const token = user.generateJWT(res);
        console.log(token);
       
        return res.status(200).json(new apiResponse(200,
            {
                id: user._id,
                name: user.name,
                email: user.email,
                token
              }
            ,"User logged in successfully"));
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
    }

}

const logout= async(req,res)=>{
    try {
            req.user.token= undefined;
            return res.status(200).json(new apiResponse(200,null,"User logged out successfully"));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
    }
}

const forgotPassword= async(req,res)=>{
    try {
        const {email}=req.body;
        if(!email){
            return res.status(400).json(new apiResponse(400,null,"Please provide email"));
        }
        const user= await userModel.findOne({email});
        if(user){
            const resetToken= crypto.randomBytes(20).toString('hex');
            user.resetPasswordToken= resetToken;
            user.resetPasswordExpire= Date.now()+3600;
            await user.save();

            const url= `
            http://localhost:5173/resetpassword/${resetToken}
            `
            const message= ` 
            You have requested a password reset
            Please go to this link to reset your password
            <a href=${url} clicktracking=off>${url}</a>
            `
            try {
                await sendEmail({
                    email: user.email,
                    subject: "Password reset for Bookmarks App",
                    message,
                });
                return res.status(200).json(new apiResponse(200,null,"Email sent successfully"));
            } catch (error) {
                console.log(error);
                user.resetPasswordToken= undefined;
                user.resetPasswordExpire= undefined;
                await user.save();
                return res.status(500).json(new apiResponse(500,null,"Email could not be sent"));
            }
        }

        
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
    }
}

const resetPassword= async(req,res)=>{
    try {
         const {password}=req.body;
        const resetPasswordToken= req.params.resetToken;

        if( !password){
            return res.status(400).json(new apiResponse(400,null,"Please provide a password"));
        }
       const user= await userModel.findOne({
              resetPasswordToken,
             /*    resetPasswordExpire:{$gt:Date.now()} */
         });
         if(!user){
             return res.status(400).json(new apiResponse(400,null,"Invalid token"));
         }
            user.password= password;
            user.resetPasswordToken= undefined;
            user.resetPasswordExpire= undefined;
            await user.save();
            return res.status(200).json(new apiResponse(200,null,"Password reset successfully"));

    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
        
    }
}

const verifyResetLink= async(req,res)=>{
    try {
        const resetPasswordToken= req.params.resetToken;
        const user= await userModel.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt:Date.now()}
        });
        console.log(user);
        if(!user){
            return res.status(400).json(new apiResponse(400,null,"Invalid link or link expired"));
        }
        return res.status(200).json(new apiResponse(200,null,"Valid link"));
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
        
    }
}

export{
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword,
    verifyResetLink
}