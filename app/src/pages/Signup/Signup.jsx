import './Signup.css'
import { Link } from "react-router-dom"
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
import useSignup from "../../hooks/useSignup"
import { useState } from 'react'


export function Signup() {
  const {signupLoading, registerUser} = useSignup();
  const [state,setState]= useState({
    name: '',
    email: '',
    password: ''
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser({
      name: state.name,
      email: state.email,
      password: state.password
    });
    setState({
      name: '',
      email: '',
      password: ''
    })
  }

  const handleChange=(e)=>{
    setState((prev)=>({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div className="login">
    <Card className="w-full max-w-sm  
    bg-black 
    ">
      <CardHeader>
        <CardTitle className="text-xl 
        text-white
        ">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
        <div className="grid gap-2 text-white">
            <Label htmlFor="name" >Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Max verstappen"
              required
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <div className="grid gap-2    text-white">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={(e)=>handleChange(e)}
            />
          </div>
          <div className="grid gap-2  text-white">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={(e)=>handleChange(e)} />
          </div>
          <Button type="submit" variant='outline'  className="w-full" 
               onClick={(e)=>handleSubmit(e)}
          >
            Create an account
          </Button>
          <Button className="w-full ">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm  text-white">
          Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
                Log in
            </Link>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}
