import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const now = new Date()

    const storyboard = {
      id: 'mock-storyboard-id',
      userId: 'demo-user',
      title: 'Mock Storyboard',
      prompt,
      script: {
        id: 'script-1',
        rawText: 'This is a mock generated script.',
        createdAt: now
      },
      scenes: [],
      timeline: {
        id: 'timeline-1',
        storyboardId: 'mock-storyboard-id',
        tracks: [],
        transitions: [],
        totalDuration: 0
      },
      status: 'draft',
      createdAt: now,
      updatedAt: now
    }

    return NextResponse.json(storyboard, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}