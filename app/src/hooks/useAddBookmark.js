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
            const res= await fetch('https://pandamarks.vercel.app/api/v1/bookmarks/add',{
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('User')).token}`,
                },
                body: JSON.stringify({url})
            });
            const data= await res.json();
            if(data.statusCode>=400){
                throw new Error(data.message);
            }
            dispatch(createBookmark(data));
            window.location.reload();
            toast({
                variant: "success",
                title: "Hurray!",
                description: "Bookmark added successfully",
                duration: 2000
            });

        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
                 duration: 2000
              })
            
        }finally{
            setBookmarkLoading(false);
        }
    }
    return {bookmarkLoading, AddBookmark}
}

export default useAddBookmark;