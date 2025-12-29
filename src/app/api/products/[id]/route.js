import { NextResponse } from 'next/server';

// Mock product data - replace with actual database query
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "CAPTAIN AMERICA | POSTER",
    artist: "Marvel",
    category: "Marvel",
    price: 199,
    images: [
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
      "/products/17049f4fe615334de178b8d8cbe384e4c0f7d28d.jpg",
    ],
    description:
      "High-quality poster featuring Captain America from the Marvel Cinematic Universe. Perfect for decorating your space with vibrant colors and detailed artwork.",
  },
  {
    id: 2,
    title: "Lone Rider Defender 102",
    artist: "Ale P",
    category: "Posters",
    price: 8499,
    images: [
      "/products/509e4f2b10c9e62dfc885e829716feb3618ae498.jpg",
      "/products/4ad9203dd2a598811e58c6fc9a3fca19c5bccd53.jpg",
    ],
  },
];

// GET /api/products/:id
export async function GET(request, { params }) {
  const { id } = params;
  const product = MOCK_PRODUCTS.find((p) => p.id === Number(id));
  
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  
  return NextResponse.json(product);
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
