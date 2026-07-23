import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for demo only (matches the pattern in route.ts)
let storyboards: any[] = [];

// Helper to find storyboard by ID
function findStoryboard(id: string) {
  return storyboards.find((s: any) => s.id === id);
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  // Find the storyboard
  const storyboard = findStoryboard(id);
  if (!storyboard) {
    return new Response('Storyboard not found', { status: 404 });
  }

  // Update status to generating
  storyboard.status = 'generating';
  storyboard.updatedAt = new Date();

  // In a real app, this would trigger a background job
  // For now, we'll simulate by returning a mock job ID
  const jobId = crypto.randomUUID();

  // Return mock response matching what the frontend expects
  return NextResponse.json({ jobId });
}