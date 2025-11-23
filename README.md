# LuxeHome - Premium E-Commerce Web App

A complete mini e-commerce web application built with **MERN Stack + Vite + Tailwind CSS**.

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **Context API** - State management for shopping cart

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

## 📁 Project Structure

```
11/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   └── Product.js            # Product schema
│   ├── routes/
│   │   └── productRoutes.js      # API routes
│   ├── scripts/
│   │   └── seedProducts.js       # Database seeding script
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server entry point
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Navigation bar
    │   │   ├── Footer.jsx        # Footer component
    │   │   ├── ProductCard.jsx   # Product card component
    │   │   └── LoadingSpinner.jsx
    │   ├── context/
    │   │   └── CartContext.jsx   # Cart state management
    │   ├── pages/
    │   │   ├── HomePage.jsx      # Landing page
    │   │   ├── ShopPage.jsx      # Product listing
    │   │   ├── ProductDetailPage.jsx
    │   │   ├── CartPage.jsx      # Shopping cart
    │   │   ├── CheckoutPage.jsx  # Checkout form
    │   │   ├── OrderSuccessPage.jsx
    │   │   ├── AboutPage.jsx
    │   │   ├── ContactPage.jsx
    │   │   └── AdminPage.jsx     # Admin dashboard
    │   ├── config/
    │   │   └── api.js            # API configuration
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Global styles
    ├── .env                      # Frontend environment variables
    ├── index.html
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **MongoDB Compass** (for viewing database)

### Step 1: Clone or Download the Project

The project is already in your `Desktop/11` folder.

### Step 2: Set Up MongoDB

#### Option A: Local MongoDB (Recommended for this project)

1. **Install MongoDB** on your computer if not already installed
2. **Start MongoDB service**:
   - Windows: MongoDB should start automatically, or run `mongod` in terminal
   - The default connection will be: `mongodb://127.0.0.1:27017/`

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update the `MONGODB_URI` in `backend/.env`

### Step 3: Install Backend Dependencies

```powershell
cd backend
npm install
```

### Step 4: Configure Backend Environment Variables

The `backend/.env` file is already created with default values:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce_db
PORT=5000
```

**For local MongoDB**: Keep it as is
**For MongoDB Atlas**: Replace with your Atlas connection string

### Step 5: Seed the Database

This will create the database and insert 15 sample products:

```powershell
# Make sure you're in the backend folder
npm run seed
```

You should see output like:
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✨ Successfully seeded 15 products!
```

### Step 6: View Database in MongoDB Compass

1. **Open MongoDB Compass**
2. **Connect** using the connection string:
   ```
   mongodb://127.0.0.1:27017/
   ```
3. You should see a database named **`ecommerce_db`**
4. Click on it to see the **`products`** collection
5. You can view all 15 products with their details

### Step 7: Start the Backend Server

```powershell
# In the backend folder
npm run dev
```

You should see:
```
🚀 Server is running on port 5000
📍 API URL: http://localhost:5000
✅ MongoDB Connected: 127.0.0.1
📊 Database Name: ecommerce_db
```

**Keep this terminal running!**

### Step 8: Install Frontend Dependencies

Open a **new terminal** window:

```powershell
cd frontend
npm install
```

### Step 9: Start the Frontend Development Server

```powershell
# In the frontend folder
npm run dev
```

The app should automatically open in your browser at:
```
http://localhost:3000
```

## 🎯 Features

### Customer Features

1. **Home Page**
   - Hero section with call-to-action
   - Featured products showcase
   - Brand story section
   - Features highlights

2. **Shop Page**
   - Grid view of all products
   - Search by product name
   - Filter by category
   - Filter by price range
   - Real-time filtering

3. **Product Detail Page**
   - Large product images with gallery
   - Product information (name, price, description, rating)
   - Stock availability
   - Quantity selector
   - Add to cart / Buy now buttons
   - Related products from same category

4. **Shopping Cart**
   - View all cart items
   - Update quantities
   - Remove items
   - See subtotal, tax, and total
   - Proceed to checkout
   - Cart persists in localStorage

5. **Checkout**
   - Shipping information form
   - Order summary
   - Mock order placement
   - Success confirmation page

6. **About & Contact Pages**
   - Company information
   - Contact form
   - Business details

### Admin Features

7. **Admin Dashboard** (`/admin`)
   - View all products in table format
   - Add new products
   - Delete products
   - See stock levels at a glance

## 📊 Database Schema

### Product Model

```javascript
{
  name: String,           // Product name
  description: String,    // Detailed description
  price: Number,          // Price in dollars
  category: String,       // Category (Furniture, Lighting, Decor, Textiles)
  images: [String],       // Array of image URLs
  stock: Number,          // Available quantity
  rating: Number,         // Rating (1-5)
  tags: [String],         // Tags for filtering
  createdAt: Date         // Creation timestamp
}
```

