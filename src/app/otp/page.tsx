'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function OTPVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleChange = (element: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (isNaN(Number(element.target.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.target.value : d))])

    if (element.target.nextSibling && element.target.value !== '') {
      (element.target.nextSibling as HTMLInputElement).focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpValue = otp.join('')
    console.log('OTP submitted:', otpValue)
    // Here you would typically send the OTP to your backend for verification
  }

  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
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
        <Button type="submit" className="w-full">Verify</Button>
      </form>
      <p className="px-8 text-center text-sm text-muted-foreground">
        Didnt receive the code?{" "}
        <Button variant="link" className="p-0 text-primary">Resend</Button>
      </p>
    </div>
  )
}

