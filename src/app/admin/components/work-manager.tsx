'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'


export function WorkManager() {
  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmitWhatIDo(e: React.FormEvent) {
    e.preventDefault()
    
    const { error } = await supabase
      .from('what_i_do')
      .insert([{ title, icon, description }])

    if (error) {
      console.error('Error inserting data:', error)
      return
    }

    // Reset form
    setTitle('')
    setIcon('')
    setDescription('')
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage What I Do</h2>
      
      <form onSubmit={handleSubmitWhatIDo} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Icon (FontAwesome class)</label>
          <input
            type="text"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Section
        </button>
      </form>
    </div>
  )
}