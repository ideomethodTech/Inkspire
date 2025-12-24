export const createProductDoc = (data) => ({
  name: data.name,
  type: data.type, // 'poster', 'kit', 'sticker'
  category: data.category,
  description: data.description,
  price: data.price,
  variants: data.variants || [], // [{size: 'A3', price: 299, stock: 50}]
  images: data.images || [],
  tags: data.tags || [],
  featured: data.featured || false,
  trending: data.trending || false,
  bestseller: data.bestseller || false,
  createdAt: new Date(),
  updatedAt: new Date(),
  active: true,
});

export const productResponse = (id, data) => ({
  id,
  name: data.name,
  type: data.type,
  category: data.category,
  description: data.description,
  price: data.price,
  variants: data.variants,
  images: data.images,
  tags: data.tags,
  featured: data.featured,
  trending: data.trending,
  bestseller: data.bestseller,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});