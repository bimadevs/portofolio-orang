'use client'

import { WorkManager } from './components/work-manager'
import { SkillManager } from './components/skill-manager'
import { AchievementManager } from './components/achievement-manager'
import { ProjectManager } from './components/project-manager'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type TabType = 'work' | 'skills' | 'projects' | 'achievements'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('work')

  const tabs = [
    { id: 'work', label: 'What I Do', icon: 'fas fa-briefcase' },
    { id: 'skills', label: 'Skills', icon: 'fas fa-code' },
    { id: 'projects', label: 'Projects', icon: 'fas fa-project-diagram' },
    { id: 'achievements', label: 'Achievements', icon: 'fas fa-trophy' }
  ] as const

  const renderContent = (tab: TabType) => {
    switch (tab) {
      case 'work':
        return <WorkManager />
      case 'skills':
        return <SkillManager />
      case 'projects':
        return <ProjectManager />
      case 'achievements':
        return <AchievementManager />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-2">Manage your portfolio content</p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <i className={tab.icon}></i>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {tabs.find(tab => tab.id === activeTab)?.label}
                      </h2>
                      <p className="text-gray-500">
                        Manage your {activeTab === 'work' ? 'services and offerings' :
                          activeTab === 'skills' ? 'technical skills and expertise' :
                          activeTab === 'projects' ? 'portfolio projects' :
                          'accomplishments and certifications'}
                      </p>
                    </div>
                  </div>
                  {renderContent(activeTab)}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}