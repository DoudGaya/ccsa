"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { signUpSchema } from "@/lib/schemas"
import { signUpSchema } from "@/lib/schema"
import { signUp } from "@/actions/auth"
import { toast } from "@/hooks/use-toast"

type FormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
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
      const result = await signUp(data)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: "Account created successfully. Please sign in.",
        })
        router.push("/auth/signin")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
         <CardHeader className=" bg-brand text-white mx-4 my-6 rounded-lg">
                <CardTitle className="text-2xl font-bold text-center">CCSA Staff</CardTitle>
          </CardHeader>
        {/* <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
        </CardHeader> */}
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} className={errors.name ? "border-red-500" : ""} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

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
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import type * as z from "zod"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { signUpSchema } from "@/lib/schemas"
// import { signUpSchema } from "@/lib/schema"
// // import { signUp } from "@/actions/auth"
// import { signUp } from "@/actions/auth"
// // import { toast } from "@/hooks/use-toast"
// import {toast} from 'sonner'

// type FormData = z.infer<typeof signUpSchema>

// export default function SignUpPage() {
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(signUpSchema),
//   })

//   const onSubmit = async (data: FormData) => {
//     setIsLoading(true)
//     try {
//       const result = await signUp(data)

//       if (result.error) {
//         toast( "Error", {
//           description: result.error,
//         })
//       } else {
//         toast("Success", {
//           description: "Account created successfully. Please sign in.",
//         })
//         router.push("/auth/signin")
//       }
//     } catch (error) {
//       console.error("Client Error:", error)
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
//           <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <Label htmlFor="name">Name</Label>
//               <Input id="name" {...register("name")} className={errors.name ? "border-red-500" : ""} />
//               {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//             </div>

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
//               {isLoading ? "Creating account..." : "Sign Up"}
//             </Button>
//           </form>

//           <div className="mt-4 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <Link href="/auth/signin" className="text-blue-600 hover:text-blue-500">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
