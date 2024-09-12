import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
    const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
    const {toast} = useToast(); 
    const navigate = useNavigate();
    const { resetToken } = useParams();

    const resetPassword = async (password) => {
        setResetPasswordLoading(true);
    try {
         const res= await fetch(`/api/v1/users/resetpassword/${
            resetToken
         }`,{
            method: "POST",
            headers:{
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('User')).token}`,
            },
            body: JSON.stringify({password}),
        });
        const data= await res.json();
        if(data.statusCode>=400) throw new Error(data.message);
        toast({
            title: "Success!",
            description: "Your password has been reset successfully. You can now login with your new password.",
        });
        navigate("/login");
        
    } catch (error) {

        console.log(error);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
        });
        
    }finally{
      setResetPasswordLoading(false);
    }
}
    return {
        resetPasswordLoading,
        resetPassword,
    };
}

export default useResetPassword