"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateProjectIdeas(niche: string, difficulty: string) {
  const prompt = `Suggest 3 project ideas for a ${difficulty} level developer in ${niche}. Provide a brief description for each project.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    })

    // Split the text into an array of project ideas
    const ideas = text.split("\n").filter((idea) => idea.trim() !== "")
    return ideas
  } catch (error) {
    console.error("Error generating project ideas:", error)
    throw new Error("Failed to generate project ideas")
  }
}

