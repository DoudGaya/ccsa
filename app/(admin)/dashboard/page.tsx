"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, FileText, GraduationCap, MessageSquare, Calendar, BookOpen, UserCheck } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDashboardStats, getMonthlyData, getProgramDistribution, getTrainingApplicationGenderDistribution, getTrainingApplicationAgeDistribution, getTrainingApplicationOrganizationDistribution, getTrainingApplicationRoleDistribution, getTrainingApplicationStatusDistribution } from "@/actions/admin"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658", "#ff7300"]

interface DashboardStats {
  totalApplications: number
  totalContacts: number
  totalVolunteers: number
  totalTrainingApplications: number
  totalEventBookings: number
  totalCustomCourses: number
  totalUsers: number
}

interface MonthlyDataItem {
  name: string
  applications: number
  contacts: number
  volunteers: number
}

interface ProgramDataItem {
  name: string
  value: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    totalContacts: 0,
    totalVolunteers: 0,
    totalTrainingApplications: 0,
    totalEventBookings: 0,
    totalCustomCourses: 0,
    totalUsers: 0,
  })
  const [monthlyData, setMonthlyData] = useState<MonthlyDataItem[]>([])
  const [programData, setProgramData] = useState<ProgramDataItem[]>([])
  const [trainingGenderData, setTrainingGenderData] = useState<ProgramDataItem[]>([])
  const [trainingAgeData, setTrainingAgeData] = useState<ProgramDataItem[]>([])
  const [trainingOrgData, setTrainingOrgData] = useState<ProgramDataItem[]>([])
  const [trainingRoleData, setTrainingRoleData] = useState<ProgramDataItem[]>([])
  const [trainingStatusData, setTrainingStatusData] = useState<ProgramDataItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [
          statsData, 
          monthlyChartData, 
          programChartData,
          trainingGenderChartData,
          trainingAgeChartData,
          trainingOrgChartData,
          trainingRoleChartData,
          trainingStatusChartData
        ] = await Promise.all([
          getDashboardStats(),
          getMonthlyData(),
          getProgramDistribution(),
          getTrainingApplicationGenderDistribution(),
          getTrainingApplicationAgeDistribution(),
          getTrainingApplicationOrganizationDistribution(),
          getTrainingApplicationRoleDistribution(),
          getTrainingApplicationStatusDistribution(),
        ])

        // @ts-ignore
        setStats(statsData)
        setMonthlyData(monthlyChartData as MonthlyDataItem[])
        setProgramData(programChartData as ProgramDataItem[])
        setTrainingGenderData(trainingGenderChartData as ProgramDataItem[])
        setTrainingAgeData(trainingAgeChartData as ProgramDataItem[])
        setTrainingOrgData(trainingOrgChartData as ProgramDataItem[])
        setTrainingRoleData(trainingRoleChartData as ProgramDataItem[])
        setTrainingStatusData(trainingStatusChartData as ProgramDataItem[])
        setError(null)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setError("Failed to load dashboard data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] flex-col">
        <div className="text-red-500 mb-4">⚠️ {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor applications, contacts, and program performance.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className=" border-brand/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chinese Program Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">Total program applications</p>
          </CardContent>
        </Card>

        <Card className=" border-brand/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Applications</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrainingApplications}</div>
            <p className="text-xs text-muted-foreground">Training program applications</p>
          </CardContent>
        </Card>

        <Card className=" border-brand/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEventBookings}</div>
            <p className="text-xs text-muted-foreground">Event registrations</p>
          </CardContent>
        </Card>

        <Card className=" border-brand/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalContacts}</div>
            <p className="text-xs text-muted-foreground">Contact form submissions</p>
          </CardContent>
        </Card>

        <Card className=" border-brand/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Custom Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomCourses}</div>
            <p className="text-xs text-muted-foreground">Custom course requests</p>
          </CardContent>
        </Card>

        <Card className=" border-brand/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVolunteers}</div>
            <p className="text-xs text-muted-foreground">Registered volunteers</p>
          </CardContent>
        </Card>

        <Card className=" border-brand/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-brand/30">
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                <Bar dataKey="contacts" fill="#82ca9d" name="Contacts" />
                <Bar dataKey="volunteers" fill="#ffc658" name="Volunteers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className=" border-brand/30">
          <CardHeader>
            <CardTitle>Program Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {programData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={programData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {programData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-gray-500">
                No program data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Training Applications Distribution Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Training Applications Analytics</h2>
        <p className="text-gray-600 dark:text-gray-400">Distribution analysis of training application demographics and categories.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <Card className=" border-brand/30">
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {trainingGenderData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={trainingGenderData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trainingGenderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-gray-500">
                No gender data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className=" border-brand/30">
          <CardHeader>
            <CardTitle>Age Groups</CardTitle>
          </CardHeader>
          <CardContent>
            {trainingAgeData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={trainingAgeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-gray-500">
                No age data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className=" border-brand/30">
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            {trainingStatusData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={trainingStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trainingStatusData.map((entry, index) => {
                      let color = COLORS[index % COLORS.length]
                      if (entry.name === "APPROVED") color = "#10B981"
                      else if (entry.name === "REJECTED") color = "#EF4444"
                      else if (entry.name === "PENDING") color = "#F59E0B"
                      return <Cell key={`cell-${index}`} fill={color} />
                    })}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-gray-500">
                No status data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* <Card className=" border-brand/30">
          <CardHeader>
            <CardTitle>Organization Types</CardTitle>
          </CardHeader>
          <CardContent>
            {trainingOrgData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={trainingOrgData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name.length > 8 ? name.substring(0, 8) + '...' : name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trainingOrgData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-gray-500">
                No organization data available
              </div>
            )}
          </CardContent>
        </Card> */}

        <Card className=" border-brand/30">
          <CardHeader>
            <CardTitle>Applicant Roles</CardTitle>
          </CardHeader>
          <CardContent>
            {trainingRoleData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={trainingRoleData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[250px] text-gray-500">
                No role data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
