import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogin=()=>{
    const {toast}= useToast();
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [loginLoading, setLoginLoading] = useState(false);

    const loginUser= async({email,password})=>{
    try {
        setLoginLoading(true);

        const res= await fetch('https://pandamarks.vercel.app/api/v1/users/login',{
            method:'POST',
          /*   headers:{
                'Content-Type':'application/json',
            }, */
             credentials:'include', 
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
        localStorage.setItem('User', JSON.stringify(data.data));
          dispatch(login(data.data));
          navigate('/');
        
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
            duration: 1000,
          })
        
    }finally{
        setLoginLoading(false);
    }
}
return {loginLoading, loginUser};

}
export default useLogin