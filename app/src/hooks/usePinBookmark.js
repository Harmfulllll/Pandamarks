import { useState } from "react";
import { useToast } from "./use-toast";

const usePinBookmark = () => {
    const { toast } = useToast();
    
    const PinBookmark = async (id) => {
        try {
            const res = await fetch(`/api/v1/bookmarks/pin/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
             if(data.statusCode>=400) throw new Error(data.message);

        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: error.message,
                type: 'destructive',
                duration: 1000
            });
        }
    }
    return { PinBookmark };
}
export default usePinBookmark;