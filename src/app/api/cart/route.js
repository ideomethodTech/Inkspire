import { NextResponse } from 'next/server';

// GET /api/cart
export async function GET() {
  // TODO: Get cart items
  return NextResponse.json({ items: [] });
}

// POST /api/cart
export async function POST(request) {
  // TODO: Add item to cart
  return NextResponse.json({ success: true });
}

// DELETE /api/cart
export async function DELETE() {
  // TODO: Clear cart
  return NextResponse.json({ success: true });
}
