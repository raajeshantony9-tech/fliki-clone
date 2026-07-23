import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; jobId: string }> }) {
  const { id, jobId } = await params;

  // Return mock job status response
  return NextResponse.json({
    id: jobId,
    storyboardId: id,
    status: 'completed',
    currentStep: 'renderVideo',
    progress: 100,
    createdAt: new Date().toISOString(),
  });
}