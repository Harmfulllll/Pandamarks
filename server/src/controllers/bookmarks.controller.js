import  bookmarkModel from '../models/bookmarks.model.js';
import userModel from '../models/user.model.js';
import apiResponse from '../utils/apiResponse.js';
import isValidUrl from '../utils/validUrl.js';
import getMetadata from '../utils/getMetadata.js';

const createBokmark= async(req,res)=>{
   try {
      const {url}= req.body;
        if(!url){
             return res.status(400).json(new apiResponse(400,null,"Please provide an URL"));
        }
        if(!isValidUrl(url)){
            console.log("Invalid URL");
            return res.status(400).json(new apiResponse(400,null,"Please provide a valid URL"));
        }
       const urlExists= await bookmarkModel.findOne({url});
       if(urlExists){
         const user= await userModel.findById(req.user.id);
         if(user.bookmarks.includes(urlExists._id)){
             return res.status(400).json(new apiResponse(400,null,"Bookmark already exists"));
         }
         user.bookmarks.push(urlExists._id);
         await user.save();
            return res.status(200).json(new apiResponse(200,urlExists,"Bookmark added successfully"));
       }else{
        const metadata= await getMetadata({url});
        if(!metadata){
            return res.status(500).json(new apiResponse(500,null,"Error fetching metadata"));
        }
         const newBookmark= new bookmarkModel({
            title: metadata.title,
            url,
            user: req.user.id,
            description: metadata.description, 
            image: metadata.images[0],
            sitename: metadata.sitename,
            tags: metadata.tags,
         })
            await newBookmark.save();
            const user= await userModel.findById(req.user.id);
            user.bookmarks.push(newBookmark._id);
            await user.save();
            return res.status(200).json(new apiResponse(200,newBookmark,"Bookmark added successfully"));
         
       }

   } catch (error) {
     console.log(error);
     return res.status(500).json(new apiResponse(500,null,error.message));
   }
}

const deleteBookmark= async(req,res)=>{
    try {
      const userid= req.user.id;
      if(!userid){
          return res.status(400).json(new apiResponse(400,null,"User not found"));
      }
      const {bookmarkid}= req.params;
        if(!bookmarkid){
            return res.status(400).json(new apiResponse(400,null,"No bookmark found with this id"));
        }
      const bookmark= await bookmarkModel.findById(bookmarkid);
      const user= await userModel.findById(userid);
        if(!bookmark){
            return res.status(400).json(new apiResponse(400,null,"No bookmark found"));
        }
      const bookmarkExistsinUser= user.bookmarks.map( bookmark=>bookmark.toString()).includes(bookmarkid);
      if(!bookmarkExistsinUser){
          return res.status(400).json(new apiResponse(400,null,"Bookmark does not exist in your list"));
      }
      user.bookmarks= await user.bookmarks.filter((bookmark)=>bookmark.toString()!== bookmarkid);
        await user.save();
      const bookmarkStillExists= await userModel.findOne({bookmarks:bookmarkid});
      if(!bookmarkStillExists){
        await bookmarkModel.findByIdAndDelete(bookmarkid);
      }
      return res.status(200).json(new apiResponse(200,null,"Bookmark deleted successfully"));
    } catch (error) {
        console.log(error);
        return res.status(500).json(new apiResponse(500,null,error.message));
    }
}

const getBookmarks= async(req,res)=>{
    try {
        const userid= req.user.id;
        if(!userid){
            return res.status(400).json(new apiResponse(400,null,"User not found"));
        }
        const data= await userModel.findById(userid).populate("bookmarks");
        if(!data){
            return res.status(400).json(new apiResponse(400,null,"No bookmarks found"));
        }
        return res.status(200).json(new apiResponse(200,data,"Bookmarks fetched successfully"));
        
    } catch (error) {
         console.log(error);
         return res.status(500).json(new apiResponse(500,null,error.message));
    }
}

const addTags= async(req,res)=>{
    try {
        const userid= req.user.id;
        const {bookmarkid}= req.params;
        if(!bookmarkid){
            return res.status(400).json(new apiResponse(400,null,"No bookmark found with this id"));
        }
        const bookmark= await bookmarkModel.findById(bookmarkid);
        const tags= req.body;
        if(!tags){
            return res.status(400).json(new apiResponse(400,null,"Please provide some tags"));
        }
        if(!bookmark){
            return res.status(400).json(new apiResponse(400,null,"No bookmark found"));
        }
        const tagDoesNotExist= tags.filter(tag=>!bookmark.tags.includes(tag));
        if(tagDoesNotExist.length>0){
            bookmark.tags.push(...tags);
            await bookmark.save();
            return res.status(200).json(new apiResponse(200,bookmark,"Tags added successfully"));
        }
       else  return res.status(400).json(new apiResponse(400,null,"Tags already exists"));

    } catch (error) {
         console.log(error);
         return res.status(500).json(new apiResponse(500,null,error.message));
    }
}



export {createBokmark, deleteBookmark, getBookmarks, addTags};