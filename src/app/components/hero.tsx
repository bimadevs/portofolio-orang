import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6" data-aos="fade-right">
            <h1 className="text-6xl font-bold leading-tight">
              Hello, I'm <span className="gradient-text">Timothy</span>
            </h1>
            <p className="text-2xl text-gray-600">
              <span className="gradient-text">Technology Enthusiast</span>
            </p>
            <p className="text-lg text-gray-600">
              Dengan semangat inovasi, saya menjelajahi dunia teknologi untuk merancang solusi yang tidak hanya efektif, namun juga memberikan dampak positif bagi masyarakat.
            </p>

            <div className="flex space-x-4 pt-6">
              <a href="#" className="social-icon text-gray-600 hover:text-[#FF6B6B]">
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a href="#" className="social-icon text-gray-600 hover:text-[#FF6B6B]">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
              <a href="#" className="social-icon text-gray-600 hover:text-[#FF6B6B]">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
              <a href="#" className="social-icon text-gray-600 hover:text-[#FF6B6B]">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            </div>
          </div>

          <div className="md:w-1/2" data-aos="fade-left">
            <div className="relative">
              <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-8 border-white shadow-xl animate-float">
                <Image 
                  src="/img/me.jpg" 
                  alt="Profile" 
                  width={320} 
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 gradient-bg rounded-full flex items-center justify-center text-white text-4xl animate-bounce">
                <i className="fas fa-code"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}