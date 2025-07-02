"use client"

import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { signInSchema } from "@/lib/schemas"
import { signInSchema } from "@/lib/schema"
// import { toast } from "@/hooks/use-toast"
import { toast } from "sonner"
import ForgotPasswordModal from "@/components/ForgotPasswordModal"
import { Github, Mail, Building2 } from "lucide-react"

type FormData = z.infer<typeof signInSchema>

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [ssoLoading, setSsoLoading] = useState<string | null>(null)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signInSchema),
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "loading") return

    if (session) {
      router.push("/dashboard")
    }
  }, [session, status, router])

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Don't render if already authenticated
  if (session) {
    return null
  }

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        toast( "Error", {
          description: "Invalid credentials" }
        )
      } else {
        toast("Success", {
          description: "Signed in successfully",
        })
        router.push("/dashboard")
      }
    } catch (error) {
      toast("Error", {
        description: "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSSOSignIn = async (provider: string) => {
    setSsoLoading(provider)
    try {
      // For SSO, we want to redirect directly
      await signIn(provider, {
        callbackUrl: "/dashboard",
      })
    } catch (error) {
      toast("Error", {
        description: "An unexpected error occurred",
      })
      setSsoLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <Card className="w-full py-4 border-brand/30 max-w-md">
        <CardHeader className=" bg-brand text-white mx-4 my-6 rounded-lg">
          <CardTitle className="text-2xl font-bold text-center">CCSA Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div> */}

            {/* <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div> */}
{/* 
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button> */}
          </form>

          {/* Divider */}
          <div className="mt-6 mb-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Use Cosmo Email</span>
              </div>
            </div>
          </div>

          {/* SSO Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSSOSignIn("google")}
              disabled={ssoLoading === "google"}
            >
              <Mail className="w-4 h-4 mr-2" />
              {ssoLoading === "google" ? "Signing in..." : "Continue with Cosmo Email"}
            </Button>

            {/* <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSSOSignIn("github")}
              disabled={ssoLoading === "github"}
            >
              <Github className="w-4 h-4 mr-2" />
              {ssoLoading === "github" ? "Signing in..." : "Continue with GitHub"}
            </Button> */}

            {/* <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => handleSSOSignIn("azure-ad")}
              disabled={ssoLoading === "azure-ad"}
            >
              <Building2 className="w-4 h-4 mr-2" />
              {ssoLoading === "azure-ad" ? "Signing in..." : "Continue with Microsoft"}
            </Button> */}
          </div>

          <div className="mt-4 space-y-2">
            <div className="text-center">
              {/* <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </button> */}
            </div>
          </div>
        </CardContent>
      </Card>

      <ForgotPasswordModal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)} />
    </div>
  )
}

