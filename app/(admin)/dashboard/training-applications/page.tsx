"use client"
import DataTable from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "organization", label: "Organization" },
  {
    key: "gender",
    label: "Gender",
    render: (value: string) => <Badge variant="outline">{value}</Badge>,
  },
  { key: "age", label: "Age" },
  { key: "role", label: "Role" },
  { key: "training", label: "Training" },
  { key: "createdAt", label: "Applied On" },
]

export default function TrainingApplicationsPage() {
  return <DataTable model="trainingApplication" title="Training Applications" columns={columns} />
}
