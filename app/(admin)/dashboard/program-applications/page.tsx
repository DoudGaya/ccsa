"use client"
import UniversalDataTable from "@/app/components/UniversalDataTable"
import { Badge } from "@/components/ui/badge"
import { deleteRecord } from "@/actions/crud-operations"

const columns = [
    { key: "firstName", label: "First Name" },
    { key: "surname", label: "Surname" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone" },
    {
        key: "program",
        label: "Program",
        renderCell: (value: string) => {
            const programNames: Record<string, string> = {
                CHINA_CLIMATE_SMART_AGRICULTURE_1M: "Climate-Smart Agriculture (1M)",
                CHINA_CLIMATE_SMART_AGRICULTURE_4M: "Climate-Smart Agriculture (4M)",
                CHINA_ADVANCED_TECHNOLOGIES_1M: "Advanced Technologies (1M)",
                CHINA_ADVANCED_TECHNOLOGIES_4M: "Advanced Technologies (4M)",
                CHINA_HEALTH_SCIENCES_1M: "Health Sciences (1M)",
                CHINA_HEALTH_SCIENCES_4M: "Health Sciences (4M)",
            }
            return (
                <Badge variant="outline" className="text-xs">
                    {programNames[value] || value || "Not specified"}
                </Badge>
            )
        },
    },
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

export default function ProgramApplicationsPage() {
    // Create a wrapper function that matches the expected signature
    const handleDelete = async (model: string, id: number) => {
        return await deleteRecord("programApplication", id)
    }

    return (
        <UniversalDataTable
            model="programApplication"
            title="Program Applications"
            columns={columns}
            basePath="/dashboard/program-applications"
            onDelete={handleDelete}
        />
    )
}
