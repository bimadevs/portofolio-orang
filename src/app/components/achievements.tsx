import Image from 'next/image'

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Achievements</h2>
          <p className="text-gray-600">Recognition and milestones from my journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Achievement 1 */}
          <div className="achievement-card bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2">
            <div className="relative">
              <Image 
                src="/api/placeholder/400/300" 
                alt="Achievement 1" 
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                <i className="fas fa-trophy text-[#FF6B6B] mr-2"></i>Competition
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">First Place Winner</h3>
              <p className="text-gray-600 mb-4">Web Development Competition 2023</p>
              <div className="text-sm text-gray-500">
                Led team to victory in national web development competition, showcasing innovative solutions and technical excellence.
              </div>
            </div>
          </div>

          {/* Achievement 2 */}
          <div className="achievement-card bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2">
            <div className="relative">
              <Image 
                src="/api/placeholder/400/300" 
                alt="Achievement 2" 
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                <i className="fas fa-medal text-[#4ECDC4] mr-2"></i>Award
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Best UI/UX Design</h3>
              <p className="text-gray-600 mb-4">Design Excellence Award 2023</p>
              <div className="text-sm text-gray-500">
                Recognized for exceptional user interface design and seamless user experience in creating intuitive and visually appealing digital solutions.
              </div>
            </div>
          </div>

          {/* Achievement 3 */}
          <div className="achievement-card bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2">
            <div className="relative">
              <Image 
                src="/api/placeholder/400/300" 
                alt="Achievement 3" 
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                <i className="fas fa-certificate text-[#FF6B6B] mr-2"></i>Certification
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Full Stack Certification</h3>
              <p className="text-gray-600 mb-4">Advanced Web Development</p>
              <div className="text-sm text-gray-500">
                Completed comprehensive certification in full-stack development, mastering both frontend and backend technologies for building scalable web applications.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}