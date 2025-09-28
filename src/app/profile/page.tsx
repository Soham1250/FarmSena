'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Camera, MapPin, User, Save, Loader } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [locationLoading, setLocationLoading] = useState(false)
  const [profilePicture, setProfilePicture] = useState<string>('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    height: '',
    gender: '',
    location: '',
    bio: ''
  })

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/login')
      return
    }
    
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Load existing profile data (in real app, this would come from API)
    const existingProfile = localStorage.getItem('userProfile')
    if (existingProfile) {
      const profile = JSON.parse(existingProfile)
      setFormData(profile)
      setProfilePicture(profile.profilePicture || '')
    } else {
      // Set default values based on user type and email
      setFormData({
        fullName: parsedUser.type === 'worker' ? 'Agricultural Worker' : 'Land Owner',
        email: parsedUser.email,
        phone: '+91 98765 43210', // Default phone
        height: '',
        gender: '',
        location: '',
        bio: ''
      })
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setProfilePicture(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const getCurrentLocation = () => {
    setLocationLoading(true)
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.')
      setLocationLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // In a real app, you would use a geocoding service
          // For demo purposes, we'll use a mock location
          const mockLocation = `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`
          setFormData({
            ...formData,
            location: mockLocation
          })
        } catch (error) {
          // console.error('Error getting location:', error)
          alert('Error getting location details')
        } finally {
          setLocationLoading(false)
        }
      },
      (error) => {
        // console.error('Error getting location:', error)
        alert('Error accessing location. Please enable location services.')
        setLocationLoading(false)
      }
    )
  }

  const handleSave = () => {
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const profileData = {
        ...formData,
        profilePicture
      }
      
      localStorage.setItem('userProfile', JSON.stringify(profileData))
      setLoading(false)
      alert('Profile updated successfully!')
    }, 1000)
  }

  const getBackUrl = () => {
    return user?.type === 'worker' ? '/dashboard/worker' : '/dashboard/owner'
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
            href={getBackUrl()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </Link>
          
          <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary-600" />
            </div>
            <span className="text-sm text-gray-700 font-medium">you</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          {/* Profile Picture Section */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div 
                className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:bg-gray-300 transition-colors"
                onClick={handleProfilePictureClick}
              >
                {profilePicture ? (
                  <Image 
                    src={profilePicture} 
                    alt="Profile" 
                    width={128}
                    height={128}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-gray-500" />
                )}
              </div>
              <button
                onClick={handleProfilePictureClick}
                className="absolute bottom-2 right-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">Click to change profile picture</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Read-only fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-gray-400">(Read-only)</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-gray-400">(Read-only)</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-gray-400">(Read-only)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                <input
                  type="text"
                  value={user.type === 'worker' ? 'Agricultural Worker' : 'Land Owner'}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Editable fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Enter your height"
                  className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                  className="text-gray-500 flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className="text-gray-500 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300 flex items-center gap-2"
                >
                  {locationLoading ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  {locationLoading ? 'Getting...' : 'Use Current'}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Location will be verified using your device location</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about yourself..."
                className="text-gray-500 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <button
              onClick={handleSave}
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
