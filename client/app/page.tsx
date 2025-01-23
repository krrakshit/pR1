import ProjectSuggester from "@/components/ProjectSuggester"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Project Suggester</h1>
        <ProjectSuggester />
      </div>
    </div>
  )
}

