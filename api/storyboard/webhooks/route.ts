import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple webhook receiver for external services (image, TTS, video)
export async function POST(request: NextRequest) {
  const payload = await request.json();
  // In real app, verify signature, update job/store, etc.
  console.log('Webhook received:', payload);
  // For now just acknowledge
  return new Response('OK', { status: 200 });
}

// Optional GET for verification (if needed by provider)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  // Example for Facebook/Websub style verification
  if (mode === 'subscribe' && token === 'VERIFY_TOKEN') {
    return new Response(challenge ?? '', { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}