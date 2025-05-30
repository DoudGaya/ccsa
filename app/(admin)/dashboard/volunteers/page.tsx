"use client"
import UniversalDataTable from "@/app/components/UniversalDataTable"
import { Badge } from "@/components/ui/badge"
import { deleteRecord } from "@/actions/crud-operations"

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "state", label: "State" },
  {
    key: "gender",
    label: "Gender",
    renderCell: (value: string) => <Badge variant="outline">{value || "-"}</Badge>, // ✅ Changed from 'render' to 'renderCell'
  },
  { key: "localGovernment", label: "LGA" },
  { key: "organization", label: "Organization" },
  { key: "yearsOfFarmingExperience", label: "Farming Experience (Years)" },
  { key: "createdAt", label: "Registered On" },
]

const handleDelete = async (model: string, id: number) => {
  return await deleteRecord(model, id)
}

export default function VolunteersPage() {
  return (
    <UniversalDataTable
      model="volunteers"
      title="Volunteers"
      columns={columns}
      basePath="/dashboard/volunteers"
      onDelete={handleDelete}
    />
  )
}
