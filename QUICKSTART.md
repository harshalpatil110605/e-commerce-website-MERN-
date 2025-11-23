# 🚀 Quick Start Guide - LuxeHome E-Commerce

## सबसे पहले ये करें (First Time Setup)

### 1. MongoDB चालू करें (Start MongoDB)

MongoDB आपके computer पर installed होना चाहिए और running होना चाहिए।

**Windows पर check करें:**
- Services में जाकर "MongoDB" service running है या नहीं देखें
- या MongoDB Compass open करके connection test करें

### 2. Backend Setup

```powershell
# Backend folder में जाएं
cd backend

# Dependencies install करें (पहली बार only)
npm install

# Database में sample products add करें
npm run seed

# Backend server start करें
npm run dev
```

**आपको ये दिखना चाहिए:**
```
🚀 Server is running on port 5000
✅ MongoDB Connected: 127.0.0.1
📊 Database Name: ecommerce_db
```

### 3. MongoDB Compass में Database देखें

1. **MongoDB Compass** open करें
2. Connection string डालें: `mongodb://127.0.0.1:27017/`
3. **Connect** button click करें
4. Left side में **ecommerce_db** database दिखेगा
5. उसके अंदर **products** collection में 15 products होंगे

### 4. Frontend Setup

**नई terminal window खोलें:**

```powershell
# Frontend folder में जाएं
cd frontend

# Dependencies install करें (पहली बार only)
npm install

# Frontend server start करें
npm run dev
```

**Browser automatically खुलेगा:** `http://localhost:3000`

## ✅ अब क्या करें? (What to do now?)

### Website को Test करें:

1. **Home Page** - Hero section और featured products देखें
2. **Shop Page** - सभी 15 products देखें
3. **Filters** - Category और price से filter करें
4. **Product Detail** - किसी product पर click करें
5. **Add to Cart** - कुछ products cart में add करें
6. **Cart Page** - Cart icon पर click करें
7. **Checkout** - "Proceed to Checkout" click करें
8. **Order** - Form fill करके order place करें
9. **Admin Page** - `/admin` पर जाएं और products manage करें

### MongoDB Compass में Data देखें:

1. Compass में **ecommerce_db** → **products** collection open करें
2. सभी products की details देख सकते हैं
3. किसी product को edit/delete भी कर सकते हैं

## 🔄 रोज़ाना कैसे Start करें (Daily Startup)

### हर बार जब काम करना हो:

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

**दोनों servers running रखें!**

## 🛑 कैसे बंद करें (How to Stop)

- दोनों terminals में `Ctrl + C` press करें
- MongoDB service running रहने दें (अगली बार के लिए)

## ❗ Common Problems और Solutions

### Problem 1: "Cannot connect to MongoDB"

**Solution:**
- MongoDB service running है check करें
- MongoDB Compass में manually connect करके test करें
- Connection string check करें: `mongodb://127.0.0.1:27017/ecommerce_db`

### Problem 2: "Port 5000 already in use"

**Solution:**
```powershell
# backend/.env में PORT change करें
PORT=5001

# frontend/.env में भी update करें
VITE_API_URL=http://localhost:5001/api
```

### Problem 3: "Products not loading"

**Solution:**
1. Backend server running है check करें
2. Browser console में errors देखें (F12 press करें)
3. `http://localhost:5000/api/products` browser में खोलें - JSON data दिखना चाहिए

### Problem 4: "npm install" में error

**Solution:**
```powershell
# Cache clear करें
npm cache clean --force

# फिर से install करें
npm install
```

## 📁 Important Files

### Backend:
- `server.js` - Main server file
- `models/Product.js` - Product schema
- `routes/productRoutes.js` - API routes
- `.env` - Environment variables (MongoDB connection)

### Frontend:
- `src/App.jsx` - Main app with routes
- `src/context/CartContext.jsx` - Cart management
- `src/pages/` - All pages
- `src/components/` - Reusable components

## 🎯 Features to Test

✅ Home page with hero section
✅ Product listing with filters
✅ Product detail page
✅ Add to cart functionality
✅ Cart persists on page refresh
✅ Checkout process
✅ Order success page
✅ Admin panel (add/delete products)
✅ Responsive design (mobile friendly)

## 📞 Need Help?

1. README.md पढ़ें - detailed instructions हैं
2. Code में comments पढ़ें - हर function explain किया गया है
3. Browser console check करें - errors वहां दिखते हैं

---

**Happy Coding! 🎉**

अगर सब कुछ सही से चल रहा है तो आपको एक beautiful, working e-commerce website दिखनी चाहिए!
