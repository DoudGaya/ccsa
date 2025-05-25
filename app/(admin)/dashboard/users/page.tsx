"use client"
import DataTable from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  {
    key: "role",
    label: "Role",
    render: (value: string) => <Badge variant={value === "ADMIN" ? "default" : "secondary"}>{value}</Badge>,
  },
  {
    key: "emailVerified",
    label: "Email Verified",
    render: (value: string) => <Badge variant={value ? "default" : "destructive"}>{value ? "Yes" : "No"}</Badge>,
  },
  { key: "createdAt", label: "Joined On" },
]

export default function UsersPage() {
  return <DataTable model="user" title="Users" columns={columns} />
}
