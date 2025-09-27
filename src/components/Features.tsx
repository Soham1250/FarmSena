import { 
  Search, 
  Users, 
  MapPin, 
  Star, 
  Shield, 
  Clock 
} from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Search,
      title: 'Easy Job Search',
      description: 'Browse and filter agricultural jobs by location, skill level, pay rate, and work type to find the perfect match.',
    },
    {
      icon: Users,
      title: 'Skilled Worker Network',
      description: 'Access a verified network of experienced agricultural workers with ratings and skill certifications.',
    },
    {
      icon: MapPin,
      title: 'Location-Based Matching',
      description: 'Find jobs and workers in your area with our smart location-based matching system.',
    },
    {
      icon: Star,
      title: 'Rating System',
      description: 'Build trust through our comprehensive rating and review system for both workers and land owners.',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with escrow protection for both parties.',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description: 'Post jobs for seasonal work, daily tasks, or long-term employment with flexible scheduling options.',
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose AgroSena?
          </h2>
          <p className="text-lg text-gray-600">
            Our platform makes it easy for agricultural workers to find jobs and 
            land owners to hire reliable workforce with powerful matching features.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-xl mb-6 group-hover:bg-primary-200 transition-colors duration-300">
                  <IconComponent 
                    className="h-6 w-6 text-primary-600" 
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button
            className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            aria-label="Explore all features"
          >
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  )
}

export default Features
