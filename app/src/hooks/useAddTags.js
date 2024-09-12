import { useState } from "react";
import { useToast } from "./use-toast";

const useAddTags = () => {
    const [tagsLoading, setTagsLoading] = useState(false);
    const { toast } = useToast();

    const AddTags = async(tags,id)=>{
        setTagsLoading(true);
        try {
            const res= await fetch(`/api/v1/bookmarks/tags/${id}`,{
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('User')).token}`,
                },
                body: JSON.stringify(tags)
            });
            const data= await res.json();
            if(data.statusCode>=400){
                throw new Error(data.message);
            }
           

        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
               
              })
        }finally{
            setTagsLoading(false);
        }
    }
    return {tagsLoading, AddTags}
}
export default useAddTags;