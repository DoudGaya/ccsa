"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { Search, Eye, Edit, Trash2, MoreHorizontal, Check, X, ArrowUpDown, Loader2, FilterX } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getPaginatedData } from "@/actions/admin"
import { approveApplication, rejectApplication } from "@/actions/application-management"
import { toast } from "@/hooks/use-toast"

interface Column {
  key: string
  label: string
  renderCell?: (value: any, row: any) => React.ReactNode
}

interface UniversalDataTableProps {
  model: string
  title: string
  columns: Column[]
  basePath: string
  onDelete?: (model: string, id: number) => Promise<{ success?: string; error?: string }>
  showQuickActions?: boolean
  actionType?: "program" | "training"
}

export default function UniversalDataTable({ 
  model, 
  title, 
  columns, 
  basePath, 
  onDelete,
  showQuickActions = false,
  actionType
}: UniversalDataTableProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterGender, setFilterGender] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [filterOrganization, setFilterOrganization] = useState("")
  const [filterRole, setFilterRole] = useState("")
  const [actionLoading, setActionLoading] = useState<{ [key: number]: string }>({})
  const router = useRouter()
  const limit = 20 // Increase limit for infinite scroll
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reset and fetch initial data when search or filters change
    setData([])
    setPage(1)
    setHasNextPage(true)
    fetchData(1, true)
  }, [search, sortBy, sortOrder, filterGender, filterStatus, filterOrganization, filterRole])

  // Intersection Observer for infinite scroll
  const lastElementRef = useCallback((node: HTMLTableRowElement) => {
    if (loading || loadingMore) return
    if (observerTarget.current) observerTarget.current = null
    
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasNextPage && !loadingMore) {
        loadMore()
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px'
    })
    
    if (node) {
      observer.observe(node)
      observerTarget.current = node
    }
    
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loading, loadingMore, hasNextPage])

  const fetchData = async (pageNum: number = page, reset: boolean = false) => {
    if (reset) {
      setLoading(true)
    } else {
      setLoadingMore(true)
    }
    
    try {
      const result = await getPaginatedData(model, pageNum, limit, search, {
        sortBy,
        sortOrder,
        filterGender,
        filterStatus,
        filterOrganization,
        filterRole,
      })
      
      if (reset) {
        setData(result.data)
      } else {
        setData(prevData => [...prevData, ...result.data])
      }
      
      setTotal(result.total)
      setHasNextPage(result.data.length === limit && (pageNum * limit) < result.total)
      
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const loadMore = () => {
    if (!hasNextPage || loadingMore) return
    const nextPage = page + 1
    setPage(nextPage)
    fetchData(nextPage, false)
  }

  const handleSearch = (value: string) => {
    setSearch(value)
  }

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const clearFilters = () => {
    setFilterGender("")
    setFilterStatus("")
    setFilterOrganization("")
    setFilterRole("")
    setSortBy("")
    setSortOrder("asc")
  }

  const handleQuickAction = async (id: number, action: "approve" | "reject") => {
    if (!actionType) return

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
      }

      if (result?.success) {
        toast({ title: "Success", description: result.success })
        // Reset and refetch data after action
        setData([])
        setPage(1)
        setHasNextPage(true)
        fetchData(1, true)
      } else if (result?.error) {
        toast({ title: "Error", description: result.error, variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error", description: "An error occurred", variant: "destructive" })
    } finally {
      setActionLoading(prev => {
        const newState = { ...prev }
        delete newState[id]
        return newState
      })
    }
  }

  const handleView = (id: number) => {
    router.push(`${basePath}/${id}`)
  }

  const handleEdit = (id: number) => {
    router.push(`${basePath}/${id}/edit`)
  }

  const handleDelete = async (id: number) => {
    if (!onDelete) return

    if (confirm("Are you sure you want to delete this item?")) {
      const result = await onDelete(model, id)
      if (result.success) {
        toast({ title: "Success", description: result.success })
        // Reset and refetch data after deletion
        setData([])
        setPage(1)
        setHasNextPage(true)
        fetchData(1, true)
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" })
      }
    }
  }

  const formatValue = (value: any) => {
    if (value === null || value === undefined) return "-"
    if (typeof value === "boolean") return value ? "Yes" : "No"
    
    // Handle Date objects
    if (value instanceof Date) {
      return isNaN(value.getTime()) ? "-" : value.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }
    
    // Handle date strings (ISO format, etc.)
    if (typeof value === "string") {
      // Check if it looks like a date string
      if (value.includes("T") || value.match(/^\d{4}-\d{2}-\d{2}/)) {
        try {
          const date = new Date(value)
          if (!isNaN(date.getTime()) && date.getFullYear() > 1900 && date.getFullYear() < 3000) {
            return date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })
          }
        } catch (error) {
          console.warn('Date parsing error for value:', value, error)
        }
      }
      return value
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
            <div className="flex items-center space-x-2 flex-wrap">
              {/* Filters for training applications */}
              {(model === "trainingApplication" || model === "programApplication") && (
                <>
                  <Select value={filterGender || "all"} onValueChange={(value) => setFilterGender(value === "all" ? "" : value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Genders</SelectItem>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterStatus || "all"} onValueChange={(value) => setFilterStatus(value === "all" ? "" : value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterOrganization || "all"} onValueChange={(value) => setFilterOrganization(value === "all" ? "" : value)}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Organization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Organizations</SelectItem>
                      <SelectItem value="Government">Government</SelectItem>
                      <SelectItem value="NGO">NGO</SelectItem>
                      <SelectItem value="Private Company">Private Company</SelectItem>
                      <SelectItem value="University">University</SelectItem>
                      <SelectItem value="Research Institution">Research Institution</SelectItem>
                      <SelectItem value="International Organization">International Organization</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterRole || "all"} onValueChange={(value) => setFilterRole(value === "all" ? "" : value)}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Farmer">Farmer</SelectItem>
                      <SelectItem value="Extension Agent">Extension Agent</SelectItem>
                      <SelectItem value="Researcher">Researcher</SelectItem>
                      <SelectItem value="Policy Maker">Policy Maker</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Private Sector">Private Sector</SelectItem>
                      <SelectItem value="NGO Worker">NGO Worker</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSort("age")}
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    Age {sortBy === "age" && (sortOrder === "asc" ? "↑" : "↓")}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSort("organization")}
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    Org {sortBy === "organization" && (sortOrder === "asc" ? "↑" : "↓")}
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center gap-1"
                  >
                    <ArrowUpDown className="h-4 w-4" />
                    Date {sortBy === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
                  </Button>

                  {/* Clear Filters Button */}
                  {(filterGender || filterStatus || filterOrganization || filterRole || sortBy) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                    >
                      <FilterX className="h-4 w-4" />
                      Clear Filters
                    </Button>
                  )}
                </>
              )}
              
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
                      <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-gray-100">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={columns.length + 1} className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No data found
                        </td>
                      </tr>
                    ) : (
                      data.map((row: any, index) => {
                        const isLast = index === data.length - 1
                        return (
                          <tr
                            key={row.id || index}
                            ref={isLast ? lastElementRef : null}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          >
                            {columns.map((column) => (
                              <td key={column.key} className="py-3 px-4 text-gray-700 dark:text-gray-300">
                                {column.renderCell
                                  ? column.renderCell(row[column.key], row)
                                  : column.key === "status"
                                    ? getStatusBadge(row[column.key])
                                    : formatValue(row[column.key])}
                              </td>
                            ))}
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-1">
                                {/* Quick action buttons for pending applications */}
                                {showQuickActions && actionType && row.status === "PENDING" && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleQuickAction(row.id, "approve")}
                                      disabled={actionLoading[row.id] === "approve"}
                                      className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                                    >
                                      {actionLoading[row.id] === "approve" ? (
                                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-green-600 border-t-transparent" />
                                      ) : (
                                        <Check className="h-3 w-3" />
                                      )}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleQuickAction(row.id, "reject")}
                                      disabled={actionLoading[row.id] === "reject"}
                                      className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                    >
                                      {actionLoading[row.id] === "reject" ? (
                                        <div className="animate-spin rounded-full h-3 w-3 border-2 border-red-600 border-t-transparent" />
                                      ) : (
                                        <X className="h-3 w-3" />
                                      )}
                                    </Button>
                                  </>
                                )}
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleView(row.id)}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      View
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleEdit(row.id)}>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit
                                    </DropdownMenuItem>
                                    {onDelete && (
                                      <DropdownMenuItem onClick={() => handleDelete(row.id)} className="text-red-600">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Loading indicator for infinite scroll */}
              {loadingMore && (
                <div className="flex items-center justify-center py-8">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading more...</span>
                  </div>
                </div>
              )}

              {/* End of data indicator */}
              {!hasNextPage && data.length > 0 && (
                <div className="flex items-center justify-center py-8">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Showing all {total} results
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
