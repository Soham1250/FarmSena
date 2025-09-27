'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Menu, User, LogOut, Plus, Users, MapPin, Clock, Edit, X, Eye } from 'lucide-react'

export default function OwnerDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [postedJobs, setPostedJobs] = useState<any[]>([])
  const [showApplicantsModal, setShowApplicantsModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingJob, setEditingJob] = useState<any>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [cancellingJob, setCancellingJob] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
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

    // Load posted jobs from localStorage
    loadPostedJobs()
  }, [router])

  const loadPostedJobs = () => {
    const existingJobs = localStorage.getItem('postedJobs')
    
    if (!existingJobs) {
      // Add default jobs if none exist
      const defaultJobs = [
        {
          id: 1,
          title: 'Crop Harvesting',
          location: 'Green Valley Farm',
          duration: '3 days',
          pay: '₹150/day',
          applicants: 5,
          status: 'Active',
          description: 'Help with seasonal corn harvest. Experience with farm equipment preferred.',
          jobType: 'schedule',
          dateCreated: new Date().toISOString(),
          scheduledDate: '2024-04-15',
          requirements: 'Experience with farm equipment preferred',
          postedBy: 'land1@gmail.com'
        },
        {
          id: 2,
          title: 'Irrigation Maintenance',
          location: 'My Farm - North Field',
          duration: '1 week',
          pay: '₹120/day',
          applicants: 2,
          status: 'Active',
          description: 'Install and maintain irrigation systems for vegetable crops.',
          jobType: 'instant',
          dateCreated: new Date().toISOString(),
          scheduledDate: null,
          requirements: 'Technical knowledge of irrigation systems',
          postedBy: 'land1@gmail.com'
        }
      ]
      
      localStorage.setItem('postedJobs', JSON.stringify(defaultJobs))
      setPostedJobs(defaultJobs)
    } else {
      const jobs = JSON.parse(existingJobs)
      setPostedJobs(jobs)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

  // Sample applicants data
  const jobApplicants = {
    1: [
      { id: 1, name: 'Raj Kumar', rating: 4.7, experience: '3 years', phone: '+91 98765 11111', status: 'pending' },
      { id: 2, name: 'Priya Singh', rating: 4.9, experience: '5 years', phone: '+91 98765 22222', status: 'pending' },
      { id: 3, name: 'Amit Sharma', rating: 4.5, experience: '2 years', phone: '+91 98765 33333', status: 'pending' }
    ],
    2: [
      { id: 4, name: 'Sunita Devi', rating: 4.8, experience: '4 years', phone: '+91 98765 44444', status: 'pending' },
      { id: 5, name: 'Ramesh Yadav', rating: 4.6, experience: '6 years', phone: '+91 98765 55555', status: 'pending' }
    ]
  }

  const handleViewApplicants = (job: any) => {
    setSelectedJob(job)
    setShowApplicantsModal(true)
  }

  const handleEditJob = (job: any) => {
    setEditingJob({ ...job })
    setShowEditModal(true)
  }

  const handleCancelJob = (job: any) => {
    setCancellingJob(job)
    setShowCancelModal(true)
  }

  const handleRejectApplicant = (applicantId: number) => {
    // In real app, this would make an API call
    alert(`Applicant rejected successfully!`)
  }

  const handleSaveEdit = () => {
    if (editingJob) {
      // Format the edited job data
      const formattedJob = {
        ...editingJob,
        duration: editingJob.duration.includes('hours') || editingJob.duration.includes('days') || editingJob.duration.includes('week')
          ? editingJob.duration
          : `${editingJob.duration} hours`
      }
      
      // Update job in localStorage
      const jobs = JSON.parse(localStorage.getItem('postedJobs') || '[]')
      const updatedJobs = jobs.map((job: any) => 
        job.id === editingJob.id ? formattedJob : job
      )
      localStorage.setItem('postedJobs', JSON.stringify(updatedJobs))
      
      // Update state
      setPostedJobs(updatedJobs)
      setShowEditModal(false)
      alert('Job updated successfully!')
    }
  }

  const handleConfirmCancel = () => {
    if (cancellingJob) {
      // Remove job from localStorage
      const jobs = JSON.parse(localStorage.getItem('postedJobs') || '[]')
      const updatedJobs = jobs.filter((job: any) => job.id !== cancellingJob.id)
      localStorage.setItem('postedJobs', JSON.stringify(updatedJobs))
      
      // Update state
      setPostedJobs(updatedJobs)
      setShowCancelModal(false)
      alert('Job cancelled successfully!')
    }
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

          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-900">Land Owner Dashboard</h1>

          {/* User Profile */}
          <div className="flex items-center gap-2">
            <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">You</span>
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
          <p className="text-gray-600">Manage your job postings and find the right workers</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Link
            href="/post-job"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex"
          >
            <Plus className="h-5 w-5" />
            Post New Job
          </Link>
        </div>

        {/* Posted Jobs Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Posted Jobs</h2>
          
          <div className="space-y-4">
            {postedJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
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
                    <div className="text-primary-600 font-semibold text-lg">{job.pay}</div>
                    <div className="text-xs text-green-600 mt-1 bg-green-100 px-2 py-1 rounded-full">{job.status}</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-primary-600" />
                    <span><span className="font-medium text-gray-900">{job.applicants}</span> applicants</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleViewApplicants(job)}
                      className="bg-primary-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-primary-700 transition-colors flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      View Applicants
                    </button>
                    <button 
                      onClick={() => handleEditJob(job)}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleCancelJob(job)}
                      className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {postedJobs.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-gray-600 mb-4">You haven't posted any jobs yet</div>
              <Link
                href="/post-job"
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center gap-2 mx-auto focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 inline-flex"
              >
                <Plus className="h-5 w-5" />
                Post Your First Job
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* View Applicants Modal */}
      {showApplicantsModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Job Applicants - {selectedJob.title}</h3>
              <button
                onClick={() => setShowApplicantsModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {(jobApplicants[selectedJob.id as keyof typeof jobApplicants] || []).map((applicant: any) => (
                <div key={applicant.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-900">{applicant.name}</h4>
                      <p className="text-sm text-gray-600">Experience: {applicant.experience}</p>
                      <p className="text-sm text-gray-600">Phone: {applicant.phone}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{applicant.rating}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                        Accept
                      </button>
                      <button 
                        onClick={() => handleRejectApplicant(applicant.id)}
                        className="bg-red-100 text-red-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {(!jobApplicants[selectedJob.id as keyof typeof jobApplicants] || jobApplicants[selectedJob.id as keyof typeof jobApplicants].length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  No applicants yet for this job.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Edit Job</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({...editingJob, title: e.target.value})}
                  className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={editingJob.location}
                  onChange={(e) => setEditingJob({...editingJob, location: e.target.value})}
                  className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                <input
                  type="number"
                  value={editingJob.duration.replace(/[^\d]/g, '')}
                  onChange={(e) => setEditingJob({...editingJob, duration: e.target.value})}
                  placeholder="e.g., 8"
                  className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pay Rate</label>
                <input
                  type="text"
                  value={editingJob.pay}
                  onChange={(e) => setEditingJob({...editingJob, pay: e.target.value})}
                  className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Job Modal */}
      {showCancelModal && cancellingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Cancel Job</h3>
              <button
                onClick={() => setShowCancelModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to cancel the job "{cancellingJob.title}"?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">
                  <strong>Warning:</strong> This action cannot be undone. All applicants will be notified of the cancellation.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Keep Job
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Cancel Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
