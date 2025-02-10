'use client'

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold gradient-text">Timo</a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="nav-link text-gray-700">Home</a>
              <a href="#about" className="nav-link text-gray-700">About</a>
              <a href="#work" className="nav-link text-gray-700">Work</a>
              <a href="#achievements" className="nav-link text-gray-700">Achievements</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-50 px-4 py-3">
        <div className="flex justify-around items-center">
          <a href="#home" className="flex flex-col items-center text-gray-700">
            <i className="fas fa-home text-xl"></i>
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="#about" className="flex flex-col items-center text-gray-700">
            <i className="fas fa-user text-xl"></i>
            <span className="text-xs mt-1">About</span>
          </a>
          <a href="#work" className="flex flex-col items-center text-gray-700">
            <i className="fas fa-briefcase text-xl"></i>
            <span className="text-xs mt-1">Work</span>
          </a>
          <a href="#achievements" className="flex flex-col items-center text-gray-700">
            <i className="fas fa-trophy text-xl"></i>
            <span className="text-xs mt-1">Achievements</span>
          </a>
        </div>
      </div>
    </>
  )
}