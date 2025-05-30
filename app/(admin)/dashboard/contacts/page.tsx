"use client"
// import UniversalDataTable from "@/components/UniversalDataTable"
import UniversalDataTable from "@/app/components/UniversalDataTable"
import { deleteRecord } from "@/actions/crud-operations"

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "subject", label: "Subject" },
  {
    key: "message",
    label: "Message",
    render: (value: string) => (
      <div className="max-w-xs truncate" title={value}>
        {value || "-"}
      </div>
    ),
  },
  { key: "createdAt", label: "Submitted On" },
]

const handleDelete = async (model: string, id: number) => {
  return await deleteRecord("contact", id)
}

export default function ContactsPage() {
  return (
    <UniversalDataTable
      model="contact"
      title="Contacts"
      columns={columns}
      basePath="/dashboard/contacts"
      onDelete={handleDelete}
    />
  )
}


// 'use client'
// import DataTable from "@/components/DataTable"

// const columns = [
//   { key: "name", label: "Name" },
//   { key: "email", label: "Email" },
//   { key: "subject", label: "Subject" },
//   {
//     key: "message",
//     label: "Message",
//     // Move this rendering logic to the client side
//     renderCell: (value: string) => (
//       <div className="max-w-xs truncate" title={value}>
//         {value || "-"}
//       </div>
//     ),
//   },
//   { key: "createdAt", label: "Submitted On" },
// ]

// export default function ContactsPage() {
//   return <DataTable model="contact" title="Contacts" columns={columns} />
// }
