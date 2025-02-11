'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Project {
    id: string
    title: string
    description: string
    category: string
    image_url: string
    technologies: string[]
}

export function ProjectManager() {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const [projects, setProjects] = useState<Project[]>([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [technology, setTechnology] = useState('')
    const [technologies, setTechnologies] = useState<string[]>([])
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchProjects()
    }, [])

    async function fetchProjects() {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: true })

            if (error) throw error
            setProjects(data || [])
        } catch (error) {
            console.error('Error fetching projects:', error)
            toast.error('Failed to fetch projects')
        }
    }

    function handleAddTechnology(e: React.FormEvent) {
        e.preventDefault()
        if (technology.trim() && !technologies.includes(technology.trim())) {
            setTechnologies([...technologies, technology.trim()])
            setTechnology('')
        }
    }

    function handleRemoveTechnology(techToRemove: string) {
        setTechnologies(technologies.filter(tech => tech !== techToRemove))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            if (!file) {
                throw new Error('Please select an image')
            }

            // Upload image
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `projects/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath)

            // Insert project record
            const { error: insertError } = await supabase
                .from('projects')
                .insert([{
                    title,
                    description,
                    category,
                    image_url: publicUrl,
                    technologies
                }])

            if (insertError) throw insertError

            toast.success('Project added successfully')
            resetForm()
            await fetchProjects()

        } catch (error) {
            console.error('Error:', error)
            toast.error('Failed to add project')
        } finally {
            setIsLoading(false)
        }
    }

    function resetForm() {
        setTitle('')
        setDescription('')
        setCategory('')
        setTechnologies([])
        setFile(null)
        setPreview('')
    }

    async function handleDelete(id: string, imageUrl: string) {
        try {
            const { error: deleteError } = await supabase
                .from('projects')
                .delete()
                .match({ id })

            if (deleteError) throw deleteError

            // Delete image from storage
            const filePath = imageUrl.split('/').pop()
            if (filePath) {
                await supabase.storage
                    .from('images')
                    .remove([`projects/${filePath}`])
            }

            toast.success('Project deleted successfully')
            await fetchProjects()
        } catch (error) {
            console.error('Error:', error)
            toast.error('Failed to delete project')
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return

        if (selectedFile.size > 2 * 1024 * 1024) {
            toast.error('File size should be less than 2MB')
            return
        }

        setFile(selectedFile)
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(selectedFile)
    }

    return (
        <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
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
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded"
                        rows={3}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select category</option>
                        <option value="Web App">Web App</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Technologies</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={technology}
                            onChange={(e) => setTechnology(e.target.value)}
                            className="flex-1 p-2 border rounded"
                            placeholder="Add technology"
                        />
                        <button
                            type="button"
                            onClick={handleAddTechnology}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
                            >
                                {tech}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTechnology(tech)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {preview && (
                        <div className="mt-2">
                            <Image
                                src={preview}
                                alt="Preview"
                                width={200}
                                height={150}
                                className="rounded"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                >
                    {isLoading ? 'Adding...' : 'Add Project'}
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="p-4 bg-white rounded-lg shadow">
                        <div className="flex gap-4">
                            <Image
                                src={project.image_url}
                                alt={project.title}
                                width={100}
                                height={75}
                                className="rounded"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold">{project.title}</h3>
                                <p className="text-sm text-gray-600">{project.category}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {project.technologies.map((tech, index) => (
                                        <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(project.id, project.image_url)}
                                className="text-red-500 hover:text-red-700"
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