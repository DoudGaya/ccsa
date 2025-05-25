"use client"
import DataTable from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "state", label: "State" },
  {
    key: "gender",
    label: "Gender",
    render: (value: string) => <Badge variant="outline">{value || "-"}</Badge>,
  },
  { key: "localGovernment", label: "LGA" },
  { key: "organization", label: "Organization" },
  { key: "yearsOfFarmingExperience", label: "Farming Experience (Years)" },
  { key: "createdAt", label: "Registered On" },
]

export default function VolunteersPage() {
  return <DataTable model="volunteers" title="Volunteers" columns={columns} />
}
