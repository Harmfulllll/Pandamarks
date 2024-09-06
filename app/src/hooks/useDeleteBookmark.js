import { useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { deleteBookmark } from "@/redux/bookmarkSlice";

const useDeleteBookmark = () => {
    const [deleteBookmarkLoading, setDeleteBookmarkLoading] = useState(false);
    const { toast } = useToast();
    const dispatch = useDispatch();

    const DeleteBookmark = async (id) => {
        try {
            setDeleteBookmarkLoading(true);
            const res= await fetch(`/api/v1/bookmarks/delete/${id}`,{
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
            }}
            )
            const data= await res.json();
            if(data.statusCode>=400){
                throw new Error(data.message);
            }
            dispatch(deleteBookmark(id));
           
            
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
                duration: 1000,
            })
        }finally{
            setDeleteBookmarkLoading(false);
        }
    }

    return { deleteBookmarkLoading, DeleteBookmark };
}

export default useDeleteBookmark;