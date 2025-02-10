import Image from 'next/image'

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-600">Berikut Project yang perna saya kerjakan :</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
            <div className="relative">
              <Image 
                src="/api/placeholder/400/300" 
                alt="Project 1" 
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                Web App
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">E-Commerce Platform</h3>
              <p className="text-gray-600 mb-4">A full-featured online shopping platform with real-time inventory.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">MongoDB</span>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
            <div className="relative">
              <Image 
                src="/api/placeholder/400/300" 
                alt="Project 2" 
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                Mobile App
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Fitness Tracker</h3>
              <p className="text-gray-600 mb-4">A mobile app for tracking workouts and nutrition with analytics.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">React Native</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Firebase</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Redux</span>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
            <div className="relative">
              <Image 
                src="/api/placeholder/400/300" 
                alt="Project 3" 
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                UI/UX Design
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Travel Platform</h3>
              <p className="text-gray-600 mb-4">A modern travel booking platform with immersive UI/UX.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Figma</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Adobe XD</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Photoshop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}