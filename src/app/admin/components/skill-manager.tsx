'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Skill {
    id: string
    name: string
    image_url: string
    category: string
}

export function SkillManager() {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const [skills, setSkills] = useState<Skill[]>([])
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchSkills()
    }, [])

    // Check authentication on mount
    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/login')
                return
            }
        }
        checkAuth()
    }, [router, supabase])

    async function fetchSkills() {
        try {
            const { data, error } = await supabase
                .from('skills')
                .select('*')
                .order('created_at', { ascending: true })

            if (error) throw error

            setSkills(data || [])
        } catch (error) {
            console.error('Error fetching skills:', error)
            toast.error('Failed to fetch skills')
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Check authentication first
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                throw new Error('Not authenticated')
            }

            if (!file) {
                throw new Error('Please select an image')
            }

            // Upload image
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `skills/${fileName}`

            const { error: uploadError, data: uploadData } = await supabase.storage
                .from('images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) {
                console.error('Upload error details:', uploadError)
                throw new Error(`Upload error: ${uploadError.message}`)
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath)

            // Insert skill record
            const { error: insertError } = await supabase
                .from('skills')
                .insert([{
                    name,
                    category,
                    image_url: publicUrl
                }])

            if (insertError) {
                // Cleanup uploaded file if insert fails
                await supabase.storage
                    .from('images')
                    .remove([filePath])
                
                console.error('Insert error details:', insertError)
                throw new Error(`Insert error: ${insertError.message}`)
            }

            toast.success('Skill added successfully')
            setName('')
            setCategory('')
            setFile(null)
            setPreview('')
            await fetchSkills()

        } catch (error) {
            console.error('Full error details:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to add skill')
        } finally {
            setIsLoading(false)
        }
    }

    async function handleDelete(id: string, imageUrl: string) {
        try {
            // 1. Delete the skill record
            const { error: deleteError } = await supabase
                .from('skills')
                .delete()
                .match({ id })

            if (deleteError) throw deleteError

            // 2. Delete the image from storage
            // Extract file path from URL
            const filePath = imageUrl.split('/').pop()
            if (filePath) {
                await supabase.storage
                    .from('images')
                    .remove([`skills/${filePath}`])
            }

            toast.success('Skill deleted successfully')
            await fetchSkills()
        } catch (error) {
            console.error('Error deleting skill:', error)
            toast.error('Failed to delete skill')
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedFile = e.target.files?.[0]
        if (!selectedFile) return

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        if (!validTypes.includes(selectedFile.type)) {
            toast.error('Please select a valid image file (JPEG, PNG, GIF, or WebP)')
            return
        }

        // Validate file size (max 2MB)
        if (selectedFile.size > 2 * 1024 * 1024) {
            toast.error('File size should be less than 2MB')
            return
        }

        setFile(selectedFile)

        // Create preview
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
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                        maxLength={50}
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
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="Tools">Tools</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Icon</label>
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {preview && (
                        <div className="mt-2">
                            <Image
                                src={preview}
                                alt="Preview"
                                width={40}
                                height={40}
                                className="rounded"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Adding...' : 'Add New Skill'}
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => (
                    <div key={skill.id} className="p-4 bg-white rounded-lg shadow flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Image
                                src={skill.image_url}
                                alt={skill.name}
                                width={40}
                                height={40}
                                className="rounded"
                            />
                            <div>
                                <h3 className="font-medium">{skill.name}</h3>
                                <p className="text-sm text-gray-500">{skill.category}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDelete(skill.id, skill.image_url)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete skill"
                        >
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}