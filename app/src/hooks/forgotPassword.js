import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const useForgotPassword = () => {

    const [forgotPasswordLoading,    setForgotPasswordLoading] = useState(false);
    const {toast} = useToast();

    const forgotPassword = async (email) => {
        setForgotPasswordLoading(true);
        try {
            const res= await fetch(`/api/v1/users/forgotpassword`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
            });
              const data= await res.json();
              if(data.statusCode>=400) throw new Error(data.message);
              toast({
                title: "Sent!",
                description: "If the email exists in our system, you will receive an email with instructions to reset your password.",
              })
            }
             catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
            });
        } finally {
            setForgotPasswordLoading(false);
        }
    };

    return {
        forgotPasswordLoading,
        forgotPassword,
    };

};

export default useForgotPassword;