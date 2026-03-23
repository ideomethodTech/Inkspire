import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

// Product Schema (simplified for this script)
const productSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['poster', 'kit', 'sticker'] },
  category: String,
  price: Number,
  description: String,
  variants: [{
    size: String,
    price: Number,
    stock: Number
  }],
  images: [String],
  tags: [String],
  featured: Boolean,
  trending: Boolean,
  bestseller: Boolean,
  createdAt: Date,
  updatedAt: Date,
  active: Boolean
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  // Posters
  { 
    name: "Mountain Sunset Poster", 
    type: "poster", 
    category: "Nature", 
    price: 399, 
    description: "Beautiful sunset over mountains",
    featured: true,
    trending: true,
    variants: [
      { size: "A3", price: 399, stock: 45 },
      { size: "A4", price: 299, stock: 80 }
    ],
    images: ["https://picsum.photos/400/600?random=101"],
    tags: ["mountain", "sunset", "nature"]
  },
  { 
    name: "Ocean Waves Poster", 
    type: "poster", 
    category: "Nature", 
    price: 349, 
    description: "Calming ocean waves",
    trending: true,
    variants: [
      { size: "A3", price: 349, stock: 30 },
      { size: "A4", price: 249, stock: 60 }
    ],
    images: ["https://picsum.photos/400/600?random=102"],
    tags: ["ocean", "waves", "nature"]
  },
  { 
    name: "City Skyline Poster", 
    type: "poster", 
    category: "Urban", 
    price: 299, 
    description: "Modern city skyline at night",
    variants: [
      { size: "A3", price: 299, stock: 25 },
      { size: "A4", price: 199, stock: 50 }
    ],
    images: ["https://picsum.photos/400/600?random=103"],
    tags: ["city", "skyline", "urban"]
  },
  { 
    name: "Forest Path Poster", 
    type: "poster", 
    category: "Nature", 
    price: 279, 
    description: "Peaceful forest path",
    variants: [
      { size: "A3", price: 279, stock: 35 },
      { size: "A4", price: 179, stock: 70 }
    ],
    images: ["https://picsum.photos/400/600?random=104"],
    tags: ["forest", "nature", "peaceful"]
  },
  { 
    name: "Abstract Art Poster", 
    type: "poster", 
    category: "Art", 
    price: 449, 
    description: "Colorful abstract art",
    featured: true,
    variants: [
      { size: "A3", price: 449, stock: 20 },
      { size: "A4", price: 349, stock: 40 }
    ],
    images: ["https://picsum.photos/400/600?random=105"],
    tags: ["abstract", "art", "colorful"]
  },
  { 
    name: "Vintage Map Poster", 
    type: "poster", 
    category: "Vintage", 
    price: 329, 
    description: "Old world map design",
    variants: [
      { size: "A3", price: 329, stock: 15 },
      { size: "A4", price: 229, stock: 30 }
    ],
    images: ["https://picsum.photos/400/600?random=106"],
    tags: ["vintage", "map", "world"]
  },
  { 
    name: "Space Galaxy Poster", 
    type: "poster", 
    category: "Science", 
    price: 499, 
    description: "Beautiful galaxy in space",
    trending: true,
    variants: [
      { size: "A3", price: 499, stock: 10 },
      { size: "A4", price: 399, stock: 20 }
    ],
    images: ["https://picsum.photos/400/600?random=107"],
    tags: ["space", "galaxy", "science"]
  },
  { 
    name: "Floral Pattern Poster", 
    type: "poster", 
    category: "Nature", 
    price: 259, 
    description: "Colorful floral pattern",
    variants: [
      { size: "A3", price: 259, stock: 40 },
      { size: "A4", price: 159, stock: 80 }
    ],
    images: ["https://picsum.photos/400/600?random=108"],
    tags: ["floral", "flowers", "nature"]
  },
  
  // Kits
  { 
    name: "Watercolor Kit", 
    type: "kit", 
    category: "Art", 
    price: 1299, 
    description: "Complete watercolor painting kit",
    bestseller: true,
    variants: [
      { size: "Small", price: 1299, stock: 25 },
      { size: "Large", price: 1999, stock: 15 }
    ],
    images: ["https://picsum.photos/400/600?random=201"],
    tags: ["watercolor", "art", "kit"]
  },
  { 
    name: "Sketching Set", 
    type: "kit", 
    category: "Art", 
    price: 899, 
    description: "Professional sketching pencils and paper",
    variants: [
      { size: "Basic", price: 899, stock: 30 },
      { size: "Pro", price: 1499, stock: 10 }
    ],
    images: ["https://picsum.photos/400/600?random=202"],
    tags: ["sketching", "pencils", "art"]
  },
  { 
    name: "Calligraphy Set", 
    type: "kit", 
    category: "Art", 
    price: 1499, 
    description: "Complete calligraphy starter kit",
    variants: [
      { size: "Starter", price: 1499, stock: 20 },
      { size: "Master", price: 2499, stock: 5 }
    ],
    images: ["https://picsum.photos/400/600?random=203"],
    tags: ["calligraphy", "writing", "art"]
  },
  
  // Stickers
  { 
    name: "Animal Sticker Pack", 
    type: "sticker", 
    category: "Cute", 
    price: 149, 
    description: "20 cute animal stickers",
    trending: true,
    variants: [
      { size: "Pack of 20", price: 149, stock: 200 }
    ],
    images: ["https://picsum.photos/400/600?random=301"],
    tags: ["animals", "cute", "stickers"]
  },
  { 
    name: "Food Stickers", 
    type: "sticker", 
    category: "Food", 
    price: 129, 
    description: "Fun food-themed stickers",
    variants: [
      { size: "Pack of 15", price: 129, stock: 150 }
    ],
    images: ["https://picsum.photos/400/600?random=302"],
    tags: ["food", "cute", "stickers"]
  },
  { 
    name: "Motivational Quotes", 
    type: "sticker", 
    category: "Inspirational", 
    price: 99, 
    description: "Inspirational quote stickers",
    variants: [
      { size: "Pack of 10", price: 99, stock: 300 }
    ],
    images: ["https://picsum.photos/400/600?random=303"],
    tags: ["motivational", "quotes", "stickers"]
  }
];

async function addProducts() {
  try {
    console.log("🌱 Adding test products...");
    
    for (const product of sampleProducts) {
      const productData = {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
        active: true
      };
      
      const newProduct = new Product(productData);
      await newProduct.save();
      console.log(`✅ Added: ${product.name} (${product.type})`);
    }
    
    console.log(`\n🎉 Successfully added ${sampleProducts.length} products!`);
    console.log("\n📊 Total products now available for pagination testing:");
    console.log("   - Page 1: GET /api/products?page=1&limit=10");
    console.log("   - Page 2: GET /api/products?page=2&limit=10");
    console.log("   - Page 3: GET /api/products?page=3&limit=10");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding products:", error);
    process.exit(1);
  }
}

// Connect to MongoDB and add products
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    addProducts();
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
