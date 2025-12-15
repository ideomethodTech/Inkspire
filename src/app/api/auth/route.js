import { NextResponse } from 'next/server';

// POST /api/auth (login)
export async function POST(request) {
  // TODO: Implement login
  return NextResponse.json({ success: true });
}

// GET /api/auth (get current user)
export async function GET() {
  // TODO: Get current user
  return NextResponse.json({ user: null });
}
