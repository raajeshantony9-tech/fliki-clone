import { NextResponse } from 'next/server'

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Mock response: return a jobId
  return NextResponse.json(
    { jobId: 'mock-job-id' },
    { status: 200 }
  )
}