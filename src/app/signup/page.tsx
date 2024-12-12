"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { Facebook, Twitter, Instagram } from "lucide-react";
import clsx from "clsx";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginformData, setloginFormData] = useState({
    email: "",
    password: "",
  });
  const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      phone: ''
  })
  const router = useRouter();
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setloginFormData({
      ...loginformData,
      [name]: value,
    });
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  async function handleLoginSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/users/login",
        loginformData
      );
      localStorage.setItem("email", response.data.email);
      if (response.data.success) {
        router.push("/otp");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/users/signup",
        formData
      );
      localStorage.setItem("email", response.data.email);
      if (response.data.success) {
        router.push("/otp");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Card className="w-full max-w-[800px] overflow-hidden shadow-2xl rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
            <p className="mb-6">Login to access exclusive offers and deals from top brands!</p>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full bg-white text-black hover:bg-gray-100"
                onClick={() => console.log("Google login")}
              >
                <FaGoogle className="mr-2 h-5 w-5" /> Login with Google
              </Button>
              <Button
                variant="outline"
                className="w-full bg-white text-black hover:bg-gray-100"
                onClick={() => console.log("Facebook login")}
              >
                <Facebook className="mr-2 h-5 w-5" /> Login with Facebook
              </Button>
              <Button
                variant="outline"
                className="w-full bg-white text-black hover:bg-gray-100"
                onClick={() => console.log("Twitter login")}
              >
                <Twitter className="mr-2 h-5 w-5" /> Login with X
              </Button>
              <Button
                variant="outline"
                className="w-full bg-white text-black hover:bg-gray-100"
                onClick={() => console.log("Instagram login")}
              >
                <Instagram className="mr-2 h-5 w-5" /> Login with Instagram
              </Button>
            </div>
          </div>
          <div className="flex-1 p-8 bg-white">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="login"
                  className={clsx(
                    "w-full rounded-md py-2 px-3 text-base font-normal transition-colors",
                    "data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-indigo-500 hover:bg-indigo-100"
                  )}
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className={clsx(
                    "w-full rounded-md py-2 px-3 text-base font-normal transition-colors",
                    "data-[state=active]:bg-indigo-500 data-[state=active]:text-white text-indigo-500 hover:bg-indigo-100"
                  )}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      onChange={handleLoginChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-indigo-500 text-white hover:bg-indigo-400 rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    
                    <Input
                      id="email-signup"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="Enter your Phone Number"
                      type="tel"
                      pattern="[0-9]{10}"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    
                    <Input
                      id="password-signup"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-indigo-500 text-white hover:bg-indigo-400 rounded-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing up..." : "Sign Up"}
                  </Button>
                  <div className="space-y-2 flex items-center">
      <input
        type="checkbox"
        id="terms"
        name="terms"
        defaultChecked
        required
        className="mr-2 "
      />
      <label htmlFor="terms" className="text-sm text-gray-700">
        I agree to all{" "}
        <a href="/terms" className="text-indigo-500 hover:text-indigo-400">
          terms and services
        </a>
      </label>
    </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
}