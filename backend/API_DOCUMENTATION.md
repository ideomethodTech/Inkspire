# Inkspire Backend API Documentation

This document provides details for all available API endpoints in the Inkspire backend.

**Base URL:** `http://localhost:4000` (Default)

---

## 🏥 Health Check
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Returns server status, MongoDB connection, and service readiness. |

---

## 🔐 Authentication (`/auth`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| POST | `/auth/register` | No | `{ email, password, displayName?, dob?, phoneNumber? }` | Registers a new user in Firebase and MongoDB. Returns a JWT. |
| POST | `/auth/login` | No | `{ idToken }` | Verifies Firebase ID token, syncs user to MongoDB, and returns a JWT. |

---

## 👤 User Profile (`/protected`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| GET | `/protected/profile` | Yes | - | Returns the authenticated user's profile from MongoDB. |
| PUT | `/protected/profile` | Yes | `{ displayName, phoneNumber, dob, photoURL }` | Updates user profile details. |
| GET | `/protected/test` | Yes | - | Test route to verify authentication middleware. |

---

## 📍 Shipping Addresses (`/api/address`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| GET | `/api/address` | Yes | - | Returns all saved addresses for the user. |
| POST | `/api/address` | Yes | `{ name, phone, addressLine, city, state, zip, country?, isDefault? }` | Adds a new shipping address. |
| PUT | `/api/address/:id` | Yes | `id` (path), `{ ... }` | Updates an existing address. |
| DELETE | `/api/address/:id` | Yes | `id` (path) | Deletes a shipping address. |

---

## 🛍️ Products (`/api/products`)
| Method | Endpoint | Auth | Query Params | Description |
|--------|----------|------|--------------|-------------|
| GET | `/api/products` | No | `type, category, featured, trending, bestseller, limit, page, sort, min_price, max_price, tags` | Fetches products with optional filtering and pagination. |
| GET | `/api/products/homepage` | No | - | Returns curated sections for the homepage. |
| GET | `/api/products/search` | No | `q` (required), `type, category, limit` | Performs a text search on products. |
| GET | `/api/products/categories` | No | - | Returns a list of all unique product categories. |
| GET | `/api/products/filters` | No | - | Returns available filter options (categories, types, price range). |
| GET | `/api/products/:id` | No | `id` (path) | Returns detailed information for a specific product. |

---

## ⭐ Reviews (`/api/reviews`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| GET | `/api/reviews/:productId` | No | `page?, limit?` | Returns reviews for a specific product. |
| POST | `/api/reviews` | Yes | `{ productId, rating, comment }` | Adds a review for a product. Updates product average rating. |
| PUT | `/api/reviews/:id` | Yes | `id` (path), `{ rating, comment }` | Updates an existing review. |
| DELETE | `/api/reviews/:id` | Yes | `id` (path) | Deletes a review. |

---

## 🎟️ Coupons (`/api/coupons` & `/api/admin/coupons`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| GET | `/api/coupons` | Yes | - | Returns available coupons for the user. |
| POST | `/api/coupons/apply` | Yes | `{ code, orderTotal }` | Validates a coupon and returns the discount amount. |
| GET | `/api/admin/coupons` | Admin | `page?, limit?` | (Admin) Returns all coupons. |
| POST | `/api/admin/coupons` | Admin | `{ code, discountType, value, expiryDate, ... }` | (Admin) Creates a new coupon. |
| PUT | `/api/admin/coupons/:id` | Admin | `id` (path), `{ ... }` | (Admin) Updates a coupon. |
| DELETE | `/api/admin/coupons/:id` | Admin | `id` (path) | (Admin) Deletes a coupon. |

---

## 👑 Admin Products (`/api/admin`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| GET | `/api/admin/products` | Admin | - | Returns all products (including inactive ones) for admin view. |
| POST | `/api/admin/products` | Admin | `{ name, type, price, ... }` | Creates a new product. |
| PUT | `/api/admin/products/:id` | Admin | `id` (path), `{ ... }` | Updates an existing product. |
| DELETE | `/api/admin/products/:id` | Admin | `id` (path) | Deletes a product. |

---

## 🛒 Shopping Cart (`/api/cart`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| GET | `/api/cart` | Yes | - | Returns the authenticated user's shopping cart. |
| POST | `/api/cart/add` | Yes | `{ productId, variantIndex?, quantity? }` | Adds an item to the cart. |
| PUT | `/api/cart/:productId` | Yes | `productId` (path), `{ variantIndex?, quantity }` | Updates the quantity of a cart item. |
| DELETE | `/api/cart/:productId` | Yes | `productId` (path), `{ variantIndex? }` | Removes an item from the cart. |
| DELETE | `/api/cart` | Yes | - | Clears the entire cart. |

---

## 📦 Orders (`/api/orders`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| POST | `/api/orders` | Yes | `{ shippingAddress, paymentMethod?, notes?, couponCode? }` | Creates an order (Checkout). Accepts coupon code. |
| GET | `/api/orders` | Yes | `page?, limit?` | Returns the authenticated user's order history. |
| GET | `/api/orders/:orderId` | Yes | `orderId` (path) | Returns details for a specific order. |
| GET | `/api/orders/:orderId/tracking` | Yes | `orderId` (path) | Returns tracking information for an order. |
| PUT | `/api/orders/:orderId/cancel` | Yes | `orderId` (path) | Cancels a user's order (if eligible). |
| GET | `/api/orders/admin/all` | Admin | `page?, limit?, status?` | Returns all orders across the platform (Admin only). |
| PUT | `/api/orders/admin/:orderId` | Admin | `orderId` (path), `{ status, note? }` | Updates order status (Admin only). |
| PUT | `/api/orders/admin/:orderId/tracking` | Admin | `orderId` (path), `{ trackingId, carrier, status, location, note }` | Updates tracking info (Admin only). |

---

## 📧 Newsletter (`/api/newsletter`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| POST | `/api/newsletter/subscribe` | No | `{ email }` | Subscribes an email to the newsletter. |

---

## 🖼️ Content Management (`/api/content`)
| Method | Endpoint | Auth | Body / Params | Description |
|--------|----------|------|---------------|-------------|
| GET | `/api/content/hero` | No | - | Returns active hero banners for the frontend. |
| GET | `/api/content/trending` | No | `limit?` | Returns trending products. |
| GET | `/api/content/admin/hero` | Admin | `page?, limit?` | Returns all hero banners (Admin only). |
| POST | `/api/content/admin/hero` | Admin | `{ title, image, ... }` | Creates a new hero banner (Admin only). |
| PUT | `/api/content/admin/hero/:bannerId` | Admin | `bannerId` (path), `{ ... }` | Updates a hero banner (Admin only). |
| DELETE | `/api/content/admin/hero/:bannerId` | Admin | `bannerId` (path) | Deletes a hero banner (Admin only). |

---

## 📊 Admin Dashboard (`/admin`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/admin/dashboard` | Admin | Basic admin verification and dashboard data entry point. |

---

## Authentication Header
Most protected routes require a Bearer token in the `Authorization` header:
`Authorization: Bearer <your_jwt_token>`
