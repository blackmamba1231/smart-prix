'use client'
import axios  from "axios"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const router = useRouter()
  const handleChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(element.target.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))])

    if (element.target.nextSibling && element.target.value !== '') {
      (element.target.nextSibling as HTMLInputElement).focus()
    }
  }
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join('')
    console.log('OTP submitted:', otpValue)
    try{
      const response = await axios.post(process.env.NEST_PUBLIC_BACKEND_URL +"auth/verify-otp", {otp: otpValue,email: localStorage.getItem('email')})
    console.log(response);
    if(response.data.success){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('AccountId', response.data.AccountId);
      localStorage.setItem('useremail', response.data.email);
      router.push("/dashboard")
    }else{
      alert(response.data.message)
    }
    }catch(_error){
     console.log(_error);
    }
  }

  return (
    <div className="mx-auto my-28 flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px] py-8 px-8 bg-gradient-to-br from-indigo-500 to-purple-600 shadow rounded-md">
      <div className="flex flex-col space-y-2 text-center ">
        <h1 className="text-2xl font-semibold tracking-tight">Verify your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your email
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 py-4">
          {otp.map((data, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              maxLength={1}
              className="w-12 h-12 text-center text-2xl"
              value={data}
              onChange={e => handleChange(e, index)}
            />
          ))}
        </div>
        <Button type="submit" className="w-full bg-sky-800 text-white">Verify</Button>
      </form>
      <p className="px-8 text-center text-sm text-muted-foreground text-indigo-800">
        Didnt receive the code?{" "}
        <Button variant="link" className="p-0 text-primary">Resend</Button>
      </p>
    </div>
  )
}

