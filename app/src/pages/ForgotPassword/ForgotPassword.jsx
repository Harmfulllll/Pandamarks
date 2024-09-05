
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
import useForgotPassword from "@/hooks/forgotPassword"
import { useState } from "react"


export default function ForgotPassword() {

  const { forgotPasswordLoading, forgotPassword } = useForgotPassword();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
     e.preventDefault();
     await  forgotPassword(email);
       setEmail("");
  }
  return (
    <Card className="mx-auto max-w-sm mt-20">
      <CardHeader>
        <CardTitle className="text-2xl">Password reset</CardTitle>
        <CardDescription>
          Enter your email to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Email</Label>
            </div>
            <Input id="email" type="email" required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full"
            onClick={(e) => handleSubmit(e)}
          >
            {forgotPasswordLoading ? (
              <BeatLoader size={8} color="#fff" />
            ) : (
              "Send password reset email"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
