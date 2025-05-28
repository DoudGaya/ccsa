import AdminProvider from "./provider"
import AdminContent from "./admin-content"


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminProvider>
      <AdminContent>{children}</AdminContent>
    </AdminProvider>
  )
}