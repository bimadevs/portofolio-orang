import Image from 'next/image'
import { supabase } from '../lib/supabase'
import { unstable_noStore as noStore } from 'next/cache'

interface Project {
    id: string
    title: string
    description: string
    category: string
    image_url: string
    technologies: string[]
}

async function getProjects() {
  // Disable caching untuk fungsi ini
  noStore()
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: true })

    if (error) throw error
    return data as Project[]
}

export default async function Projects() {
    const projects = await getProjects()

    return (
        <section id="projects" className="py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Projects</h2>
                    <p className="text-gray-600">Berikut Project yang perna saya kerjakan :</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
                            <div className="relative">
                                <Image 
                                    src={project.image_url}
                                    alt={project.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                                    {project.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}