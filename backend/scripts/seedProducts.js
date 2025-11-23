import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

// Load environment variables
dotenv.config();

/**
 * Sample products data - 15 premium home decor items
 * These will be inserted into the MongoDB database
 */
const sampleProducts = [
    {
        name: "Luxury Velvet Sofa",
        description: "Indulge in ultimate comfort with our handcrafted velvet sofa. Features deep cushioning, solid oak frame, and premium Italian velvet upholstery. Perfect centerpiece for your living room.",
        price: 2499.99,
        category: "Furniture",
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
            "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800"
        ],
        stock: 12,
        rating: 4.8,
        tags: ["luxury", "modern", "bestseller", "comfortable"]
    },
    {
        name: "Marble Coffee Table",
        description: "Elegant coffee table with genuine Carrara marble top and brushed gold metal base. A statement piece that combines functionality with sophisticated design.",
        price: 899.99,
        category: "Furniture",
        images: [
            "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800",
            "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800"
        ],
        stock: 8,
        rating: 4.9,
        tags: ["elegant", "marble", "modern", "premium"]
    },
    {
        name: "Crystal Chandelier",
        description: "Stunning 8-light crystal chandelier with cascading crystals and chrome finish. Creates mesmerizing light patterns and adds glamour to any space.",
        price: 1299.99,
        category: "Lighting",
        images: [
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800",
            "https://images.unsplash.com/photo-1565373679940-e2c8d119e6c7?w=800"
        ],
        stock: 5,
        rating: 5.0,
        tags: ["luxury", "crystal", "elegant", "statement"]
    },
    {
        name: "Minimalist Floor Lamp",
        description: "Sleek arc floor lamp with adjustable arm and warm LED lighting. Scandinavian-inspired design in matte black finish. Perfect for reading corners.",
        price: 349.99,
        category: "Lighting",
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800"
        ],
        stock: 20,
        rating: 4.6,
        tags: ["modern", "minimalist", "scandinavian", "functional"]
    },
    {
        name: "Handwoven Wall Tapestry",
        description: "Artisan-crafted macramé wall hanging in natural cotton. Bohemian-chic design that adds texture and warmth to your walls. Each piece is unique.",
        price: 189.99,
        category: "Decor",
        images: [
            "https://images.unsplash.com/photo-1578898886225-c7c894042a8e?w=800",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"
        ],
        stock: 15,
        rating: 4.7,
        tags: ["bohemian", "handmade", "artisan", "natural"]
    },
    {
        name: "Ceramic Vase Collection",
        description: "Set of 3 handcrafted ceramic vases in varying heights. Matte white finish with organic shapes. Perfect for fresh or dried flowers.",
        price: 129.99,
        category: "Decor",
        images: [
            "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800",
            "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800"
        ],
        stock: 25,
        rating: 4.5,
        tags: ["ceramic", "modern", "set", "minimalist"]
    },
    {
        name: "Tufted Ottoman Bench",
        description: "Luxurious velvet ottoman with deep button tufting and gold metal legs. Doubles as extra seating or elegant footrest. Available in emerald green.",
        price: 449.99,
        category: "Furniture",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
            "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800"
        ],
        stock: 10,
        rating: 4.8,
        tags: ["luxury", "velvet", "versatile", "elegant"]
    },
    {
        name: "Abstract Canvas Art",
        description: "Large-scale abstract painting on gallery-wrapped canvas. Bold brushstrokes in navy, gold, and cream. Ready to hang, no frame needed.",
        price: 599.99,
        category: "Decor",
        images: [
            "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800",
            "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800"
        ],
        stock: 7,
        rating: 4.9,
        tags: ["art", "abstract", "modern", "statement"]
    },
    {
        name: "Brass Table Lamp Set",
        description: "Pair of vintage-inspired brass table lamps with linen shades. Perfect for nightstands or side tables. Adds warm, ambient lighting.",
        price: 279.99,
        category: "Lighting",
        images: [
            "https://images.unsplash.com/photo-1550985616-10810253b84d?w=800",
            "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800"
        ],
        stock: 18,
        rating: 4.6,
        tags: ["vintage", "brass", "set", "classic"]
    },
    {
        name: "Faux Fur Throw Blanket",
        description: "Ultra-soft faux fur throw in ivory white. Luxuriously plush and cozy. Perfect for draping over sofas or beds. Machine washable.",
        price: 89.99,
        category: "Textiles",
        images: [
            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800",
            "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800"
        ],
        stock: 30,
        rating: 4.7,
        tags: ["cozy", "soft", "luxury", "comfort"]
    },
    {
        name: "Geometric Bookshelf",
        description: "Modern asymmetric bookshelf in walnut finish. Five open compartments for books and decor. Wall-mounted design saves floor space.",
        price: 379.99,
        category: "Furniture",
        images: [
            "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800",
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"
        ],
        stock: 14,
        rating: 4.5,
        tags: ["modern", "geometric", "functional", "space-saving"]
    },
    {
        name: "Scented Candle Set",
        description: "Collection of 4 premium soy candles in elegant glass vessels. Scents: Vanilla Oak, Lavender Fields, Sandalwood, and Sea Salt. 40-hour burn time each.",
        price: 79.99,
        category: "Decor",
        images: [
            "https://images.unsplash.com/photo-1602874801006-e04b8f9bdb21?w=800",
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800"
        ],
        stock: 40,
        rating: 4.8,
        tags: ["candles", "aromatherapy", "gift", "luxury"]
    },
    {
        name: "Rattan Accent Chair",
        description: "Handwoven rattan chair with plush cream cushion. Natural finish brings organic warmth. Perfect for creating a cozy reading nook.",
        price: 549.99,
        category: "Furniture",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
            "https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800"
        ],
        stock: 9,
        rating: 4.7,
        tags: ["natural", "rattan", "bohemian", "comfortable"]
    },
    {
        name: "Gold Mirror Set",
        description: "Set of 3 round mirrors with brushed gold frames in varying sizes. Create a stunning gallery wall. Easy to hang with included hardware.",
        price: 199.99,
        category: "Decor",
        images: [
            "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800",
            "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"
        ],
        stock: 22,
        rating: 4.6,
        tags: ["mirrors", "gold", "set", "elegant"]
    },
    {
        name: "Velvet Cushion Collection",
        description: "Set of 4 luxury velvet cushions in jewel tones (emerald, sapphire, ruby, gold). Includes premium feather inserts. 18x18 inches.",
        price: 149.99,
        category: "Textiles",
        images: [
            "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800"
        ],
        stock: 28,
        rating: 4.9,
        tags: ["velvet", "luxury", "colorful", "set"]
    }
];

/**
 * Seed function - clears existing products and inserts sample data
 */
const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing products
        await Product.deleteMany({});
        console.log('🗑️  Cleared existing products');

        // Insert sample products
        const products = await Product.insertMany(sampleProducts);
        console.log(`✨ Successfully seeded ${products.length} products!`);

        // Log some sample product names
        console.log('\n📦 Sample products added:');
        products.slice(0, 5).forEach(p => {
            console.log(`   - ${p.name} ($${p.price})`);
        });
        console.log(`   ... and ${products.length - 5} more!\n`);

        // Exit process
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error.message);
        process.exit(1);
    }
};

// Run the seed function
seedDatabase();
