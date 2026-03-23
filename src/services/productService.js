// Product API Service

const API_BASE_URL ="http://localhost:4000";
const API_URL = `${API_BASE_URL}/api/products`;

const resolveImageUrl = (src) => {
  if (!src || typeof src !== "string") return "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/products/")) return src;
  if (src.startsWith("/")) return `${API_BASE_URL}${src}`;
  return src;
};

const normalizeProduct = (product) => {
  if (!product || typeof product !== "object") return product;

  const images = Array.isArray(product.images)
    ? product.images.map(resolveImageUrl)
    : [];
  const image =
    resolveImageUrl(product.image) ||
    resolveImageUrl(product.thumbnail) ||
    resolveImageUrl(product.cover) ||
    images[0] ||
    "";
  const priceNumber =
    typeof product.price === "number" ? product.price : Number(product.price);
  const price = Number.isFinite(priceNumber) ? priceNumber : product.price;

  const category =
    (product.category && product.category.name) || product.category;
  const artist =
    product.artist || product.brand || product.creator || product.category || product.type;
  const description =
    product.description || product.desc || product.shortDescription;

  return {
    ...product,
    id: product.id || product._id,
    title: product.title || product.name || "Untitled",
    price,
    images,
    image,
    category,
    artist,
    description,
  };
};

const normalizeProductList = (payload) => {
  if (!payload) return { products: [], total: 0, page: 1, limit: 0, totalPages: 1 };
  if (Array.isArray(payload)) {
    return {
      products: payload.map(normalizeProduct),
      total: payload.length,
      page: 1,
      limit: payload.length,
      totalPages: 1,
    };
  }

  if (Array.isArray(payload.products)) {
    return {
      products: payload.products.map(normalizeProduct),
      total: payload.total ?? payload.products.length,
      page: payload.page ?? 1,
      limit: payload.limit ?? payload.products.length,
      totalPages: payload.totalPages ?? 1,
      appliedFilters: payload.appliedFilters,
    };
  }

  if (payload.data) {
    if (Array.isArray(payload.data)) {
      return {
        products: payload.data.map(normalizeProduct),
        total: payload.data.length,
        page: 1,
        limit: payload.data.length,
        totalPages: 1,
      };
    }
    if (Array.isArray(payload.data.products)) {
      return {
        products: payload.data.products.map(normalizeProduct),
        total: payload.data.total ?? payload.data.products.length,
        page: payload.data.page ?? 1,
        limit: payload.data.limit ?? payload.data.products.length,
        totalPages: payload.data.totalPages ?? 1,
        appliedFilters: payload.data.appliedFilters,
      };
    }
  }

  return { products: [], total: 0, page: 1, limit: 0, totalPages: 1 };
};

export async function getProducts(params = {}) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      if (value.length === 0) return;
      searchParams.set(key, value.join(","));
      return;
    }
    searchParams.set(key, String(value));
  });
  const res = await fetch(`${API_URL}?${searchParams}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const payload = await res.json();
  return normalizeProductList(payload);
}

export async function getProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Product not found");
  const payload = await res.json();
  const product = payload?.data || payload;
  return normalizeProduct(product);
}

export async function searchProducts(query) {
  const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) {
    throw new Error("Failed to search products");
  }
  const payload = await res.json();
  return normalizeProductList(payload);
}

export async function getProductFilters() {
  const res = await fetch(`${API_URL}/filters`);
  if (!res.ok) {
    throw new Error("Failed to fetch product filters");
  }
  const payload = await res.json();
  return payload?.data || payload;
}
