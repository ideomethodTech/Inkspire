import { NextResponse } from 'next/server';

// GET /api/orders
export async function GET() {
  // TODO: Get user orders
  return NextResponse.json({ orders: [] });
}

// POST /api/orders
export async function POST(request) {
  // TODO: Create order
  return NextResponse.json({ success: true, orderId: null });
}
