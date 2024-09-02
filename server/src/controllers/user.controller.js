import userModel from "../models/user.model.js";
import apiResponse from "../utils/apiResponse.js";

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
        user.generateJWT(res);
        return res.status(200).json(new apiResponse(200,
            {
                id: user._id,
                name: user.name,
                email: user.email,
              }
            ,"User logged in successfully"));
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
    }

}

const logout= async(req,res)=>{
    try {
         res.cookie('token','',{maxAge:0})
            return res.status(200).json(new apiResponse(200,null,"User logged out successfully"));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
    }
}

export{
    signup,
    login,
    logout
}