'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Clock, DollarSign, FileText, ChevronLeft, ChevronRight } from 'lucide-react'

export default function CreateJobPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [jobType, setJobType] = useState<'schedule' | 'instant'>('schedule')
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [formData, setFormData] = useState({
    title: '',
    expectedEarnings: '',
    estimatedTime: '',
    date: '',
    description: '',
    location: '',
    duration: '',
    requirements: '',
    urgency: 'medium',
    notificationRadius: 5,
    maxWorkers: 1,
    autoAccept: false
  })

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

    // Get job type from URL params
    const type = searchParams.get('type') as 'schedule' | 'instant'
    if (type) {
      setJobType(type)
    }
  }, [router, searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDateClick = () => {
    if (jobType === 'schedule') {
      setShowCalendar(true)
    }
  }

  const handleDateSelect = (selectedDate: string) => {
    setFormData({
      ...formData,
      date: selectedDate
    })
    setShowCalendar(false)
  }

  const handleSubmit = () => {
    // Validate form
    if (!formData.title || !formData.expectedEarnings || !formData.description) {
      alert('Please fill in all required fields')
      return
    }

    if (jobType === 'schedule' && !formData.date) {
      alert('Please select a date for scheduled job')
      return
    }

    // Create new job object
    const newJob = {
      id: Date.now(), // Simple ID generation using timestamp
      title: formData.title,
      location: formData.location || 'Location not specified',
      duration: formData.estimatedTime ? `${formData.estimatedTime} hours` : 'Duration not specified',
      pay: formData.expectedEarnings.includes('₹') ? formData.expectedEarnings : `₹${formData.expectedEarnings}/day`,
      applicants: 0,
      status: 'Active',
      description: formData.description,
      jobType: jobType,
      dateCreated: new Date().toISOString(),
      scheduledDate: jobType === 'schedule' ? formData.date : null,
      requirements: formData.requirements || '',
      postedBy: user.email
    }

    // Get existing jobs from localStorage
    const existingJobs = JSON.parse(localStorage.getItem('postedJobs') || '[]')
    
    // Add new job to the beginning of the array
    const updatedJobs = [newJob, ...existingJobs]
    
    // Save back to localStorage
    localStorage.setItem('postedJobs', JSON.stringify(updatedJobs))

    if (jobType === 'instant') {
      // For instant jobs, navigate to radar view
      localStorage.setItem('currentInstantJob', JSON.stringify(newJob))
      router.push('/instant-job-radar')
    } else {
      // For scheduled jobs, show success and return to dashboard
      alert('Scheduled job created successfully!')
      router.push('/dashboard/owner')
    }
  }

  // Generate calendar dates for the selected month
  const generateCalendarDates = () => {
    const currentMonth = calendarDate.getMonth()
    const currentYear = calendarDate.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const dates = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      dates.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      dates.push(day)
    }
    
    return dates
  }

  const formatDate = (day: number) => {
    const selectedDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day)
    return selectedDate.toISOString().split('T')[0]
  }

  const getMonthName = () => {
    return calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(calendarDate)
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    
    // Limit to 1 year in the future
    const today = new Date()
    const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    
    if (newDate <= oneYearFromNow && newDate >= today) {
      setCalendarDate(newDate)
    }
  }

  const isDateDisabled = (day: number | null) => {
    if (!day) return true
    
    const selectedDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), day)
    const today = new Date()
    const oneYearFromNow = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate())
    
    // Disable if date is in the past or more than 1 year in the future
    return selectedDate < today || selectedDate > oneYearFromNow
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
            href="/post-job"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
          
          <h1 className="text-xl font-semibold text-gray-900">
            Create {jobType === 'schedule' ? 'Scheduled' : 'Instant'} Job
          </h1>
          
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create A Job</h2>
            <p className="text-gray-600">
              {jobType === 'schedule' ? 'Schedule your job for a specific date' : 'Create an instant job alert'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Crop Harvesting, Irrigation Setup"
                className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., 2.5 km from main road"
                className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Expected Earnings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Earnings per Day</label>
              <input
                type="number"
                name="expectedEarnings"
                value={formData.expectedEarnings}
                onChange={handleInputChange}
                placeholder="e.g., ₹150/day"
                className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Estimated Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Time  (in hours)</label>
              <input
                type="number"
                name="estimatedTime"
                value={formData.estimatedTime}
                onChange={handleInputChange}
                placeholder="e.g., 6-8 hours per day"
                className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {jobType === 'schedule' ? 'Schedule Date' : 'Start Date'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onClick={handleDateClick}
                  readOnly={jobType === 'schedule'}
                  onChange={jobType === 'instant' ? handleInputChange : undefined}
                  placeholder={jobType === 'schedule' ? 'Click to select date' : 'e.g., Immediate'}
                  className={`text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    jobType === 'schedule' ? 'cursor-pointer' : ''
                  }`}
                />
                {jobType === 'schedule' && (
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe the job requirements, skills needed, working conditions..."
                className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              />
            </div>

            {/* Instant Job Specific Fields */}
            {jobType === 'instant' && (
              <>
                {/* Urgency Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="low">Low - Can wait a few hours</option>
                    <option value="medium">Medium - Needed today</option>
                    <option value="high">High - Needed within 2 hours</option>
                    <option value="critical">Critical - Needed immediately</option>
                  </select>
                </div>

                {/* Notification Radius */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Radius: {formData.notificationRadius}km
                  </label>
                  <input
                    type="range"
                    name="notificationRadius"
                    min="1"
                    max="20"
                    value={formData.notificationRadius}
                    onChange={handleInputChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1km</span>
                    <span>10km</span>
                    <span>20km</span>
                  </div>
                </div>

                {/* Maximum Workers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Workers Needed</label>
                  <input
                    type="number"
                    name="maxWorkers"
                    min="1"
                    max="10"
                    value={formData.maxWorkers}
                    onChange={handleInputChange}
                    placeholder="e.g., 3"
                    className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                {/* Auto Accept */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="autoAccept"
                    checked={formData.autoAccept}
                    onChange={(e) => setFormData({...formData, autoAccept: e.target.checked})}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Auto-accept first {formData.maxWorkers} worker{formData.maxWorkers > 1 ? 's' : ''} who respond
                  </label>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full bg-primary-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                {jobType === 'schedule' ? 'Schedule Job' : 'Post Instant Job'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Modal for Scheduled Jobs */}
      {showCalendar && jobType === 'schedule' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Select Date </h3>
              <button
                onClick={() => setShowCalendar(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={calendarDate <= new Date()}
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                
                <h4 className="font-medium text-gray-900">{getMonthName()}</h4>
                
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={calendarDate >= new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate())}
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              {/* Calendar Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {generateCalendarDates().map((day, index) => (
                  <button
                    key={index}
                    onClick={() => day && !isDateDisabled(day) && handleDateSelect(formatDate(day))}
                    disabled={isDateDisabled(day)}
                    className={`h-10 w-10 text-sm rounded-lg transition-colors ${
                      day
                        ? isDateDisabled(day)
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-900 hover:bg-primary-100 hover:text-primary-600'
                        : ''
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowCalendar(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
