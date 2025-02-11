'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface Achievement {
    id: string
    title: string
    subtitle: string
    description: string
    category: string
    image_url: string
}

export function AchievementManager() {
    const router = useRouter()
    const supabase = createClientComponentClient()

    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchAchievements()
    }, [])

    async function fetchAchievements() {
        try {
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .order('created_at', { ascending: true })

            if (error) throw error
            setAchievements(data || [])
        } catch (error) {
            console.error('Error fetching achievements:', error)
            toast.error('Failed to fetch achievements')
        }
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
            const filePath = `achievements/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath)

            // Insert achievement record
            const { error: insertError } = await supabase
                .from('achievements')
                .insert([{
                    title,
                    subtitle,
                    description,
                    category,
                    image_url: publicUrl
                }])

            if (insertError) throw insertError
            // Revalidate setelah berhasil insert
            await fetch('/api/revalidate?path=/')

            toast.success('Achievement added successfully')
            resetForm()
            await fetchAchievements()

        } catch (error) {
            console.error('Error:', error)
            toast.error('Failed to add achievement')
        } finally {
            setIsLoading(false)
        }
    }

    function resetForm() {
        setTitle('')
        setSubtitle('')
        setDescription('')
        setCategory('')
        setFile(null)
        setPreview('')
    }

    async function handleDelete(id: string, imageUrl: string) {
        try {
            const { error: deleteError } = await supabase
                .from('achievements')
                .delete()
                .match({ id })

            if (deleteError) throw deleteError

            // Delete image from storage
            const filePath = imageUrl.split('/').pop()
            if (filePath) {
                await supabase.storage
                    .from('images')
                    .remove([`achievements/${filePath}`])
            }
            // Revalidate setelah berhasil delete
            await fetch('/api/revalidate?path=/')

            toast.success('Achievement deleted successfully')
            await fetchAchievements()
        } catch (error) {
            console.error('Error:', error)
            toast.error('Failed to delete achievement')
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
                    <label className="block text-sm font-medium mb-1">Subtitle</label>
                    <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
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
                        <option value="Competition">Competition</option>
                        <option value="Award">Award</option>
                        <option value="Certification">Certification</option>
                    </select>
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
                    {isLoading ? 'Adding...' : 'Add Achievement'}
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                    <div key={achievement.id} className="p-4 bg-white rounded-lg shadow">
                        <div className="flex gap-4">
                            <Image
                                src={achievement.image_url}
                                alt={achievement.title}
                                width={100}
                                height={75}
                                className="rounded"
                            />
                            <div className="flex-1">
                                <h3 className="font-bold">{achievement.title}</h3>
                                <p className="text-sm text-gray-600">{achievement.subtitle}</p>
                                <p className="text-sm text-gray-500 mt-1">{achievement.category}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(achievement.id, achievement.image_url)}
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