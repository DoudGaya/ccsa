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

type FormData = z.infer<typeof signInSchema>

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <Card className="w-full py-4 border-brand/30 max-w-md">
        <CardHeader className=" bg-brand text-white mx-4 my-6 rounded-lg">
          <CardTitle className="text-2xl font-bold text-center">CCSA Staff</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 space-y-2">
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </button>
            </div>
            {/* <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </div> */}
          </div>
        </CardContent>
      </Card>

      <ForgotPasswordModal isOpen={showForgotPassword} onClose={() => setShowForgotPassword(false)} />
    </div>
  )
}


// "use client"

// import { useState } from "react"
// import { signIn } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import type * as z from "zod"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { signInSchema } from "@/lib/schemas"
// import { signInSchema } from "@/lib/schema"
// // import { toast } from "@/hooks/use-toast"
// import { toast } from "sonner"

// type FormData = z.infer<typeof signInSchema>

// export default function SignInPage() {
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(signInSchema),
//   })

//   const onSubmit = async (data: FormData) => {
//     setIsLoading(true)
//     try {
//       const result = await signIn("credentials", {
//         email: data.email,
//         password: data.password,
//         redirect: false,
//       })

//       if (result?.error) {
//         toast("Error", {
//           description: "Invalid credentials",
//         })
//       } else {
//         toast("Success", {
//           description: "Signed in successfully",
//         })
//         router.push("/dashboard")
//       }
//     } catch (error) {
//       toast("Error", {
//         description: "An unexpected error occurred",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <Label htmlFor="email">Email</Label>
//               <Input id="email" type="email" {...register("email")} className={errors.email ? "border-red-500" : ""} />
//               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             <div>
//               <Label htmlFor="password">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 {...register("password")}
//                 className={errors.password ? "border-red-500" : ""}
//               />
//               {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <Button type="submit" className="w-full" disabled={isLoading}>
//               {isLoading ? "Signing in..." : "Sign In"}
//             </Button>
//           </form>

//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Don't have an account?{" "}
//               <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500">
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
