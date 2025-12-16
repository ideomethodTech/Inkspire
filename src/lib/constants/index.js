// App Constants

export const SITE_NAME = "Inkspire";
export const SITE_DESCRIPTION = "Your e-commerce destination";

export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: (id) => `/products/${id}`,
  CART: "/cart",
  CHECKOUT: "/checkout",
  LOGIN: "/login",
  REGISTER: "/register",
};

export const CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "accessories", name: "Accessories" },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

export const ORDER_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

//Header Navigation Data
// export const NAVIGATION_MENU = [
//   {
//     id: "posters",
//     label: "POSTERS",
//     href: "/posters",
//     items: [
//       {
//         title: "Music",
//         href: "/posters/music",
//         description: "Vintage bands and modern aesthetics.",
//       },
//       {
//         title: "Abstract",
//         href: "/posters/abstract",
//         description: "Geometric shapes and fluid art.",
//       },
//       {
//         title: "Nature",
//         href: "/posters/nature",
//         description: "Landscapes and floral photography.",
//       },
//       {
//         title: "Movies",
//         href: "/posters/movies",
//         description: "Classic cinema posters re-imagined.",
//       },
//     ],
//   },
//   {
//     id: "collections",
//     label: "COLLECTIONS",
//     href: "/collections",
//     items: [
//       {
//         title: "New Arrivals",
//         href: "/collections/new",
//         description: "Fresh drops from this week.",
//       },
//       {
//         title: "Best Sellers",
//         href: "/collections/bestsellers",
//         description: "Fan favorites and top rated.",
//       },
//       {
//         title: "Limited Edition",
//         href: "/collections/limited",
//         description: "Numbered prints, get them fast.",
//       },
//     ],
//   },
//   {
//     id: "stickers",
//     label: "STICKERS",
//     href: "/stickers",
//     items: [
//       { title: "Sticker Packs", href: "/stickers/packs", description: null },
//       { title: "Laptop Skins", href: "/stickers/laptop", description: null },
//       { title: "Die Cut", href: "/stickers/die-cut", description: null },
//     ],
//   },
// ];

// App Constants

// export const SITE_NAME = 'Inkspire';

// App Constants



