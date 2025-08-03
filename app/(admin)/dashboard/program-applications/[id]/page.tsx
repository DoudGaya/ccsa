import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Edit, Calendar, User, Mail, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getRecord } from "@/actions/crud-operations"
import { ProgramApplication } from "@/@types"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProgramApplicationDetailPage({ params }: PageProps) {
  const { id } = await params
  const result = await getRecord("programApplication", Number.parseInt(id))

  if (result.error || !result.data) {
    notFound()
  }

  const application = result.data as ProgramApplication

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const programNames: Record<string, string> = {
    CHINA_CLIMATE_SMART_AGRICULTURE_1M: "Climate-Smart Agriculture (1 Month)",
    CHINA_CLIMATE_SMART_AGRICULTURE_4M: "Climate-Smart Agriculture (4 Months)",
    CHINA_ADVANCED_TECHNOLOGIES_1M: "Advanced Technologies (1 Month)",
    CHINA_ADVANCED_TECHNOLOGIES_4M: "Advanced Technologies (4 Months)",
    CHINA_HEALTH_SCIENCES_1M: "Health Sciences (1 Month)",
    CHINA_HEALTH_SCIENCES_4M: "Health Sciences (4 Months)",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/program-applications">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Applications
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {application.firstName} {application.surname}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Program Application Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(application.status)}
          <Link href={`/dashboard/program-applications/${id}/edit`}>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">First Name</label>
                <p className="text-gray-900 dark:text-gray-100">{application.firstName}</p>
              </div>
              {application.middleName && (
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Middle Name</label>
                  <p className="text-gray-900 dark:text-gray-100">{application.middleName}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Surname</label>
                <p className="text-gray-900 dark:text-gray-100">{application.surname}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</label>
                <p className="text-gray-900 dark:text-gray-100">{formatDate(application.dateOfBirth)}</p>
              </div>
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
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
              <p className="text-gray-900 dark:text-gray-100">{application.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</label>
              <p className="text-gray-900 dark:text-gray-100">{application.phoneNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</label>
              <p className="text-gray-900 dark:text-gray-100">{application.address}</p>
            </div>
          </CardContent>
        </Card>

        {/* Program Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Program Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Program</label>
              <p className="text-gray-900 dark:text-gray-100">
                {application.program ? programNames[application.program] || application.program : "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</label>
              <p className="text-gray-900 dark:text-gray-100">{application.duration || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Highest Qualification</label>
              <p className="text-gray-900 dark:text-gray-100">{application.highestQualification}</p>
            </div>
          </CardContent>
        </Card>

        {/* Passport Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Passport Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Passport Number</label>
              <p className="text-gray-900 dark:text-gray-100">{application.passportNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Country of Issue</label>
              <p className="text-gray-900 dark:text-gray-100">{application.passportCountryOfIssue}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Issue</label>
              <p className="text-gray-900 dark:text-gray-100">{formatDate(application.passportDateOfIssue)}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Expiry Date</label>
              <p className="text-gray-900 dark:text-gray-100">{formatDate(application.passportExpiryDate)}</p>
            </div>
          </CardContent>
        </Card>

        {/* University Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              University Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Cosmopolitan Student</label>
              <p className="text-gray-900 dark:text-gray-100">{application.isCosmopolitanStudent ? "Yes" : "No"}</p>
            </div>
            {application.course && (
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Course</label>
                <p className="text-gray-900 dark:text-gray-100">{application.course}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Application Metadata */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Application Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Application ID</label>
                <p className="text-gray-900 dark:text-gray-100">#{application.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Submitted On</label>
                <p className="text-gray-900 dark:text-gray-100">{formatDate(application.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Updated</label>
                <p className="text-gray-900 dark:text-gray-100">{formatDate(application.updatedAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
