import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


const useLogin=()=>{
    const {toast}= useToast();
    const [loginLoading, setLoginLoading] = useState(false);

    const loginUser= async({email,password})=>{
    try {
        setLoginLoading(true);

        const res= await fetch('/api/v1/users/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }, );
        
        const data= await res.json();
        if(data.statusCode>=400) throw new Error(data.message);
        toast({
            title: "Success!",
            description: "Logged in successfully.",
          })
         
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
          })
        
    }finally{
        setLoginLoading(false);
    }
}
return {loginLoading, loginUser};

}
export default useLogin