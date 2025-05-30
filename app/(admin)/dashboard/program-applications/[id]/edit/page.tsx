"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecord, updateRecord } from "@/actions/crud-operations"
import { toast } from "@/hooks/use-toast"

const editSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  surname: z.string().min(1, "Surname is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  passportNumber: z.string().min(1, "Passport number is required"),
  passportDateOfIssue: z.string().min(1, "Passport date of issue is required"),
  passportExpiryDate: z.string().min(1, "Passport expiry date is required"),
  passportCountryOfIssue: z.string().min(1, "Passport country of issue is required"),
  highestQualification: z.string().min(1, "Highest qualification is required"),
  duration: z.string().optional(),
  isCosmopolitanStudent: z.boolean(),
  course: z.string().optional(),
  program: z.string().optional(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
})

type FormData = z.infer<typeof editSchema>

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditProgramApplicationPage({ params }: PageProps) {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()
  const [id, setId] = useState<string>("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(editSchema),
  })

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params
      setId(resolvedParams.id)
      await fetchApplication(Number.parseInt(resolvedParams.id))
    }
    getParams()
  }, [params])

  const fetchApplication = async (applicationId: number) => {
    try {
      const result = await getRecord("programApplication", applicationId)
      if (result.data) {
        const app = result.data
        reset({
          firstName: app.firstName,
          middleName: app.middleName || "",
          surname: app.surname,
          dateOfBirth: new Date(app.dateOfBirth).toISOString().split("T")[0],
          email: app.email,
          phoneNumber: app.phoneNumber,
          address: app.address,
          passportNumber: app.passportNumber,
          passportDateOfIssue: new Date(app.passportDateOfIssue).toISOString().split("T")[0],
          passportExpiryDate: new Date(app.passportExpiryDate).toISOString().split("T")[0],
          passportCountryOfIssue: app.passportCountryOfIssue,
          highestQualification: app.highestQualification,
          duration: app.duration || "",
          isCosmopolitanStudent: app.isCosmopolitanStudent,
          course: app.course || "",
          program: app.program || "",
          status: app.status,
        })
      }
    } catch (error) {
      console.error("Error fetching application:", error)
      toast({
        title: "Error",
        description: "Failed to load application data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    try {
      const result = await updateRecord("programApplication", Number.parseInt(id), {
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
        passportDateOfIssue: new Date(data.passportDateOfIssue),
        passportExpiryDate: new Date(data.passportExpiryDate),
      })

      if (result.success) {
        toast({
          title: "Success",
          description: result.success,
        })
        router.push(`/dashboard/program-applications/${id}`)
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href={`/dashboard/program-applications/${id}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Details
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Application</h1>
            <p className="text-gray-600 dark:text-gray-400">Update application information</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" {...register("firstName")} className={errors.firstName ? "border-red-500" : ""} />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input id="middleName" {...register("middleName")} />
              </div>
              <div>
                <Label htmlFor="surname">Surname *</Label>
                <Input id="surname" {...register("surname")} className={errors.surname ? "border-red-500" : ""} />
                {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className={errors.dateOfBirth ? "border-red-500" : ""}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  className={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
              </div>
              <div>
                <Label htmlFor="highestQualification">Highest Qualification *</Label>
                <Input
                  id="highestQualification"
                  {...register("highestQualification")}
                  className={errors.highestQualification ? "border-red-500" : ""}
                />
                {errors.highestQualification && (
                  <p className="text-red-500 text-sm mt-1">{errors.highestQualification.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea id="address" {...register("address")} className={errors.address ? "border-red-500" : ""} />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Application Status */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value) => setValue("status", value as any)} defaultValue={watch("status")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link href={`/dashboard/program-applications/${id}`}>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={submitting}>
            {submitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
