import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const { projectDetails } = await request.json()

    if (!projectDetails || projectDetails.trim().length === 0) {
      return Response.json(
        { error: 'Project details are required' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      )
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `You are an expert web development project estimator. Based on the following project description, estimate how many hours it would take to complete this project.

Project Description:
${projectDetails}

Provide your response in JSON format with a single number field "hours" containing only the estimated number of hours (as a number, not a string). Consider factors like complexity, features, integrations, and testing.

Examples:
- Simple landing page: 8-16 hours
- E-commerce site: 80-120 hours
- Dashboard with auth: 40-60 hours
- Mobile app: 100+ hours

Respond ONLY with valid JSON like: {"hours": 24}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('[v0] Failed to parse Gemini response:', text)
      return Response.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      )
    }

    const parsed = JSON.parse(jsonMatch[0])
    const hours = Math.max(1, Math.min(500, Number(parsed.hours) || 8))
    const hourlyRate = 40
    const cost = hours * hourlyRate

    return Response.json({
      hours: Math.round(hours * 10) / 10, // Round to 1 decimal place
      cost: Math.round(cost * 100) / 100, // Round to 2 decimal places
    })
  } catch (error) {
    console.error('[v0] Quote generation error:', error)
    return Response.json(
      { error: 'Failed to generate quote' },
      { status: 500 }
    )
  }
}
