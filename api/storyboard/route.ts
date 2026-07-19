import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for demo only
let storyboards: any[] = [];

// Helper to create a mock storyboard
function createMockStoryboard(prompt: string) {
  return {
    id: crypto.randomUUID(),
    prompt,
    script: null,
    scenes: [],
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export async function GET(_: NextRequest) {
  // Return list of storyboards
  return NextResponse.json({ storyboards });
}

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  if (!prompt) {
    return new Response('Prompt is required', { status: 400 });
  }
  const newStoryboard = createMockStoryboard(prompt);
  storyboards.push(newStoryboard);
  return NextResponse.json(newStoryboard, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const body = await request.json();

  if (!id) {
    return new Response('Missing id', { status: 400 });
  }

  const index = storyboards.findIndex((s: any) => s.id === id);
  if (index === -1) {
    return new Response('Not found', { status: 404 });
  }

  const updated = { ...storyboards[index], ...body, updatedAt: new Date() };
  storyboards[index] = updated;
  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new Response('Missing id', { status: 400 });
  }

  const index = storyboards.findIndex((s: any) => s.id === id);
  if (index === -1) {
    return new Response('Not found', { status: 404 });
  }

  storyboards.splice(index, 1);
  return new Response(null, { status: 204 });
}