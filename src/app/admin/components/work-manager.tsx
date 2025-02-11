'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { toast } from 'sonner'
import { revalidatePath } from 'next/cache'


interface Work {
  id: string
  title: string
  icon: string
  description: string
}

export function WorkManager() {
  const supabase = createClientComponentClient()
  const [works, setWorks] = useState<Work[]>([])
  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchWorks()
  }, [])

  async function fetchWorks() {
    try {
      const { data, error } = await supabase
        .from('what_i_do')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) throw error
      setWorks(data || [])
    } catch (error) {
      console.error('Error fetching works:', error)
      toast.error('Failed to fetch works')
    }
  }

  async function handleSubmitWhatIDo(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { error } = await supabase
        .from('what_i_do')
        .insert([{ title, icon, description }])

      if (error) throw error
      // Revalidate setelah berhasil update
      await fetch('/api/revalidate?path=/')

      toast.success('Work added successfully')
      // Reset form
      setTitle('')
      setIcon('')
      setDescription('')
      await fetchWorks()
    } catch (error) {
      console.error('Error inserting data:', error)
      toast.error('Failed to add work')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase
        .from('what_i_do')
        .delete()
        .match({ id })

      if (error) throw error
      // Revalidate setelah berhasil delete
      await fetch('/api/revalidate?path=/')

      toast.success('Work deleted successfully')
      await fetchWorks()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete work')
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmitWhatIDo} className="space-y-4 p-6 bg-white rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Icon (FontAwesome class)</label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Adding...' : 'Add New Section'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {works.map((work) => (
          <div key={work.id} className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <i className={`${work.icon} text-xl text-blue-500`}></i>
                  <h3 className="font-bold">{work.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-2">{work.description}</p>
              </div>
              <button
                onClick={() => handleDelete(work.id)}
                className="text-red-500 hover:text-red-700"
                title="Delete work"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}