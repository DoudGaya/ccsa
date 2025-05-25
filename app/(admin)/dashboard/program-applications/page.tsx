
"use client"
import DataTable from "@/components/DataTable"
import { Badge } from "@/components/ui/badge"

const columns = [
  { key: "firstName", label: "First Name" },
  { key: "surname", label: "Surname" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone" },
  {
    key: "program",
    label: "Program",
    render: (value: string) => {
      const programNames: Record<string, string> = {
        AGRIC_TECH: "Agricultural Technology",
        HEALTH_TECH: "Health Technology",
        ROBOTICS_INDUSTRIAL_AUTOMATION: "Robotics & Industrial Automation",
        AI_DATA_SCIENCE_ROBOTICS: "AI, Data Science & Robotics",
        CHINA_CLIMATE_SMART_AGRICULTURE_1M: "China Climate-Smart Agriculture (1M)",
        CHINA_CLIMATE_SMART_AGRICULTURE_4M: "China Climate-Smart Agriculture (4M)",
        CHINA_ADVANCED_TECHNOLOGIES_1M: "China Advanced Technologies (1M)",
        CHINA_ADVANCED_TECHNOLOGIES_4M: "China Advanced Technologies (4M)",
        CHINA_HEALTH_SCIENCES_1M: "China Health Sciences (1M)",
        CHINA_HEALTH_SCIENCES_4M: "China Health Sciences (4M)",
      }
      return (
        <Badge variant="outline" className="text-xs">
          {programNames[value] || value || "Not specified"}
        </Badge>
      )
    },
  },
  {
    key: "isCosmopolitanStudent",
    label: "Cosmopolitan Student",
    render: (value: boolean) => <Badge variant={value ? "default" : "secondary"}>{value ? "Yes" : "No"}</Badge>,
  },
  { key: "createdAt", label: "Applied On" },
]

export default function ProgramApplicationsPage() {
  return <DataTable model="programApplication" title="Program Applications" columns={columns} />
}
