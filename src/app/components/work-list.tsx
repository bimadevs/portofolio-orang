'use client'

interface Work {
  id: string
  title: string
  icon: string
  description: string
}

interface WorkListProps {
  works: Work[]
}

export function WorkList({ works }: WorkListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {works.map((work) => (
        <div
          key={work.id}
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          data-aos="fade-up"
        >
          <div className="text-4xl text-[#FF6B6B] mb-4">
            <i className={work.icon}></i>
          </div>
          <h3 className="text-xl font-bold mb-3">{work.title}</h3>
          <p className="text-gray-600">{work.description}</p>
        </div>
      ))}
    </div>
  )
} 