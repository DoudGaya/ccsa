"use client"

import type React from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Calendar,
  BookOpen,
  GraduationCap,
  UserCheck,
  Menu,
  X,
  LogOut,
  Settings,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ChangePasswordModal from "@/components/ChangePasswordModal"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Program Applications",
    href: "/dashboard/program-applications",
    icon: FileText,
  },
  {
    title: "Training Applications",
    href: "/dashboard/training-applications",
    icon: GraduationCap,
  },
  {
    title: "Event Bookings",
    href: "/dashboard/event-bookings",
    icon: Calendar,
  },
  {
    title: "Custom Courses",
    href: "/dashboard/custom-courses",
    icon: BookOpen,
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
    icon: MessageSquare,
  },
  {
    title: "Volunteers",
    href: "/dashboard/volunteers",
    icon: Users,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: UserCheck,
  },
]

export default function AdminContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin")
      return
    }

    setIsLoading(false)
  }, [session, status, router])

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">CCSA Admin Desk</h1>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 flex-1">
          <div className="px-3">
            {sidebarItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center px-3 py-2 mt-1 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.title}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 bg-bran left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400">Logged in as: {session?.user?.name}</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowChangePassword(true)} className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex-1">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center w-full justify-between space-x-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {session?.user?.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden bg-brand text-white sm:flex">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>

      <ChangePasswordModal isOpen={showChangePassword} onClose={() => setShowChangePassword(false)} />
    </div>
  )
}