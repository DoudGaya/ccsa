"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight, Eye, Check, X, Trash2, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { getPaginatedData } from "@/actions/admin"
import {
  approveApplication,
  rejectApplication,
  deleteApplication,
  getApplicationDetails,
} from "@/actions/application-management"
import { toast } from "@/hooks/use-toast"

interface Column {
  key: string
  label: string
  renderCell?: (value: any, row: any) => React.ReactNode // Changed from 'render' to 'renderCell'
}

interface EnhancedDataTableProps {
  model: string
  title: string
  columns: Column[]
  showActions?: boolean
  actionType?: "program" | "training"
}

export default function EnhancedDataTable({
  model,
  title,
  columns,
  showActions = false,
  actionType,
}: EnhancedDataTableProps) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState("")
  const limit = 10

  useEffect(() => {
    fetchData()
  }, [page, search])

  const fetchData = async () => {
    setLoading(true)
    try {
      const result = await getPaginatedData(model, page, limit, search)
      setData(result.data)
      setTotalPages(result.totalPages)
      setTotal(result.total)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleView = async (item: any) => {
    if (actionType) {
      const result = await getApplicationDetails(item.id, actionType)
      if (result.data) {
        setSelectedItem(result.data)
        setShowViewDialog(true)
      }
    } else {
      setSelectedItem(item)
      setShowViewDialog(true)
    }
  }

  const handleApprove = async (item: any) => {
    if (!actionType) return

    const result = await approveApplication(item.id, actionType)
    if (result.success) {
      toast({ title: "Success", description: result.success })
      fetchData()
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" })
    }
  }

  const handleReject = (item: any) => {
    setSelectedItem(item)
    setShowRejectDialog(true)
  }

  const confirmReject = async () => {
    if (!actionType || !selectedItem) return

    const result = await rejectApplication(selectedItem.id, actionType, rejectReason)
    if (result.success) {
      toast({ title: "Success", description: result.success })
      setShowRejectDialog(false)
      setRejectReason("")
      setSelectedItem(null)
      fetchData()
    } else {
      toast({ title: "Error", description: result.error, variant: "destructive" })
    }
  }

  const handleDelete = async (item: any) => {
    if (!actionType) return

    if (confirm("Are you sure you want to delete this application?")) {
      const result = await deleteApplication(item.id, actionType)
      if (result.success) {
        toast({ title: "Success", description: result.success })
        fetchData()
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" })
      }
    }
  }

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "-"
    if (typeof value === "boolean") return value ? "Yes" : "No"
    if (value instanceof Date) return value.toLocaleDateString()
    if (typeof value === "string" && value.includes("T")) {
      try {
        return new Date(value).toLocaleDateString()
      } catch {
        return value
      }
    }
    return value.toString()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "REJECTED":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage and view all {title.toLowerCase()} records.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>
              {title} ({total} total)
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100"
                        >
                          {column.label}
                        </th>
                      ))}
                      {showActions && (
                        <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td
                          colSpan={columns.length + (showActions ? 1 : 0)}
                          className="text-center py-8 text-gray-500 dark:text-gray-400"
                        >
                          No data found
                        </td>
                      </tr>
                    ) : (
                      data.map((row: any, index) => (
                        <tr
                          key={row.id || index}
                          className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        >
                          {columns.map((column) => (
                            <td key={column.key} className="py-3 px-4 text-gray-700 dark:text-gray-300">
                              {/* Changed from column.render to column.renderCell */}
                              {column.renderCell
                                ? column.renderCell(row[column.key], row)
                                : column.key === "status"
                                  ? getStatusBadge(row[column.key])
                                  : formatValue(row[column.key])}
                            </td>
                          ))}
                          {showActions && (
                            <td className="py-3 px-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleView(row)}>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View
                                  </DropdownMenuItem>
                                  {row.status === "PENDING" && (
                                    <>
                                      <DropdownMenuItem onClick={() => handleApprove(row)}>
                                        <Check className="h-4 w-4 mr-2" />
                                        Approve
                                      </DropdownMenuItem>
                                      <DropdownMenuItem onClick={() => handleReject(row)}>
                                        <X className="h-4 w-4 mr-2" />
                                        Reject
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  <DropdownMenuItem onClick={() => handleDelete(row)} className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total} results
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Page {page} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <div className="space-y-4">
              {Object.entries(selectedItem).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 gap-4">
                  <div className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</div>
                  <div className="col-span-2">{formatValue(value)}</div>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Application</DialogTitle>
            <DialogDescription>Please provide a reason for rejecting this application.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reason">Reason for rejection</Label>
              <Textarea
                id="reason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Enter reason for rejection..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              Reject Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
