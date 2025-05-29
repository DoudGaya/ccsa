"use client"

import { useState, useEffect } from "react"
import { getPaginatedData } from "@/actions/admin"
import { approveApplication, rejectApplication, deleteApplication } from "@/actions/application-management"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const columns = [
	{ key: "firstName", label: "First Name" },
	{ key: "surname", label: "Surname" },
	{ key: "email", label: "Email" },
	{ key: "phoneNumber", label: "Phone" },
	{
		key: "program",
		label: "Program",
		renderCell: (value: string) => <Badge>{value}</Badge>,
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

interface EnhancedDataTableProps {
  model: string
  title: string
  columns: Array<{
    key: string
    label: string
    renderCell?: (value: any, row: any) => React.ReactNode
  }>
  showActions?: boolean
  actionType?: "program" | "training"
}

export default function ProgramApplicationsPage() {
  return (
    <EnhancedDataTable
      model="programApplication"
      title="Program Applications"
      columns={columns}
    />
  )
}

function EnhancedDataTable({ 
  model, 
  title, 
  columns, 
  showActions = false, 
  actionType = "program" 
}: EnhancedDataTableProps) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)
  const [actionLoading, setActionLoading] = useState<{ [key: number]: string }>({})
  const limit = 10

  useEffect(() => {
    fetchData()
  }, [page, search])

  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await getPaginatedData(model, page, limit, search)
      if (result.data) {
        setData(result.data)
        setTotalPages(Math.ceil(result.total / limit))
        setTotal(result.total)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (id: number, action: string) => {
    setActionLoading(prev => ({ ...prev, [id]: action }))
    
    try {
      let result
      switch (action) {
        case "approve":
          result = await approveApplication(id, actionType)
          break
        case "reject":
          const reason = prompt("Enter rejection reason (optional):")
          result = await rejectApplication(id, actionType, reason || undefined)
          break
        case "delete":
          if (confirm("Are you sure you want to delete this application?")) {
            result = await deleteApplication(id, actionType)
          }
          break
      }

      if (result?.success) {
        toast.success(result.success)
        fetchData() // Refresh data
      } else if (result?.error) {
        toast.error(result.error)
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setActionLoading(prev => {
        const newState = { ...prev }
        delete newState[id]
        return newState
      })
    }
  }

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "-"
    if (value instanceof Date) return value.toLocaleDateString()
    if (typeof value === "boolean") return value ? "Yes" : "No"
    return String(value)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.label}
                    </th>
                  ))}
                  {showActions && (
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row: any, index: number) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td key={column.key} className="py-3 px-4 text-gray-700 dark:text-gray-300">
                        {/* Use renderCell instead of render */}
                        {column.renderCell 
                          ? column.renderCell(row[column.key], row) 
                          : formatValue(row[column.key])
                        }
                      </td>
                    ))}
                    {showActions && (
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          {row.status !== "APPROVED" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAction(row.id, "approve")}
                              disabled={actionLoading[row.id] === "approve"}
                              className="text-green-600 hover:text-green-700"
                            >
                              {actionLoading[row.id] === "approve" ? "..." : "Approve"}
                            </Button>
                          )}
                          {row.status !== "REJECTED" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAction(row.id, "reject")}
                              disabled={actionLoading[row.id] === "reject"}
                              className="text-red-600 hover:text-red-700"
                            >
                              {actionLoading[row.id] === "reject" ? "..." : "Reject"}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAction(row.id, "delete")}
                            disabled={actionLoading[row.id] === "delete"}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            {actionLoading[row.id] === "delete" ? "..." : "Delete"}
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} entries
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
