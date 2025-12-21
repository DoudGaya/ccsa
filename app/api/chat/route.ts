import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ 
        error: 'AI service not configured. Please add OPENAI_API_KEY to your environment variables.' 
      }, { status: 500 })
    }

    const systemPrompt = `You are an expert agricultural advisor specializing in climate-smart agriculture. 
Your role is to help farmers, researchers, and agricultural professionals with questions about:
- Climate-smart agricultural practices
- Sustainable farming techniques
- Crop management and optimization
- Soil health and conservation
- Water management and irrigation
- Pest and disease control
- Agricultural technology and innovation
- Climate adaptation strategies
- Agribusiness and market opportunities

Provide practical, actionable advice based on scientific principles and best practices. 
Be concise but thorough in your responses. If you're unsure about something, be honest about it.
Always prioritize sustainable and environmentally friendly solutions.`

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: message }
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 800,
        temperature: 0.7,
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      return NextResponse.json({ 
        error: 'Failed to get response from AI service' 
      }, { status: 500 })
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    return NextResponse.json({ 
      message: aiResponse,
      usage: data.usage 
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ 
      error: 'An error occurred while processing your request' 
    }, { status: 500 })
  }
}
