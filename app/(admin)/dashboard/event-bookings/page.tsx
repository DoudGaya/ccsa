'use client'
import DataTable from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "organization", label: "Organization" },
  { key: "event", label: "Event" },
  {
    key: "gender",
    label: "Gender",
    render: (value: string) => <Badge variant="outline">{value}</Badge>,
  },
  { key: "age", label: "Age" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Booked On" },
]

export default function EventBookingsPage() {
  return <DataTable model="eventBooking" title="Event Bookings" columns={columns} />
}
