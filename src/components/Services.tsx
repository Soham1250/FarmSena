import Image from 'next/image'
import { CheckCircle, ArrowRight } from 'lucide-react'

const Services = () => {
  const services = [
    {
      title: 'For Agricultural Workers',
      description: 'Find meaningful employment opportunities in agriculture with competitive pay and flexible schedules that match your skills.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: [
        'Browse available jobs',
        'Set your hourly rates',
        'Build your profile & ratings',
        'Secure payment guarantee'
      ]
    },
    {
      title: 'For Land Owners',
      description: 'Access a pool of skilled agricultural workers to help with seasonal work, daily operations, or specialized farming tasks.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: [
        'Post job requirements',
        'Review worker profiles',
        'Manage multiple projects',
        'Track work progress'
      ]
    },
    {
      title: 'Seamless Matching',
      description: 'Our intelligent matching system connects the right workers with the right jobs based on location, skills, and availability.',
      image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: [
        'Smart job recommendations',
        'Location-based matching',
        'Skill verification system',
        'Real-time notifications'
      ]
    }
  ]

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How AgroSena Works
          </h2>
          <p className="text-lg text-gray-600">
            Whether you're looking for work or need to hire workers, 
            AgroSena provides the tools and platform to connect efficiently.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" aria-hidden="true" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-2 -ml-2"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Image */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative z-10">
                  <Image
                    src={service.image}
                    alt={`${service.title} - Modern agricultural technology and farming practices`}
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-lg"
                  />
                </div>
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-2xl transform rotate-3 scale-105 -z-10 opacity-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
