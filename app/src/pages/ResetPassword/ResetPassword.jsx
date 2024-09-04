
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BeatLoader
} from 'react-spinners'
import useResetPassword from "@/hooks/resetPassword"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast, useToast } from "@/hooks/use-toast"

export default function ResetPassword() {
  const { resetPasswordLoading, resetPassword } = useResetPassword();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [validUrl, setValidUrl] = useState(false);
    const param = useParams();
/* 
    useEffect(() => {
    const verifyUrl = async () => {
        try {
            const res = await fetch(`/api/v1/users/verifyresetlink/${param.resetToken}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            });
            const data = await res.json();
            if (data.statusCode >= 400) throw new Error(data.message);
            setValidUrl(true);
            
        } catch (error) {
            console.log(error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error.message,
            });
        }
    }
    verifyUrl();
    }, [param,])
 */
  const handleSubmit = async (e) => {
     e.preventDefault();
        await  resetPassword(password);
      
  }

/*   if (!validUrl) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Card className="mx-auto max-w-sm mt-20">
          <CardHeader>
            <CardTitle className="text-2xl">Invalid link</CardTitle>
            <CardDescription>
              The link you have used to reset your password is invalid or has expired.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  } */

  return (
    <Card className="mx-auto max-w-sm mt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Password reset</CardTitle>
        <CardDescription>
          Enter your new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" required 
               onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full"
            onClick={(e) => handleSubmit(e)}
          >
            {resetPasswordLoading ? (
              <BeatLoader size={8} color="#fff" />
            ) : (
              "Reset password"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
