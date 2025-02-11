import Image from 'next/image'
import { supabase } from '../lib/supabase'

interface WhatIDo {
  id: string
  icon: string
  title: string
  description: string
}

interface Skill {
  id: string
  name: string
  image_url: string
  category: string
}

async function getWhatIDo() {
  const { data, error } = await supabase
    .from('what_i_do')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as WhatIDo[]
}

async function getSkills() {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Skill[]
}

export default async function Work() {
  const whatIDo = await getWhatIDo()
  const skills = await getSkills()

  return (
    <section id="work" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What I Do</h2>
          <p className="text-gray-600">Specialized in creating modern and user-friendly digital solutions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whatIDo.map((item) => (
            <div key={item.id} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity blur-xl group-hover:blur-2xl"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg h-full transform transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Skills</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div key={skill.id} className="p-6 bg-white border border-gray-200 rounded-lg hover:border-[#4ECDC4] transition-colors group cursor-pointer shadow-sm hover:shadow-md">
                <div className="flex items-center gap-4">
                  <Image 
                    src={skill.image_url}
                    alt={skill.name}
                    width={40}
                    height={40}
                  />
                  <span className="text-lg font-medium text-gray-800">{skill.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}