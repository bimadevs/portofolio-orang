import Image from 'next/image'
import { supabase } from '../lib/supabase'

interface Achievement {
    id: string
    title: string
    subtitle: string
    description: string
    category: string
    image_url: string
}

async function getAchievements() {
    const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('created_at', { ascending: true })

    if (error) throw error
    return data as Achievement[]
}

export default async function Achievements() {
    const achievements = await getAchievements()

    return (
        <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Achievements</h2>
                    <p className="text-gray-600">Recognition and milestones from my journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((achievement) => (
                        <div key={achievement.id} className="achievement-card bg-white rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:-translate-y-2">
                            <div className="relative">
                                <Image 
                                    src={achievement.image_url}
                                    alt={achievement.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                                    <i className={`fas fa-${achievement.category === 'Competition' ? 'trophy' : achievement.category === 'Award' ? 'medal' : 'certificate'} text-[${achievement.category === 'Award' ? '#4ECDC4' : '#FF6B6B'}] mr-2`}></i>
                                    {achievement.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                                <p className="text-gray-600 mb-4">{achievement.subtitle}</p>
                                <div className="text-sm text-gray-500">
                                    {achievement.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}