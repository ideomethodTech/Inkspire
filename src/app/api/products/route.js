import { NextResponse } from 'next/server';

// GET /api/products
export async function GET(request) {
  // TODO: Implement product fetching
  return NextResponse.json({ products: [], total: 0 });
}

// POST /api/products (admin only)
export async function POST(request) {
  // TODO: Implement product creation
  return NextResponse.json({ success: true });
}
