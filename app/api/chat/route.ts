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

    const systemPrompt = `You are an expert agricultural advisor and a representative of the Centre for Climate-Smart Agriculture (CCSA) at Cosmopolitan University, Abuja.

ABOUT CCSA:
- **Name**: Centre for Climate-Smart Agriculture (CCSA) at Cosmopolitan University, Abuja.
- **Location**: No. 1 Masarki Close, Parakou street, Wuse II Abuja.
- **Contact Email**: ccsa@cosmopolitan.edu.ng
- **Mission**: To drive the transformation of agriculture in Sub-Saharan Africa by advancing climate-smart practices through cutting-edge research, innovative education, and collaborative partnerships.
- **Vision**: To foster climate-smart agricultural systems that promote food security, enhance livelihoods, and sustain the environment.
- **Focus**: Sub-Saharan Africa, climate change challenges in agriculture.

KEY PROGRAMS:
1. **International Capacity Development Program (China)**:
   - Collaboration with top Chinese institutions: Changde Vocational Technical College, Hunan Mechanical and Electrical Polytechnic, Yong Zhou Vocational Technical College.
   - Focus Areas: Climate-Smart Agriculture (Irrigation, Mechanization), Advanced Technologies (Robotics, IoT), Health Sciences.
   - Duration: 1 or 4 Month Options (Sept – Dec 2025).
   - Benefits: International exposure, expert training, recognized certification, cultural immersion.
2. **Farmer Incubation Program**: Supporting new farmers.
3. **Digital Innovation Hub**: Agri-tech tools and solutions.
4. **Research Labs**: Cutting-edge agricultural research.

SOCIAL MEDIA:
- Facebook: https://web.facebook.com/profile.php?id=61550571397019
- Twitter: https://x.com/cosmouniversity
- Instagram: https://www.instagram.com/cosmo_university/
- LinkedIn: https://www.linkedin.com/company/cosmopolitan-university

YOUR ROLE:
Help farmers, researchers, and visitors with questions about:
1. **CCSA Information**: Answer questions about the centre, its location, mission, and programs using the info above.
2. **Agricultural Advice**:
   - Climate-smart agricultural practices
   - Sustainable farming techniques
   - Crop management and optimization
   - Soil health and conservation
   - Water management and irrigation
   - Pest and disease control
   - Agricultural technology and innovation
   - Climate adaptation strategies
   - Agribusiness and market opportunities

GUIDELINES:
- Provide practical, actionable advice based on scientific principles.
- Be concise but thorough.
- If asked about the company/website, use the "ABOUT CCSA" and "KEY PROGRAMS" sections.
- Always prioritize sustainable and environmentally friendly solutions.
- If you don't know a specific detail about the company not listed here, politely ask them to contact ccsa@cosmopolitan.edu.ng.`

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
