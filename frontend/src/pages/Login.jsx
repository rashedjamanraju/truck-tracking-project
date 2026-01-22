import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      
      <Card className="w-[420px] bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-slate-200 ">
        
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-3xl font-bold text-slate-800 ">
            Truck Tracking
          </CardTitle>
          <p className="text-center text-slate-500 text-sm">
            Sign in to your dashboard
          </p>
        </CardHeader>

        <CardContent className="space-y-5 w-[90%] mx-auto">
          
          <Input 
            placeholder="Email address"
            className="h-11"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            className="h-11"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full h-11 text-base font-semibold">
            Login
          </Button>

          <p className="text-center text-sm text-slate-500">
            Forgot password?
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
