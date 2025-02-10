import { WorkManager } from './components/work-manager'
import { SkillManager } from './components/skill-manager'

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* What I Do Manager */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Manage What I Do</h2>
        <WorkManager />
      </div>

      {/* Skills Manager */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Manage Skills</h2>
        <SkillManager />
      </div>
    </div>
  )
}