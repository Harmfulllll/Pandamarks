import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,  
    },
    url:{
        type: String,
    },
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    description:{
        type: String,
    },
    image:{
        type: String,
    },
    sitename:{
        type: String
    },
    tags:[
        {
               userId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
           },
           taglist:[
                {
                     type: String,
                }
           ]
        }
    ],
    pinned:{
        type: Boolean,
        default: false,
    },

    
},{
    timestamps: true,
});

export default mongoose.model("Bookmark", bookmarkSchema);