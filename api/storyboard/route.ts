import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for demo only; replace with DB in real implementation
let storyboards: any[] = []; // placeholder

export async function GET(request: NextRequest) {
  // Return list of storyboards for the demo user
  return NextResponse.json({ storyboards });
}

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  const newStoryboard = {
    id: crypto.randomUUID(),
    userId: 'demo-user', // replace with auth
    prompt,
    status: 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  storyboards.push(newStoryboard);
  return NextResponse.json(newStoryboard, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  // For simplicity, expect id in query or body
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const body = await request.json();
  if (!id) return new Response('Missing id', { status: 400 });
  const idx = storyboards.findIndex(s => s.id === id);
  if (idx === -1) return new Response('Not found', { status: 404 });
  storyboards[idx] = { ...storyboards[idx], ...body, updatedAt: new Date() };
  return NextResponse.json(storyboards[idx]);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return new Response('Missing id', { status: 400 });
  const idx = storyboards.findIndex(s => s.id === id);
  if (idx === -1) return new Response('Not found', { status: 404 });
  storyboards.splice(idx, 1);
  return new Response(null, { status: 204 });
}