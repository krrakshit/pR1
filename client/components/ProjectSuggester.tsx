"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { generateProjectIdeas } from "@/app/actions"

const techNiches = [
  "UI/UX Design",
  "App Development",
  "Web Development",
  "Data Structures and Algorithms",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
]

const difficultyLevels = ["Beginner", "Intermediate", "Advanced","Expert"]

export default function ProjectSuggester() {
  const [niche, setNiche] = useState<string>("")
  const [difficulty, setDifficulty] = useState<string>("")
  const [projects, setProjects] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!niche || !difficulty) return

    setLoading(true)
    try {
      const ideas = await generateProjectIdeas(niche, difficulty)
      setProjects(ideas)
    } catch (error) {
      console.error("Failed to generate project ideas:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Select onValueChange={(value) => setNiche(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a tech niche" />
          </SelectTrigger>
          <SelectContent>
            {techNiches.map((niche) => (
              <SelectItem key={niche} value={niche}>
                {niche}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setDifficulty(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent>
            {difficultyLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSubmit} disabled={!niche || !difficulty || loading} className="w-full">
        {loading ? "Generating Ideas..." : "Generate Project Ideas"}
      </Button>

      {projects.length > 0 && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-2">Project Ideas:</h2>
            <ul className="list-disc pl-5 space-y-2">
              {projects.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

