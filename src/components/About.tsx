import Image from 'next/image'
import { Users, Award, Globe, TrendingUp } from 'lucide-react'

const About = () => {
  const stats = [
    {
      icon: Users,
      number: '5,000+',
      label: 'Active Workers',
      description: 'Skilled agricultural professionals'
    },
    {
      icon: Globe,
      number: '2,000+',
      label: 'Land Owners',
      description: 'Farms and agricultural businesses'
    },
    {
      icon: Award,
      number: '15,000+',
      label: 'Jobs Completed',
      description: 'Successful work connections'
    },
    {
      icon: TrendingUp,
      number: '98%',
      label: 'Satisfaction Rate',
      description: 'Happy users on both sides'
    }
  ]

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Bridging the Gap in Agricultural Employment
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At AgroSena, we understand the challenges both agricultural workers and land owners face. 
                Workers struggle to find consistent, well-paying jobs, while land owners need reliable, 
                skilled workforce for their operations. We bridge this gap with our innovative platform.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded by agricultural professionals who experienced these challenges firsthand, 
                AgroSena creates meaningful connections that benefit both workers and land owners, 
                strengthening the agricultural community as a whole.
              </p>
            </div>

            {/* Mission Points */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Our Mission</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Connect skilled agricultural workers with meaningful employment opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Help land owners find reliable, qualified workers for their operations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ensure fair wages and secure payments for agricultural work</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Build a trusted community of agricultural professionals</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Team of agricultural experts and farmers working together in a modern farm setting"
              width={600}
              height={500}
              className="rounded-2xl shadow-lg"
            />
            {/* Overlay with company values */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl flex items-end p-8">
              <div className="text-white">
                <h4 className="text-xl font-semibold mb-2">Our Values</h4>
                <p className="text-sm opacity-90">Innovation • Sustainability • Community • Excellence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-primary-600" aria-hidden="true" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
