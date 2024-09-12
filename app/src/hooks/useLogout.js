import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { useToast } from "@/hooks/use-toast";

const useLogout = () => {
    const [logoutLoading, setLogoutLoading] = useState(false);
    const dispatch = useDispatch();
    const { toast } = useToast();
    const Logout= async()=>{
        setLogoutLoading(true);

    try {
        const res= await fetch('/api/v1/users/logout',{
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('User')).token}`,
            },
        });
        const data= await res.json();
        if(data.statusCode>=400){
            throw new Error(data.message)
        }
        localStorage.removeItem('User');
        dispatch(logout());
        toast({
            title: "Success!",
            description: "Logged out ",
            duration:1000,
          })
        
    } catch (error) {
        console.log(error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
            duration: 1000,
          })
    }finally{
        setLogoutLoading(false)
    }
}
    
        return {Logout, logoutLoading}

}
export default useLogout;