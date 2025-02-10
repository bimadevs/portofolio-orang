export default function About() {
    return (
      <section id="about" className="py-20 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="blob-bg opacity-30 top-0 left-0 transform -translate-x-1/2"></div>
        <div className="blob-bg opacity-30 bottom-0 right-0 transform translate-x-1/2"></div>
  
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">About Me</h2>
            <p className="text-gray-600">
              Haii, Perkenalkan nama saya Timothy William biasa dipanggil Timo. saya memiliki Antusias yang sangat tinggi untuk belajar
              hal di dunia teknologi (walau kadang ga konsisten), namun saya sangat antusias juga untuk mengikuti lomba Terkait teknologi. Selain 
              teknologi, saya juga suka membahas bisnis tentang apapun. salam kenal teman-teman.
            </p>
          </div>
  
          {/* Timeline Education Section */}
          <div className="max-w-4xl mx-auto">
            {/* Desktop Timeline */}
            <div className="hidden md:block relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#FF6B6B] to-[#4ECDC4]"></div>

              <div className="space-y-12">
                {/* SMK */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800">SMK MULTISTUDI HIGHSCHOOL BATAM</h3>
                      <p className="text-gray-600">PPLG</p>
                      <p className="text-sm text-gray-500">2020 - 2023</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-[#4ECDC4] absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <i className="fas fa-graduation-cap text-[#4ECDC4]"></i>
                  </div>
                  <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0"></div>
                </div>

                {/* SMP */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right"></div>
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-[#FF6B6B] absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <i className="fas fa-school text-[#FF6B6B]"></i>
                  </div>
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800">SMPS KRISTEN BASIC 01</h3>
                      <p className="text-sm text-gray-500">2017 - 2020</p>
                    </div>
                  </div>
                </div>

                {/* SD */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-8 md:text-right">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-bold text-gray-800">SD KRISTEN BASIC 01</h3>
                      <p className="text-sm text-gray-500">2011 - 2017</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-[#4ECDC4] absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <i className="fas fa-child text-[#4ECDC4]"></i>
                  </div>
                  <div className="md:w-1/2 md:pl-8"></div>
                </div>
              </div>
            </div>
  
            {/* Mobile Timeline */}
            <div className="md:hidden space-y-6">
              <div className="flex flex-col items-start">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white border-4 border-[#4ECDC4] flex items-center justify-center">
                      <i className="fas fa-graduation-cap text-[#4ECDC4]"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">SMK MULTISTUDI HIGHSCHOOL BATAM</h3>
                      <p className="text-gray-600">Pengembangan Perangkat Lunak dan Gim</p>
                      <p className="text-sm text-gray-500">2023 - 2026</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white border-4 border-[#FF6B6B] flex items-center justify-center">
                      <i className="fas fa-school text-[#FF6B6B]"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">SMPS KRISTEN BASIC 01 BATAM</h3>
                      <p className="text-sm text-gray-500">2020 - 2023</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white border-4 border-[#4ECDC4] flex items-center justify-center">
                      <i className="fas fa-child text-[#4ECDC4]"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">SDS KRISTEN BASIC 01 BATAM</h3>
                      <p className="text-sm text-gray-500">2014 - 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }