"use client"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { useRouter } from "next/navigation"
import axios from "axios"
export default function SignUpPage() {
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        async function onSubmit(events: React.SyntheticEvent) {
            try{
                const response = await axios.post(process.env.NEST_PUBLIC_BACKEND_URL + '/users/signup', formData);
            localStorage.setItem('email', response.data.email);
            if(response.data.success){
                router.push('/otp')
            }else{
                setError(response.data.message);
            }
            } catch (error) {
                console.error(error);
            }finally{
                setisLoading(false);
            }
        }
    }
  return (
    <div className="container  mx-auto my-10 flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <form>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            <Button disabled={isLoading} >
            {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign Up</Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" className="w-full">
            <Icons.facebook className="mr-2 h-4 w-4" />
            Facebook
          </Button>
          <Button variant="outline" className="w-full">
            <Icons.instagram className="mr-2 h-4 w-4" />
            Instagram
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" className="w-full">
            <Icons.twitter className="mr-2 h-4 w-4" />
            X
          </Button>
          <Button variant="outline" className="w-full">
            <Icons.google className="mr-2 h-4 w-4" />
            Google
          </Button>
        </div>
      </div>
      <p className="px-8 text-center text-sm text-muted-foreground">
        By clicking continue, you agree to our{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  )
}


