import mongoose  from "mongoose";

export default async function connectDB(){

    try{
        await mongoose.connect(

           `${process.env.DB_URL}/${process.env.DB_NAME}`
        )

    }catch(err){
        console.log("Error connecting to the database", err);
        process.exit(1);
    }
}