"use client"
import UniversalDataTable from "@/app/components/UniversalDataTable"
import { Badge } from "@/components/ui/badge"
import { deleteRecord } from "@/actions/crud-operations"

const columns = [
  { key: "firstName", label: "First Name" },
  { key: "middleName", label: "Middle Name" },
  { key: "lastName", label: "Last Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "organization", label: "Organization" },
  {
    key: "gender",
    label: "Gender",
    renderCell: (value: string) => <Badge variant="outline">{value}</Badge>, 
  },
  { key: "age", label: "Age" },
  { key: "role", label: "Role" },
  { key: "training", label: "Training" },
  {
    key: "status",
    label: "Status",
    renderCell: (value: string) => {
      const getStatusColor = (status: string) => {
        switch (status) {
          case "APPROVED":
            return "bg-green-100 text-green-800"
          case "REJECTED":
            return "bg-red-100 text-red-800"
          case "PENDING":
            return "bg-yellow-100 text-yellow-800"
          default:
            return "bg-gray-100 text-gray-800"
        }
      }
      
      return (
        <Badge className={getStatusColor(value)}>
          {value || "PENDING"}
        </Badge>
      )
    },
  },
  { key: "createdAt", label: "Applied On" },
]

export default function TrainingApplicationsPage() {
  // Create a wrapper function that matches the expected signature
  const handleDelete = async (model: string, id: number) => {
    return await deleteRecord(model, id)
  }

  return (
    <UniversalDataTable
      model="trainingApplication"
      title="Training Applications"
      columns={columns}
      basePath="/dashboard/training-applications"
      onDelete={handleDelete}
      showQuickActions={true}
      actionType="training"
    />
  )
}