## 🔄 Data Flow

### How Data Flows Through the Application

1. **MongoDB → Backend API**
   - Products are stored in MongoDB database
   - Backend Express server connects to MongoDB using Mongoose
   - API routes query the database and return JSON responses

2. **Backend API → Frontend**
   - Frontend makes HTTP requests using Axios
   - Requests go to `http://localhost:5000/api/products`
   - Backend responds with product data in JSON format

3. **Frontend → Cart (Context)**
   - User clicks "Add to Cart"
   - Product is added to Cart Context state
   - Cart state is automatically saved to localStorage
   - Cart count updates in navbar

4. **Cart → Checkout**
   - User proceeds to checkout
   - Cart items are displayed in order summary
   - User fills shipping form
   - On submit, cart is cleared and user sees success page

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (with optional filters) |
| GET | `/api/products/:id` | Get single product by ID |
| POST | `/api/products` | Create new product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Query Parameters for GET /api/products

- `category` - Filter by category
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `search` - Search in product name

Example:
```
GET /api/products?category=Furniture&minPrice=100&maxPrice=1000
```

## 🎨 Design Features

- **Premium UI/UX** with Tailwind CSS
- **Responsive design** - works on mobile, tablet, and desktop
- **Smooth animations** and transitions
- **Custom color palette** with gold accents
- **Google Fonts** (Inter + Playfair Display)
- **Glassmorphism** and soft shadows
- **Hover effects** on cards and buttons

## 📝 Sample Products

The seed script includes 15 premium home decor products:

1. Luxury Velvet Sofa - $2,499.99
2. Marble Coffee Table - $899.99
3. Crystal Chandelier - $1,299.99
4. Minimalist Floor Lamp - $349.99
5. Handwoven Wall Tapestry - $189.99
6. Ceramic Vase Collection - $129.99
7. Tufted Ottoman Bench - $449.99
8. Abstract Canvas Art - $599.99
9. Brass Table Lamp Set - $279.99
10. Faux Fur Throw Blanket - $89.99
11. Geometric Bookshelf - $379.99
12. Scented Candle Set - $79.99
13. Rattan Accent Chair - $549.99
14. Gold Mirror Set - $199.99
15. Velvet Cushion Collection - $149.99

## 🛠️ Available Scripts

### Backend

```powershell
npm start       # Start server (production)
npm run dev     # Start server with nodemon (development)
npm run seed    # Seed database with sample products
```

### Frontend

```powershell
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Problem**: Cannot connect to MongoDB

**Solutions**:
1. Make sure MongoDB service is running
2. Check if the connection string in `.env` is correct
3. For local MongoDB, try: `mongodb://127.0.0.1:27017/ecommerce_db`
4. In MongoDB Compass, test the connection first

### Port Already in Use

**Problem**: Port 5000 or 3000 is already in use

**Solutions**:
1. Change `PORT` in `backend/.env` to a different port (e.g., 5001)
2. Update `VITE_API_URL` in `frontend/.env` accordingly
3. Or stop the process using that port

### Products Not Loading

**Problem**: Frontend shows "Failed to load products"

**Solutions**:
1. Make sure backend server is running
2. Check if `VITE_API_URL` in `frontend/.env` matches your backend URL
3. Check browser console for CORS errors
4. Verify backend is accessible at `http://localhost:5000`

### Cart Not Persisting

**Problem**: Cart items disappear on refresh

**Solution**: This shouldn't happen as cart uses localStorage. Check browser console for errors.

## 📚 Learning Resources

This project is perfect for BCA students learning:
- React hooks (useState, useEffect, useContext)
- React Router for navigation
- Context API for state management
- RESTful API design
- MongoDB and Mongoose
- Express.js middleware
- Tailwind CSS utility classes
- Async/await and promises
- Form handling and validation

## 🎓 For BCA Students

### Key Concepts Demonstrated

1. **Frontend-Backend Communication**
   - How React talks to Express API
   - HTTP methods (GET, POST, DELETE)
   - Handling async operations

2. **State Management**
   - React Context for global state
   - localStorage for persistence
   - Component state with useState

3. **Database Operations**
   - CRUD operations (Create, Read, Delete)
   - MongoDB queries with Mongoose
   - Data modeling and schemas

4. **Routing**
   - Client-side routing with React Router
   - Server-side routing with Express
   - Dynamic routes with parameters

5. **Modern CSS**
   - Utility-first approach with Tailwind
   - Responsive design
   - Flexbox and Grid layouts

## 📄 License

This is a learning project. Feel free to use and modify as needed.

## 🤝 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Verify all dependencies are installed
3. Make sure MongoDB is running
4. Check that both servers (frontend and backend) are running

---

**Happy Coding! 🚀**

Made with ❤️ for learning MERN stack development
