"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Check, X, Trash2, Mail, Phone, Calendar, Building, User, Award } from "lucide-react"
import { approveApplication, rejectApplication, deleteApplication, getApplicationDetails } from "@/actions/application-management"
import { toast } from "sonner"
import { TrainingApplication } from "@/@types"

export default function TrainingApplicationViewPage() {
  const params = useParams()
  const router = useRouter()
  const [application, setApplication] = useState<TrainingApplication | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState("")

  const id = Array.isArray(params.id) ? params.id[0] : params.id

  useEffect(() => {
    if (id) {
      fetchApplication()
    }
  }, [id])

  const fetchApplication = async () => {
    try {
      if (!id) return
      const result = await getApplicationDetails(parseInt(id), "training")
      if (result.data) {
        setApplication(result.data as TrainingApplication)
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

  const handleAction = async (action: "approve" | "reject" | "delete") => {
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
        case "delete":
          if (confirm("Are you sure you want to delete this application?")) {
            result = await deleteApplication(application.id, "training")
            if (result.success) {
              toast.success("Application deleted successfully")
              router.push("/dashboard/training-applications")
              return
            }
          }
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

  const getStatusBadge = (status: string) => {
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

  const formatDate = (date: string | Date) => {
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    } catch {
      return "Invalid Date"
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
            onClick={() => router.push("/dashboard/training-applications")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Applications
          </Button>
          <h1 className="text-2xl font-bold">Training Application Details</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {application.status === "PENDING" && (
            <>
              <Button
                size="sm"
                onClick={() => handleAction("approve")}
                disabled={actionLoading === "approve"}
                className="bg-green-600 hover:bg-green-700"
              >
                {actionLoading === "approve" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <Check className="h-4 w-4 mr-2" />
                )}
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleAction("reject")}
                disabled={actionLoading === "reject"}
              >
                {actionLoading === "reject" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <X className="h-4 w-4 mr-2" />
                )}
                Reject
              </Button>
            </>
          )}
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push(`/dashboard/training-applications/${id}/edit`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAction("delete")}
            disabled={actionLoading === "delete"}
            className="text-red-600 hover:text-red-700"
          >
            {actionLoading === "delete" ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-red-600 border-t-transparent" />
            ) : (
              <Trash2 className="h-4 w-4 mr-2" />
            )}
            Delete
          </Button>
        </div>
      </div>

      {/* Application Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Application Status</CardTitle>
            {getStatusBadge(application.status)}
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="h-5 w-5 mr-2" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Full Name</label>
            <p className="text-lg font-medium">
              {application.firstName} {application.middleName} {application.lastName}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Gender</label>
            <p className="text-lg">{application.gender}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Age</label>
            <p className="text-lg">{application.age} years</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Role/Position</label>
            <p className="text-lg">{application.role}</p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Email Address</label>
            <p className="text-lg">{application.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Phone Number</label>
            <p className="text-lg">{application.phone}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-500">Organization</label>
            <p className="text-lg">{application.organization}</p>
          </div>
        </CardContent>
      </Card>

      {/* Training Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Training Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <label className="text-sm font-medium text-gray-500">Training Program</label>
            <p className="text-lg font-medium">{application.training}</p>
          </div>
        </CardContent>
      </Card>

      {/* Application Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Application Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-500">Applied On</label>
            <p className="text-lg">{formatDate(application.createdAt)}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Last Updated</label>
            <p className="text-lg">{formatDate(application.updatedAt)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
