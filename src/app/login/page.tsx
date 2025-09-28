'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft, Leaf } from 'lucide-react'

type AuthMode = 'login' | 'register' | 'forgot'

export default function LoginPage() {
    const router = useRouter()
    const [authMode, setAuthMode] = useState<AuthMode>('login')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        userType: 'worker' as 'worker' | 'owner'
    })

    // Hardcoded user credentials
    const users = {
        'work1@gmail.com': { password: 'pass123', type: 'worker' },
        'land1@gmail.com': { password: 'pass123', type: 'owner' }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        setError('') // Clear error when user types
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (authMode === 'login') {
            // Check hardcoded credentials
            const user = users[formData.email as keyof typeof users]
            if (user && user.password === formData.password) {
                // Store user info in localStorage
                localStorage.setItem('user', JSON.stringify({
                    email: formData.email,
                    type: user.type
                }))

                // Redirect based on user type
                if (user.type === 'worker') {
                    router.push('/dashboard/worker')
                } else {
                    router.push('/dashboard/owner')
                }
            } else {
                setError('Invalid email or password')
            }
        } else if (authMode === 'register') {
            // For demo purposes, just redirect to login
            setAuthMode('login')
            setError('')
        } else if (authMode === 'forgot') {
            // For demo purposes, just show success message
            setError('Password reset link sent to your email!')
        }
    }

    const resetForm = () => {
        setFormData({
            email: '',
            password: '',
            confirmPassword: '',
            fullName: '',
            userType: 'worker'
        })
        setShowPassword(false)
        setShowConfirmPassword(false)
    }

    const switchMode = (mode: AuthMode) => {
        setAuthMode(mode)
        resetForm()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6">
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Home</span>
                    </Link>

                    <div className="flex items-center justify-center mb-6">
                        <Leaf className="h-12 w-12 text-primary-600" />
                        <span className="ml-3 text-3xl font-bold text-gray-900">AgroSena</span>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900">
                        {authMode === 'login' && 'Welcome Back'}
                        {authMode === 'register' && 'Join AgroSena'}
                        {authMode === 'forgot' && 'Reset Password'}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        {authMode === 'login' && 'Sign in to your account'}
                        {authMode === 'register' && 'Create your account to get started'}
                        {authMode === 'forgot' && 'Enter your email to reset your password'}
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Error Display */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    {/* Login Form */}
                    {authMode === 'login' && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="text-gray-700 w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="text-gray-700 w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => switchMode('forgot')}
                                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Sign In
                            </button>

                            <div className="text-center">
                                <span className="text-gray-600">Don&apos;t have an account? </span>
                                <button
                                    type="button"
                                    onClick={() => switchMode('register')}
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Register Form */}
                    {authMode === 'register' && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                                    I am a
                                </label>
                                <select
                                    id="userType"
                                    name="userType"
                                    value={formData.userType}
                                    onChange={handleInputChange}
                                    className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                >
                                    <option value="worker">Agricultural Worker</option>
                                    <option value="owner">Land Owner</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        required
                                        className="text-gray-700 w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="text-gray-700 w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="text-gray-700 w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        placeholder="Create a password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="text-gray-700 w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        placeholder="Confirm your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                    I agree to the <Link href="/terms" className="text-primary-600 hover:text-primary-700">Terms of Service</Link> and <Link href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</Link>
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Create Account
                            </button>

                            <div className="text-center">
                                <span className="text-gray-600">Already have an account? </span>
                                <button
                                    type="button"
                                    onClick={() => switchMode('login')}
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Forgot Password Form */}
                    {authMode === 'forgot' && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="text-gray-700 w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            >
                                Send Reset Link
                            </button>

                            <div className="text-center">
                                <span className="text-gray-600">Remember your password? </span>
                                <button
                                    type="button"
                                    onClick={() => switchMode('login')}
                                    className="text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Additional Info */}
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        By continuing, you agree to our terms and conditions
                    </p>
                </div>
            </div>
        </div>
    )
}
