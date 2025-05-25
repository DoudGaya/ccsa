"use client"

import DataTable from "@/components/DataTable"

const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "organization", label: "Organization" },
  { key: "course", label: "Course" },
  { key: "createdAt", label: "Requested On" },
]

export default function CustomCoursesPage() {
  return <DataTable model="customCourse" title="Custom Courses" columns={columns} />
}
