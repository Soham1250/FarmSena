'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    // console.log('Form submitted:', formData)
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@agrosena.com',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Agriculture St, Farm City, FC 12345',
      description: 'Come say hello at our office'
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600">
            Ready to transform your farming operations? Contact us today to learn 
            how AgroSena can help you achieve your agricultural goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Let&apos;s Start a Conversation
              </h3>
              <p className="text-gray-600 mb-8">
                Whether you&apos;re a small family farm or a large agricultural enterprise, 
                we&apos;re here to help you succeed with smart farming solutions.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-primary-600 font-medium mb-1">
                        {info.details}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Additional Info */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Why Choose AgroSena?
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                  <span>Free consultation and setup</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                  <span>Proven ROI within 6 months</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                  <span>Scalable solutions for any farm size</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Farm Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200"
                  placeholder="Green Valley Farm"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 resize-vertical"
                  placeholder="Tell us about your farming needs and how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Send Message
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
