import { Link } from "react-router-dom"
import './Login.css'
import { Button } from "@/components/ui/button"
import { BeatLoader } from "react-spinners"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useLogin from "@/hooks/useLogin"
import { useState } from "react"

export function Login() {
  const {loginLoading, loginUser} = useLogin();
  const [state,setState]= useState({
    email: '',
    password: ''
  })
  const handleChange=(e)=>{
    setState((prev)=>({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    await loginUser({
      email: state.email,
      password: state.password
    });
    setState({
      email: '',
      password: ''
    })
  }
  return (
    <div className="login">
    <Card className="mx-auto max-w-sm bg-black">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Login</CardTitle>
        <CardDescription>
          Enter your credentials below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2 text-white">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <div className="grid gap-2 text-white">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgotpassword" className="
              text-black-400 ml-auto
              ">
                Forgot password?
            </Link>
            </div>
            <Input id="password" type="password" required  onChange={(e)=>handleChange(e)}/>
          </div>
          <Button type="submit" variant='outline'  className="w-full"   onClick={(e)=>handleSubmit(e)}   disabled={loginLoading}>
            {
              loginLoading ? <BeatLoader color="white" size={8} /> : 'Login'
            }
          </Button>
        </div>
        <div className="mt-4 text-center text-sm text-white">
          Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500">
                Sign up
            </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
