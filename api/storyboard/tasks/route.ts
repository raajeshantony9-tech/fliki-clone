import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory job queue placeholder
let jobs: any[] = [];

export async function POST(request: NextRequest) {
  const { storyboardId } = await request.json();
  if (!storyboardId) return new Response('Missing storyboardId', { status: 400 });
  const jobId = crypto.randomUUID();
  const job = {
    id: jobId,
    storyboardId,
    status: 'queued',
    currentStep: 'generateScript',
    progress: 0,
    createdAt: new Date(),
  };
  jobs.push(job);
  // In real app, enqueue to a background worker (BullMQ etc.)
  return NextResponse.json({ jobId }, { status: 201 });
}

export async function GET(request: NextRequest) {
  // Optionally list jobs for a storyboard
  const { searchParams } = new URL(request.url);
  const storyboardId = searchParams.get('storyboardId');
  let filtered = jobs;
  if (storyboardId) {
    filtered = jobs.filter(j => j.storyboardId === storyboardId);
  }
  return NextResponse.json({ jobs: filtered });
}