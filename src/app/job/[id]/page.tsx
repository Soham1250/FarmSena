'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, User, Star } from 'lucide-react'

export default function JobDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState<any>(null)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showOwnerModal, setShowOwnerModal] = useState(false)
  const [job, setJob] = useState<any>(null)

  // Sample job data (in real app, this would come from API)
  const jobsData = {
    '1': {
      id: 1,
      title: 'Crop Harvesting',
      location: 'Green Valley Farm',
      duration: '3 days',
      pay: '₹150/day',
      description: 'Help with seasonal corn harvest. Experience with farm equipment preferred. We need reliable workers who can work long hours during harvest season.',
      postedBy: 'John Smith',
      distance: '2.5 km away',
      ownerInfo: {
        name: 'John Smith',
        farmName: 'Green Valley Farm',
        rating: 4.8,
        totalJobs: 25,
        phone: '+91 98765 43210',
        email: 'john@greenvalley.com',
        bio: 'Experienced farmer with over 15 years in sustainable agriculture. Committed to fair wages and good working conditions.',
        previousJobs: [
          { title: 'Wheat Harvesting', completedDate: '2024-02-15', rating: 4.9, workerFeedback: 'Great working conditions and timely payment.' },
          { title: 'Irrigation Setup', completedDate: '2024-01-20', rating: 4.7, workerFeedback: 'Clear instructions and supportive environment.' },
          { title: 'Seed Planting', completedDate: '2023-12-10', rating: 4.8, workerFeedback: 'Fair wages and good facilities provided.' }
        ],
        memberSince: '2022-03-15'
      },
      requirements: [
        'Experience with farm equipment preferred',
        'Ability to work long hours',
        'Physical fitness required',
        'Previous harvest experience is a plus'
      ],
      estimatedTime: '6-8 hours per day',
      startDate: '2024-03-15'
    },
    '2': {
      id: 2,
      title: 'Irrigation Setup',
      location: 'Sunny Acres',
      duration: '1 week',
      pay: '₹120/day',
      description: 'Install and maintain irrigation systems for vegetable crops. Technical knowledge of irrigation systems required.',
      postedBy: 'Maria Garcia',
      distance: '5.1 km away',
      ownerInfo: {
        name: 'Maria Garcia',
        farmName: 'Sunny Acres',
        rating: 4.6,
        totalJobs: 18,
        phone: '+91 98765 43211',
        email: 'maria@sunnyacres.com',
        bio: 'Modern farmer specializing in vegetable crops and sustainable farming practices. Values teamwork and innovation.',
        previousJobs: [
          { title: 'Tomato Harvesting', completedDate: '2024-02-28', rating: 4.5, workerFeedback: 'Good organization and clear communication.' },
          { title: 'Greenhouse Setup', completedDate: '2024-01-15', rating: 4.7, workerFeedback: 'Professional approach and fair compensation.' }
        ],
        memberSince: '2023-01-10'
      },
      requirements: [
        'Technical knowledge of irrigation systems',
        'Experience with pipe fitting',
        'Problem-solving skills',
        'Attention to detail'
      ],
      estimatedTime: '7-9 hours per day',
      startDate: '2024-03-20'
    },
    '3': {
      id: 3,
      title: 'Fruit Picking',
      location: 'Orchard Hills',
      duration: '2 weeks',
      pay: '₹100/day',
      description: 'Apple and pear picking season. Must be able to work at heights and handle fruit carefully.',
      postedBy: 'David Wilson',
      distance: '8.3 km away',
      ownerInfo: {
        name: 'David Wilson',
        farmName: 'Orchard Hills',
        rating: 4.9,
        totalJobs: 32,
        phone: '+91 98765 43212',
        email: 'david@orchardhills.com',
        bio: 'Third-generation fruit farmer with expertise in organic farming methods. Known for excellent worker treatment and safety standards.',
        previousJobs: [
          { title: 'Apple Picking', completedDate: '2024-03-01', rating: 5.0, workerFeedback: 'Excellent working conditions and very supportive owner.' },
          { title: 'Pruning Work', completedDate: '2024-02-10', rating: 4.8, workerFeedback: 'Great training provided and good safety measures.' },
          { title: 'Orchard Maintenance', completedDate: '2024-01-25', rating: 4.9, workerFeedback: 'Professional environment and timely payments.' }
        ],
        memberSince: '2021-08-20'
      },
      requirements: [
        'Comfortable working at heights',
        'Careful handling of fruit',
        'Physical stamina required',
        'Previous picking experience preferred'
      ],
      estimatedTime: '8-10 hours per day',
      startDate: '2024-03-25'
    }
  }

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

    // Get job data
    const jobId = params.id as string
    const jobData = jobsData[jobId as keyof typeof jobsData]
    if (jobData) {
      setJob(jobData)
    } else {
      router.push('/dashboard/worker')
    }
  }, [router, params.id])

  const handleAcceptJob = () => {
    setShowTermsModal(true)
  }

  const handleConfirmAccept = () => {
    setShowTermsModal(false)
    // Here you would typically make an API call to accept the job
    alert('Job application submitted successfully!')
    router.push('/dashboard/worker')
  }

  const handleLearnMore = () => {
    setShowOwnerModal(true)
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
            href="/dashboard/worker"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Jobs</span>
          </Link>
          
          <h1 className="text-xl font-semibold text-gray-900">Job Details</h1>
          
          <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">you</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Single Combined Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Owner Information - Left Side */}
            <div className="lg:col-span-1">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{job.ownerInfo.name}</h3>
                <p className="text-gray-600 text-sm">{job.ownerInfo.farmName}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-gray-500 font-medium text-sm">{job.ownerInfo.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500">{job.ownerInfo.totalJobs} jobs posted</p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-600 mb-3">Owner Information</p>
                <button 
                  onClick={handleLearnMore}
                  className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-300"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Job Details - Right Side */}
            <div className="lg:col-span-3 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
                  <input
                    type="text"
                    value={job.distance}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Earnings</label>
                  <input
                    type="text"
                    value={job.pay}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-semibold"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time</label>
                  <input
                    type="text"
                    value={job.estimatedTime}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="text"
                    value={job.startDate}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={job.description}
                    readOnly
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 resize-none"
                  />
                </div>
              </div>

              {/* Accept Button */}
              <div className="pt-4">
                <button
                  onClick={handleAcceptJob}
                  className="w-full bg-primary-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Profile Modal */}
      {showOwnerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Land Owner Profile</h3>
              <button
                onClick={() => setShowOwnerModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            {/* Owner Header */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-gray-500" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">{job.ownerInfo.name}</h4>
              <p className="text-gray-600">{job.ownerInfo.farmName}</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="text-gray-500 font-medium text-lg">{job.ownerInfo.rating}</span>
                <span className="text-gray-500 text-sm">({job.ownerInfo.totalJobs} jobs)</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Member since {new Date(job.ownerInfo.memberSince).toLocaleDateString()}</p>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-700 mb-2">About</h5>
              <p className="text-gray-700 text-sm leading-relaxed">{job.ownerInfo.bio}</p>
            </div>

            {/* Previous Jobs */}
            <div className="mb-6">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Recent Jobs & Reviews</h5>
              <div className="space-y-3">
                {job.ownerInfo.previousJobs.map((prevJob: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h6 className="font-medium text-gray-900 text-sm">{prevJob.title}</h6>
                        <p className="text-xs text-gray-500">Completed: {new Date(prevJob.completedDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-gray-500 font-medium text-sm">{prevJob.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm italic">"{prevJob.workerFeedback}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="border-t pt-4">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Phone:</span>
                  <span className="ml-2 text-gray-900">{job.ownerInfo.phone}</span>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <span className="ml-2 text-gray-900">{job.ownerInfo.email}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 pt-4 border-t">
              <button
                onClick={() => setShowOwnerModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-700 mb-3">
                <strong>Disclaimer:</strong> Accepting this job makes you unavailable for rest of the day, unless Land Owner cancels the job.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowTermsModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAccept}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Accept Job
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
