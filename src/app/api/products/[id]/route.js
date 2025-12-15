import { NextResponse } from 'next/server';

// GET /api/products/:id
export async function GET(request, { params }) {
  const { id } = params;
  // TODO: Fetch product by id
  return NextResponse.json({ id });
}

// PATCH /api/products/:id
export async function PATCH(request, { params }) {
  // TODO: Update product
  return NextResponse.json({ success: true });
}

// DELETE /api/products/:id
export async function DELETE(request, { params }) {
  // TODO: Delete product
  return NextResponse.json({ success: true });
}
