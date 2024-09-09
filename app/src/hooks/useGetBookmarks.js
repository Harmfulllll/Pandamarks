import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { getBookmarks } from "@/redux/bookmarkSlice";
const useGetBookmarks = () => {
    const [bookmarksLoading, setBookmarksLoading] = useState(false);
    const dispatch= useDispatch();
    const {toast}= useToast();
   
    const Bookmarks= async()=>{
         try { 
            setBookmarksLoading(true);
            
            const res= await fetch('/api/v1/bookmarks/get',{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                },
            });

            const data= await res.json();
            if(data.statusCode>=400){
                throw new Error(data.message);
            }
            dispatch(getBookmarks(data.data));

         } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
                duration: 1000,
              })
         }finally{
            setBookmarksLoading(false);
         }
    }
    return {bookmarksLoading, Bookmarks}
}
export default useGetBookmarks;