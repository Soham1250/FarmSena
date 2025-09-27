'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Users, Clock, MapPin, Zap, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Worker {
  id: number
  name: string
  distance: number
  angle: number
  status: 'notified' | 'accepted' | 'declined' | 'no_response'
  rating: number
  responseTime?: string
}

export default function InstantJobRadarPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [job, setJob] = useState<any>(null)
  const [workers, setWorkers] = useState<Worker[]>([])
  const [notificationsSent, setNotificationsSent] = useState(0)
  const [broadcastActive, setBroadcastActive] = useState(false)
  const [acceptedWorkers, setAcceptedWorkers] = useState<Worker[]>([])
  const [broadcastComplete, setBroadcastComplete] = useState(false)

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

    // Get the current instant job
    const currentJob = localStorage.getItem('currentInstantJob')
    if (!currentJob) {
      router.push('/dashboard/owner')
      return
    }
    
    setJob(JSON.parse(currentJob))
    
    // Generate mock workers within the notification radius
    generateMockWorkers(JSON.parse(currentJob))
  }, [router])

  const generateMockWorkers = (jobData: any) => {
    const radius = jobData.notificationRadius || 5
    const workerCount = Math.floor(Math.random() * 15) + 5 // 5-20 workers
    
    const mockWorkers: Worker[] = []
    const workerNames = [
      'Raj Kumar', 'Priya Singh', 'Amit Sharma', 'Sunita Devi', 'Ramesh Yadav',
      'Kavita Patel', 'Suresh Gupta', 'Meera Joshi', 'Vikram Singh', 'Anita Kumari',
      'Deepak Verma', 'Pooja Sharma', 'Ravi Kumar', 'Sita Devi', 'Manoj Tiwari'
    ]
    
    for (let i = 0; i < workerCount; i++) {
      const distance = Math.random() * radius
      const angle = Math.random() * 360
      
      mockWorkers.push({
        id: i + 1,
        name: workerNames[i % workerNames.length] + ` ${i + 1}`,
        distance: Math.round(distance * 10) / 10,
        angle,
        status: 'notified',
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10 // 3.0-5.0 rating
      })
    }
    
    setWorkers(mockWorkers)
  }

  const startBroadcast = () => {
    setBroadcastActive(true)
    setNotificationsSent(0)
    
    // Add the instant job to available jobs for workers to see
    const instantJobForWorkers = {
      id: job.id,
      title: job.title,
      location: job.location,
      duration: job.duration,
      pay: job.pay,
      description: job.description,
      postedBy: 'Land Owner',
      distance: `Within ${job.notificationRadius}km`,
      urgency: job.urgency || 'high',
      isInstant: true,
      broadcastTime: new Date().toISOString(),
      applicants: 0
    }
    
    // Store in localStorage for workers to access
    const existingInstantJobs = JSON.parse(localStorage.getItem('instantJobs') || '[]')
    const updatedInstantJobs = [instantJobForWorkers, ...existingInstantJobs]
    localStorage.setItem('instantJobs', JSON.stringify(updatedInstantJobs))
    
    // Simulate sending notifications with delay
    const totalWorkers = workers.length
    let sent = 0
    
    const sendInterval = setInterval(() => {
      sent += Math.floor(Math.random() * 3) + 1
      if (sent >= totalWorkers) {
        sent = totalWorkers
        clearInterval(sendInterval)
        
        // Start simulating responses after all notifications are sent
        setTimeout(() => {
          simulateWorkerResponses()
        }, 2000)
      }
      setNotificationsSent(sent)
    }, 500)
  }

  const simulateWorkerResponses = () => {
    const responseInterval = setInterval(() => {
      setWorkers(prevWorkers => {
        const updatedWorkers = [...prevWorkers]
        const notifiedWorkers = updatedWorkers.filter(w => w.status === 'notified')
        
        if (notifiedWorkers.length === 0) {
          clearInterval(responseInterval)
          setBroadcastComplete(true)
          return updatedWorkers
        }
        
        // Randomly select 1-3 workers to respond
        const respondingCount = Math.min(Math.floor(Math.random() * 3) + 1, notifiedWorkers.length)
        
        for (let i = 0; i < respondingCount; i++) {
          const randomWorker = notifiedWorkers[Math.floor(Math.random() * notifiedWorkers.length)]
          const workerIndex = updatedWorkers.findIndex(w => w.id === randomWorker.id)
          
          if (workerIndex !== -1 && updatedWorkers[workerIndex].status === 'notified') {
            // 70% chance of accepting, 30% declining
            const willAccept = Math.random() > 0.3
            updatedWorkers[workerIndex].status = willAccept ? 'accepted' : 'declined'
            updatedWorkers[workerIndex].responseTime = new Date().toLocaleTimeString()
            
            if (willAccept) {
              setAcceptedWorkers(prev => [...prev, updatedWorkers[workerIndex]])
            }
          }
        }
        
        return updatedWorkers
      })
    }, 3000) // Response every 3 seconds
  }

  const getWorkerPosition = (worker: Worker) => {
    const maxRadius = job?.notificationRadius || 5
    const radarRadius = 120 // pixels
    const scaledDistance = (worker.distance / maxRadius) * radarRadius
    
    const x = Math.cos((worker.angle - 90) * Math.PI / 180) * scaledDistance
    const y = Math.sin((worker.angle - 90) * Math.PI / 180) * scaledDistance
    
    return { x: x + 150, y: y + 150 } // Center at 150,150
  }

  const getWorkerColor = (status: string) => {
    switch (status) {
      case 'accepted': return '#10B981' // Green
      case 'declined': return '#EF4444' // Red
      case 'notified': return '#F59E0B' // Yellow
      default: return '#6B7280' // Gray
    }
  }

  const finishBroadcast = () => {
    // Remove the current instant job from localStorage
    localStorage.removeItem('currentInstantJob')
    router.push('/dashboard/owner')
  }

  if (!user || !job) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link
            href="/dashboard/owner"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <h1 className="text-xl font-semibold text-gray-900">Instant Job Broadcast</h1>
          
          <div className="w-32"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Radar View */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Worker Radar</h2>
              <p className="text-gray-600">Broadcasting within {job.notificationRadius}km radius</p>
            </div>
            
            {/* Radar Display */}
            <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
              <svg width="300" height="300" className="absolute inset-0">
                {/* Radar Circles */}
                {[1, 2, 3, 4].map(ring => (
                  <circle
                    key={ring}
                    cx="150"
                    cy="150"
                    r={ring * 30}
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                ))}
                
                {/* Radar Lines */}
                <line x1="150" y1="30" x2="150" y2="270" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="30" y1="150" x2="270" y2="150" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="2,2" />
                
                {/* Center Point (Land Owner) */}
                <circle cx="150" cy="150" r="8" fill="#059669" />
                <text x="150" y="175" textAnchor="middle" className="text-xs fill-gray-600">You</text>
                
                {/* Workers */}
                {workers.map(worker => {
                  const pos = getWorkerPosition(worker)
                  return (
                    <g key={worker.id}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="4"
                        fill={getWorkerColor(worker.status)}
                        className="transition-all duration-300"
                      />
                      {worker.status === 'accepted' && (
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r="8"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="2"
                          className="animate-pulse"
                        />
                      )}
                    </g>
                  )
                })}
                
                {/* Pulsing Animation for Broadcasting */}
                {broadcastActive && !broadcastComplete && (
                  <circle
                    cx="150"
                    cy="150"
                    r="30"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="2"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}
              </svg>
              
              {/* Distance Labels */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                {Math.round(job.notificationRadius / 4)}km
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                {job.notificationRadius}km
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex justify-center gap-4 mt-4 text-xs">
              <div className="text-gray-500 flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Notified</span>
              </div>
              <div className="text-gray-500 flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Accepted</span>
              </div>
              <div className="text-gray-500 flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Declined</span>
              </div>
            </div>
          </div>

          {/* Job Details & Status */}
          <div className="space-y-6">
            {/* Job Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary-600" />
                  <span className="text-gray-500 font-medium">{job.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary-600" />
                  <span className="text-gray-500 font-medium">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary-600" />
                  <span className="text-gray-500 font-medium">{job.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary-600" />
                  <span className="text-gray-500 font-medium">{job.pay}</span>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{job.description}</p>
                </div>
              </div>
            </div>

            {/* Broadcast Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Broadcast Status</h3>
              
              {!broadcastActive ? (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Ready to broadcast job to {workers.length} nearby workers</p>
                  <button
                    onClick={startBroadcast}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Zap className="h-5 w-5" />
                    Start Broadcast
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-gray-500 flex items-center justify-between">
                    <span>Notifications Sent:</span>
                    <span className="font-semibold">{notificationsSent}/{workers.length}</span>
                  </div>
                  
                  <div className="text-gray-500 flex items-center justify-between">
                    <span>Workers Responded:</span>
                    <span className="font-semibold">
                      {workers.filter(w => w.status !== 'notified').length}/{workers.length}
                    </span>
                  </div>
                  
                  <div className="text-gray-500 flex items-center justify-between">
                    <span>Accepted:</span>
                    <span className="font-semibold text-green-600">
                      {acceptedWorkers.length}
                    </span>
                  </div>
                  
                  {broadcastComplete && (
                    <div className="mt-6 pt-4 border-t">
                      <button
                        onClick={finishBroadcast}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                      >
                        Complete Broadcast
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Accepted Workers */}
            {acceptedWorkers.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Accepted Workers</h3>
                <div className="space-y-3">
                  {acceptedWorkers.map(worker => (
                    <div key={worker.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{worker.name}</div>
                        <div className="text-sm text-gray-600">{worker.distance}km away • ⭐ {worker.rating}</div>
                      </div>
                      <div className="text-xs text-green-600">
                        Accepted at {worker.responseTime}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
