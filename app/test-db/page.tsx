"use client"

import { useState, useEffect } from 'react'
import { testDatabaseConnection } from '@/actions/debug'
import { safeGetTrainingApplications } from '@/actions/safe-query'
import { addQualificationsColumn } from '@/actions/migration'

export default function TestPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dbTest, setDbTest] = useState<any>(null)
  const [safeQueryResult, setSafeQueryResult] = useState<any>(null)
  const [migrationResult, setMigrationResult] = useState<any>(null)
  const [migrationLoading, setMigrationLoading] = useState(false)

  const runMigration = async () => {
    setMigrationLoading(true)
    try {
      const result = await addQualificationsColumn()
      setMigrationResult(result)
      
      // If migration was successful, try fetching data again
      if (result.success) {
        const newSafeResult = await safeGetTrainingApplications()
        setSafeQueryResult(newSafeResult)
        if (newSafeResult.success) {
          setApplications(newSafeResult.data)
          setError(null)
        }
      }
    } catch (err) {
      setMigrationResult({
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error'
      })
    } finally {
      setMigrationLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Test database connection first
        const dbResult = await testDatabaseConnection()
        setDbTest(dbResult)
        
        // Try safe query
        const safeResult = await safeGetTrainingApplications()
        setSafeQueryResult(safeResult)
        
        if (safeResult.success) {
          setApplications(safeResult.data)
        } else {
          setError(safeResult.error || 'Unknown error')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Database Diagnostic & Migration Page</h1>
      
      {/* Migration Section */}
      <div className="mb-6 p-4 border rounded-lg bg-blue-50">
        <h2 className="text-lg font-semibold mb-2">Database Migration</h2>
        <p className="text-sm text-gray-600 mb-3">
          If you're seeing "qualifications column does not exist" error, click the button below to add the missing column.
        </p>
        <button
          onClick={runMigration}
          disabled={migrationLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {migrationLoading ? 'Running Migration...' : 'Add Qualifications Column'}
        </button>
        
        {migrationResult && (
          <div className={`mt-3 p-3 rounded ${migrationResult.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <strong>{migrationResult.success ? 'Success:' : 'Error:'}</strong> {migrationResult.message || migrationResult.error}
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Database Connection Test</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-40">
            {JSON.stringify(dbTest, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Safe Query Result</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-40">
            {JSON.stringify(safeQueryResult, null, 2)}
          </pre>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-2">Training Applications ({applications.length})</h2>
        {applications.length > 0 ? (
          <div className="grid gap-4">
            {applications.map((app) => (
              <div key={app.id} className="border p-4 rounded bg-white shadow">
                <p><strong>Name:</strong> {app.firstName} {app.middleName} {app.lastName}</p>
                <p><strong>Email:</strong> {app.email}</p>
                <p><strong>Organization:</strong> {app.organization}</p>
                <p><strong>Qualifications:</strong> {app.qualifications || 'Not specified'}</p>
                <p><strong>Applied:</strong> {new Date(app.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            No applications found. This might be because:
            <ul className="list-disc list-inside mt-2">
              <li>The table is empty (no applications submitted yet)</li>
              <li>There's a database connection issue</li>
              <li>The table doesn't exist or needs migration</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