export const NAVIGATION_MENU = [
  {
    id: "posters",
    label: "POSTERS",
    type: "dropdown",
    href: "/posters",
    sections: [
      {
        title: "All posters",
        items: [
          { label: "New Arrivals", href: "/posters/new" },
          { label: "Best Selling", href: "/posters/best-selling" },
        ],
      },
      {
        title: "Motivation",
        items: [
          { label: "Quotes", href: "/posters/motivation/quotes" },
          { label: "Success", href: "/posters/motivation/success" },
          { label: "Gym", href: "/posters/motivation/gym" },
          { label: "Study", href: "/posters/motivation/study" },
          { label: "Minimal", href: "/posters/motivation/minimal" },
        ],
      },
      {
        title: "Devotion",
        items: [
          { label: "Lord Shiva", href: "/posters/devotion/shiva" },
          { label: "Lord Krishna", href: "/posters/devotion/krishna" },
          { label: "Buddha", href: "/posters/devotion/buddha" },
          { label: "Ganesha", href: "/posters/devotion/ganesha" },
          { label: "Spiritual Art", href: "/posters/devotion/spiritual" },
        ],
      },
      {
        title: "Cars & Bikes",
        items: [
          { label: "Supercars", href: "/posters/cars/supercars" },
          { label: "Concept Cars", href: "/posters/cars/concept" },
          { label: "Vintage Cars", href: "/posters/cars/vintage" },
          { label: "Sports Bikes", href: "/posters/bikes/sports" },
          { label: "Classic Bikes", href: "/posters/bikes/classic" },
        ],
      },
      {
        title: "Sports",
        items: [
          { label: "Football", href: "/posters/sports/football" },
          { label: "Cricket", href: "/posters/sports/cricket" },
          { label: "Basketball", href: "/posters/sports/basketball" },
          { label: "Formula 1", href: "/posters/sports/f1" },
          { label: "Fitness", href: "/posters/sports/fitness" },
        ],
      },
      {
        title: "Pop Culture",
        items: [
          { label: "Marvel", href: "/posters/pop-culture/marvel" },
          { label: "DC", href: "/posters/pop-culture/dc" },
          { label: "Anime", href: "/posters/pop-culture/anime" },
          { label: "TV Series", href: "/posters/pop-culture/tv" },
          { label: "Movies", href: "/posters/pop-culture/movies" },
        ],
      },
    ],
  },
  {
    id: "collections",
    label: "COLLECTIONS",
    type: "dropdown",
    href: "/collections",
    sections: [
      {
        title: "",
        items: [
          { label: "New Arrivals", href: "/collections/new" },
          { label: "Best Selling", href: "/collections/best-selling" },
        ],
      },
      {
        title: "Split Posters",
        items: [
          { label: "Fighter Jets", href: "/collections/split/jets" },
          { label: "Cars", href: "/collections/split/cars" },
          { label: "Motivation", href: "/collections/split/motivation" },
          { label: "Spiritual", href: "/collections/split/spiritual" },
          { label: "Bikes", href: "/collections/split/bikes" },
          { label: "Sports", href: "/collections/split/sports" },
          { label: "Entertainment", href: "/collections/split/entertainment" },
        ],
      },
      {
        title: "Split by Pieces",
        items: [
          { label: "2-Piece", href: "/collections/pieces/2" },
          { label: "3-Piece", href: "/collections/pieces/3" },
          { label: "5-Panel", href: "/collections/pieces/5" },
          { label: "7-Piece", href: "/collections/pieces/7" },
          { label: "9-Piece", href: "/collections/pieces/9" },
        ],
      },
      {
        title: "Collage Kits",
        items: [
          {
            label: "Aesthetic Collage Kit",
            href: "/collections/kits/aesthetic",
          },
          { label: "50-Piece Kit", href: "/collections/kits/50" },
          { label: "30-Piece Combo Set", href: "/collections/kits/30" },
          { label: "Ganesha", href: "/collections/kits/ganesha" },
        ],
      },
      {
        title: "Themed Kits",
        items: [
          { label: "Travel", href: "/collections/themed/travel" },
          { label: "Quotes", href: "/collections/themed/quotes" },
          { label: "Abstract", href: "/collections/themed/abstract" },
          { label: "Pastel", href: "/collections/themed/pastel" },
        ],
      },
      {
        title: "Retro Prints",
        items: [
          {
            label: "Aesthetic Retro Prints",
            href: "/collections/retro/aesthetic",
          },
          { label: "Custom Retro Prints", href: "/collections/retro/custom" },
          { label: "Mini Pocket Prints", href: "/collections/retro/mini" },
          { label: "Photobooth Strips", href: "/collections/retro/strips" },
        ],
      },
    ],
  },
  {
    id: "stickers",
    label: "STICKERS",
    type: "dropdown", // Changed to dropdown
    href: "/stickers",
    sections: [
      {
        title: "Categories",
        items: [
          { label: "All Stickers", href: "/stickers/all" },
          { label: "Sticker Packs", href: "/stickers/packs" },
        ],
      },
      {
        title: "Tech",
        items: [
          { label: "Laptop Skins", href: "/stickers/laptop" },
          { label: "Mobile Skins", href: "/stickers/mobile" },
          { label: "Keyboard Shortcuts", href: "/stickers/keyboard" },
        ],
      },
      {
        title: "Themes",
        items: [
          { label: "Devotion", href: "/stickers/devotion" },
          { label: "Anime", href: "/stickers/anime" },
          { label: "Coding", href: "/stickers/coding" },
          { label: "Funny", href: "/stickers/funny" },
        ],
      },
      {
        title: "Die Cut",
        items: [
          { label: "Holographic", href: "/stickers/holographic" },
          { label: "Vinyl", href: "/stickers/vinyl" },
          { label: "Clear", href: "/stickers/clear" },
        ],
      },
    ],
  },
];
