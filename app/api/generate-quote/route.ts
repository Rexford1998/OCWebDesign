import { generateText } from 'ai'

export async function POST(request: Request) {
  try {
    const { projectDetails } = await request.json()

    if (!projectDetails || projectDetails.trim().length === 0) {
      return Response.json(
        { error: 'Project details are required' },
        { status: 400 }
      )
    }

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

    const result = await generateText({
      model: 'openai/gpt-4o-mini',
      prompt: prompt,
    })

    const text = result.text

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      console.error('[v0] Failed to parse AI response:', text)
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
