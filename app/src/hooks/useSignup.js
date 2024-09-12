import {useState} from 'react'
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom"

const useSignup= ()=>{
    const {toast}= useToast();
    const navigate= useNavigate();
    const [signupLoading, setSignupLoading] = useState(false);

    const registerUser= async({name,email,password})=>{
    try{
        setSignupLoading(true);
        const res= await fetch('https://pandamarks.vercel.app/api/v1/users/register',{
            method: 'POST',
           /*  headers: {
                'Content-Type': 'application/json',
            }, */
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        const data= await res.json();
        if(data.statusCode>=400) throw new Error(data.message);
        toast({
            title: "Success!",
            description: "Account created successfully.",
          })
        navigate('/login');
        }
        catch (error) {
      //  console.log(error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
          })
        
    }finally{
        setSignupLoading(false);
    }
}
   return {signupLoading, registerUser};
}

export default useSignup