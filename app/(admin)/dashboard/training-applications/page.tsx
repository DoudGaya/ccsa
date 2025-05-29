"use client"
// import EnhancedDataTable from "@/components/EnhancedDataTable"
import EnhancedDataTable from "@/app/components/EnhancedDataTable"
import { Badge } from "@/components/ui/badge"

const columns = [
	{ key: "name", label: "Name" },
	{ key: "email", label: "Email" },
	{ key: "phone", label: "Phone" },
	{ key: "organization", label: "Organization" },
	{
		key: "gender",
		label: "Gender",
		renderCell: (value: string) => <Badge variant="outline">{value}</Badge>, // ✅ Using renderCell
	},
	{ key: "age", label: "Age" },
	{ key: "role", label: "Role" },
	{ key: "training", label: "Training" },
	{ key: "createdAt", label: "Applied On" },
]

export default function TrainingApplicationsPage() {
	return (
		<EnhancedDataTable
			model="trainingApplication"
			title="Training Applications"
			columns={columns}
			showActions={true}
			actionType="training"
		/>
	)
}
