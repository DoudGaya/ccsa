"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Check, X } from "lucide-react"
import { getApplicationDetails, updateTrainingApplication } from "@/actions/application-management"
import { approveApplication, rejectApplication } from "@/actions/application-management"
import { toast } from "sonner"
import { Gender, ApplicationStatus } from "@prisma/client"
import { TrainingApplication } from "@/@types"

const trainingApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string(),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  organization: z.string().min(1, "Organization is required"),
  gender: z.nativeEnum(Gender),
  age: z.number().min(1, "Age must be greater than 0"),
  role: z.string().min(1, "Role is required"),
  training: z.string().min(1, "Training is required"),
  status: z.nativeEnum(ApplicationStatus),
})

type FormData = z.infer<typeof trainingApplicationSchema>

export default function TrainingApplicationEditPage() {
  const params = useParams()
  const router = useRouter()
  const [application, setApplication] = useState<TrainingApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [actionLoading, setActionLoading] = useState("")

  const id = Array.isArray(params.id) ? params.id[0] : params.id

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(trainingApplicationSchema),
  })

  useEffect(() => {
    if (id) {
      fetchApplication()
    }
  }, [id])

  const fetchApplication = async () => {
    if (!id) return
    
    try {
      const result = await getApplicationDetails(parseInt(id), "training")
      if (result.data) {
        const app = result.data as TrainingApplication
        setApplication(app)
        
        // Populate form with existing data
        reset({
          firstName: app.firstName,
          middleName: app.middleName || "",
          lastName: app.lastName,
          email: app.email,
          phone: app.phone,
          organization: app.organization,
          gender: app.gender,
          age: app.age,
          role: app.role,
          training: app.training,
          status: app.status,
        })
      } else {
        toast.error("Application not found")
        router.push("/dashboard/training-applications")
      }
    } catch (error) {
      console.error("Error fetching application:", error)
      toast.error("Failed to load application")
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    if (!id) return
    
    setSaving(true)
    try {
      const result = await updateTrainingApplication(parseInt(id), data)
      if (result.success) {
        toast.success("Application updated successfully")
        router.push(`/dashboard/training-applications/${id}`)
      } else {
        toast.error(result.error || "Failed to update application")
      }
    } catch (error) {
      console.error("Error updating application:", error)
      toast.error("An error occurred while updating")
    } finally {
      setSaving(false)
    }
  }

  const handleQuickAction = async (action: "approve" | "reject") => {
    if (!application) return

    setActionLoading(action)
    try {
      let result
      switch (action) {
        case "approve":
          result = await approveApplication(application.id, "training")
          break
        case "reject":
          const reason = prompt("Enter rejection reason (optional):")
          result = await rejectApplication(application.id, "training", reason || undefined)
          break
      }

      if (result?.success) {
        toast.success(result.success)
        fetchApplication() // Refresh data
      } else if (result?.error) {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setActionLoading("")
    }
  }

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Application not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/dashboard/training-applications/${id}`)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to View
          </Button>
          <h1 className="text-2xl font-bold">Edit Training Application</h1>
          {getStatusBadge(watch("status") || application.status)}
        </div>
        
        <div className="flex items-center space-x-2">
          {application.status === "PENDING" && (
            <>
              <Button
                size="sm"
                onClick={() => handleQuickAction("approve")}
                disabled={actionLoading === "approve"}
                className="bg-green-600 hover:bg-green-700"
              >
                {actionLoading === "approve" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Quick Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleQuickAction("reject")}
                disabled={actionLoading === "reject"}
              >
                {actionLoading === "reject" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <X className="h-4 w-4 mr-2" />
                )}
                Quick Reject
              </Button>
            </>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="middleName">Middle Name</Label>
              <Input
                id="middleName"
                {...register("middleName")}
                className={errors.middleName ? "border-red-500" : ""}
              />
              {errors.middleName && (
                <p className="text-red-500 text-sm mt-1">{errors.middleName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="gender">Gender *</Label>
              <Select value={watch("gender")} onValueChange={(value) => setValue("gender", value as Gender)}>
                <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Gender.Male}>Male</SelectItem>
                  <SelectItem value={Gender.Female}>Female</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="age">Age *</Label>
              <Input
                id="age"
                type="number"
                {...register("age", { valueAsNumber: true })}
                className={errors.age ? "border-red-500" : ""}
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="role">Role/Position *</Label>
              <Input
                id="role"
                {...register("role")}
                className={errors.role ? "border-red-500" : ""}
              />
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="organization">Organization *</Label>
              <Input
                id="organization"
                {...register("organization")}
                className={errors.organization ? "border-red-500" : ""}
              />
              {errors.organization && (
                <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Training Information */}
        <Card>
          <CardHeader>
            <CardTitle>Training & Status</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="training">Training Program *</Label>
              <Input
                id="training"
                {...register("training")}
                className={errors.training ? "border-red-500" : ""}
              />
              {errors.training && (
                <p className="text-red-500 text-sm mt-1">{errors.training.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="status">Application Status *</Label>
              <Select value={watch("status")} onValueChange={(value) => setValue("status", value as ApplicationStatus)}>
                <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ApplicationStatus.PENDING}>Pending</SelectItem>
                  <SelectItem value={ApplicationStatus.APPROVED}>Approved</SelectItem>
                  <SelectItem value={ApplicationStatus.REJECTED}>Rejected</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/dashboard/training-applications/${id}`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
