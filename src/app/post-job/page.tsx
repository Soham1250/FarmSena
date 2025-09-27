'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, Zap, Clock, MapPin } from 'lucide-react'

export default function PostJobPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [selectedJobType, setSelectedJobType] = useState<'schedule' | 'instant' | null>(null)

  useEffect(() => {
    // Check if user is logged in and is an owner
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.type !== 'owner') {
      router.push('/login')
      return
    }
    
    setUser(parsedUser)
  }, [router])

  const handleJobTypeSelect = (type: 'schedule' | 'instant') => {
    setSelectedJobType(type)
    // Navigate to create job page with job type parameter
    router.push(`/create-job?type=${type}`)
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link
            href="/dashboard/owner"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <h1 className="text-xl font-semibold text-gray-900">Post New Job</h1>
          
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Job Type</h2>
            <p className="text-gray-600">Select the type your job</p>
          </div>

          {/* Job Type Selection */}
          <div className="space-y-4">
            <div className="text-center mb-6">
              {/* Dropdown-style container */}
              <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                <div className="space-y-4">
                  {/* Schedule a Job Option */}
                  <button
                    onClick={() => handleJobTypeSelect('schedule')}
                    className={`w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedJobType === 'schedule'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        selectedJobType === 'schedule' ? 'bg-primary-100' : 'bg-gray-100'
                      }`}>
                        <Calendar className={`h-6 w-6 ${
                          selectedJobType === 'schedule' ? 'text-primary-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          1. Schedule a Job
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Plan and schedule jobs for future dates with calendar integration
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>Set specific date and time</span>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Instant Job Option */}
                  <button
                    onClick={() => handleJobTypeSelect('instant')}
                    className={`w-full p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                      selectedJobType === 'instant'
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${
                        selectedJobType === 'instant' ? 'bg-primary-100' : 'bg-gray-100'
                      }`}>
                        <Zap className={`h-6 w-6 ${
                          selectedJobType === 'instant' ? 'text-primary-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          2. Instant Job
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Broadcast immediate job alerts to nearby workers with radar view
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                          <MapPin className="h-3 w-3" />
                          <span>Notify workers in your area</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Job Posting Options:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Schedule a Job:</strong> Perfect for planned agricultural activities with specific timing requirements</li>
              <li>• <strong>Instant Job:</strong> Ideal for urgent tasks that need immediate worker attention</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Link
              href="/dashboard/owner"
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center"
            >
              Cancel
            </Link>
            <button
              disabled={!selectedJobType}
              onClick={() => selectedJobType && handleJobTypeSelect(selectedJobType)}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors text-center ${
                selectedJobType
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
