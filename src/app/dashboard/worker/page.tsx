'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Menu, User, LogOut, MapPin, Clock, Bell, Zap, X } from 'lucide-react'

export default function WorkerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [instantNotifications, setInstantNotifications] = useState<any[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [instantJobs, setInstantJobs] = useState<any[]>([])
  const [allJobs, setAllJobs] = useState<any[]>([])

  const combineAllJobs = useCallback((instantJobsList: any[]) => {
    // Sample regular job data
    const regularJobs = [
      {
        id: 1001,
        title: 'Crop Harvesting',
        location: 'Green Valley Farm',
        duration: '3 days',
        pay: '₹150/day',
        description: 'Help with seasonal corn harvest. Experience with farm equipment preferred.',
        postedBy: 'John Smith',
        distance: '2.5 km away',
        isInstant: false
      },
      {
        id: 1002,
        title: 'Irrigation Setup',
        location: 'Sunny Acres',
        duration: '2 days',
        pay: '₹120/day',
        description: 'Install new irrigation system for vegetable crops.',
        postedBy: 'Sarah Johnson',
        distance: '4.1 km away',
        isInstant: false
      },
      {
        id: 1003,
        title: 'Soil Preparation',
        location: 'Riverside Farm',
        duration: '1 week',
        pay: '₹100/day',
        description: 'Prepare soil for next season planting. Tractor operation experience required.',
        postedBy: 'Mike Wilson',
        distance: '1.8 km away',
        isInstant: false
      }
    ]
    // Combine instant jobs and regular jobs, with instant jobs first
    const combined = [...instantJobsList, ...regularJobs]
    setAllJobs(combined)
  }, [])

  const loadInstantJobs = useCallback(() => {
    // Load instant jobs from localStorage
    const storedInstantJobs = JSON.parse(localStorage.getItem('instantJobs') || '[]')
    setInstantJobs(storedInstantJobs)
    
    // Combine with regular jobs
    combineAllJobs(storedInstantJobs)
  }, [combineAllJobs])

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.type !== 'worker') {
      router.push('/login')
      return
    }
    
    setUser(parsedUser)

    // Load instant jobs from localStorage
    loadInstantJobs()

    // Simulate receiving instant job notifications
    const checkForInstantJobs = () => {
      // In a real app, this would check for new instant job broadcasts
      // For demo, we'll occasionally show a notification
      if (Math.random() > 0.8) { // 20% chance every check
        const mockInstantJob = {
          id: Date.now(),
          title: 'Urgent Crop Harvesting',
          location: '2.3km away',
          pay: '₹200/day',
          duration: '4 hours',
          urgency: 'high',
          postedBy: 'Farm Owner',
          description: 'Immediate help needed for crop harvesting due to weather conditions.',
          timeReceived: new Date().toLocaleTimeString()
        }
        
        setInstantNotifications(prev => [mockInstantJob, ...prev.slice(0, 2)]) // Keep max 3 notifications
        setShowNotifications(true)
      }
    }

    // Check for instant jobs every 30 seconds (in real app, this would be WebSocket/SSE)
    const interval = setInterval(checkForInstantJobs, 30000)
    
    return () => clearInterval(interval)
  }, [router, loadInstantJobs])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleAcceptInstantJob = (jobId: number) => {
    setInstantNotifications(prev => prev.filter(job => job.id !== jobId))
    alert('Job accepted! You will be contacted by the land owner.')
  }

  const handleDeclineInstantJob = (jobId: number) => {
    setInstantNotifications(prev => prev.filter(job => job.id !== jobId))
  }

  const dismissNotification = (jobId: number) => {
    setInstantNotifications(prev => prev.filter(job => job.id !== jobId))
  }


  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Menu Button */}
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
            <Menu className="h-5 w-5" />
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Notifications */}
          <div className="relative mr-4">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors relative"
              title="Instant Job Notifications"
            >
              <Bell className="h-5 w-5" />
              {instantNotifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {instantNotifications.length}
                </span>
              )}
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">you</span>
            </Link>
            <button
              onClick={handleLogout}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Find your next agricultural opportunity</p>
        </div>

        {/* Available Jobs Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Jobs</h2>
          
          <div className="space-y-4">
            {allJobs.filter(job => 
              job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.description.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-200 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                      {job.isInstant && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Zap className="h-3 w-3" />
                          INSTANT
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary-600" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary-600" />
                        <span>{job.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary-600 font-semibold text-lg">
                      {job.pay}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{job.distance}</div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">{job.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Posted by <span className="font-medium">{job.postedBy}</span></span>
                  <Link
                    href={`/job/${job.id}`}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-block"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State when no jobs match search */}
        {searchQuery && allJobs.filter(job => 
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="text-gray-600 mb-2">No jobs found matching &quot;{searchQuery}&quot;</div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Instant Job Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-16 right-4 w-96 bg-white rounded-xl border border-gray-200 shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Instant Job Alerts
              </h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {instantNotifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p>No instant job alerts at the moment</p>
                <p className="text-sm mt-1">You&apos;ll be notified when urgent jobs are posted nearby</p>
              </div>
            ) : (
              <div className="space-y-1">
                {instantNotifications.map((job) => (
                  <div key={job.id} className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="h-4 w-4 text-orange-500" />
                          <h4 className="font-semibold text-gray-900 text-sm">{job.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            job.urgency === 'critical' ? 'bg-red-100 text-red-700' :
                            job.urgency === 'high' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {job.urgency.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{job.duration} • {job.pay}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-700 mt-2">{job.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Received at {job.timeReceived}</p>
                      </div>
                      <button
                        onClick={() => dismissNotification(job.id)}
                        className="text-gray-400 hover:text-gray-600 ml-2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAcceptInstantJob(job.id)}
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:bg-green-700 transition-colors"
                      >
                        Accept Job
                      </button>
                      <button
                        onClick={() => handleDeclineInstantJob(job.id)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay to close notifications when clicking outside */}
      {showNotifications && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </div>
  )
}
