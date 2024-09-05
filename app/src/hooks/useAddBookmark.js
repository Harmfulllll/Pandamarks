import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { createBookmark } from "@/redux/bookmarkSlice";

const useAddBookmark = () => {
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    const {toast}= useToast();
    const dispatch= useDispatch();

    const AddBookmark = async(url)=>{
        setBookmarkLoading(true);
        try {
            const res= await fetch('/api/v1/bookmarks/add',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({url})
            });
            const data= await res.json();
            if(data.statusCode>=400){
                throw new Error(data.message);
            }
            toast({
                variant: "success",
                title: "Hurray!",
                description: "Bookmark added successfully",
                duration: 1000,
            });
            dispatch(createBookmark(data));

            
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
                duration: 1000,
              })
            
        }finally{
            setBookmarkLoading(false);
        }
    }
    return {bookmarkLoading, AddBookmark}
}

export default useAddBookmark;