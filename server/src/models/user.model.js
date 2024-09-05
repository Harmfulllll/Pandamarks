import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required:true,
        min: 3,
    },
    email:{
        type: String,
        unique: true,
        required:true,
        validate: validator.isEmail,
    },
    password:{
        type: String,
        min: 6,
        required:true,
    },
    bookmarks:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bookmark",
        }
    ],
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
},{
    timestamps: true,
});

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password,10);
    }
    next();
})

userSchema.methods.matchPassword= async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateJWT= function(res){
    const token=jwt.sign({
        id: this._id,
        email: this.email,
    }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })

    res.cookie("token",token,{
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
}

export default mongoose.model("User", userSchema);