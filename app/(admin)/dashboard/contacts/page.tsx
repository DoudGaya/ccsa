'use client'
import DataTable from "@/components/DataTable"

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "subject", label: "Subject" },
  {
    key: "message",
    label: "Message",
    // Move this rendering logic to the client side
    renderCell: (value: string) => (
      <div className="max-w-xs truncate" title={value}>
        {value || "-"}
      </div>
    ),
  },
  { key: "createdAt", label: "Submitted On" },
]

export default function ContactsPage() {
  return <DataTable model="contact" title="Contacts" columns={columns} />
}
