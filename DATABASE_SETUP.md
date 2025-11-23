# 🗄️ MongoDB Database Setup Guide - Step by Step

## विकल्प 1: Local MongoDB (सबसे आसान - Recommended)

### Step 1: MongoDB Install करें

#### अगर MongoDB installed नहीं है:

1. **MongoDB Download करें:**
   - Website: https://www.mongodb.com/try/download/community
   - Windows के लिए: "MongoDB Community Server" download करें
   - Latest version select करें

2. **Install करें:**
   - Downloaded file को run करें
   - "Complete" installation चुनें
   - "Install MongoDB as a Service" को checked रखें
   - "Install MongoDB Compass" को भी checked रखें (GUI tool)

3. **Installation Verify करें:**
   ```powershell
   mongod --version
   ```
   अगर version दिखे तो MongoDB installed है ✅

### Step 2: MongoDB Service Start करें

#### Windows पर:

**Option A: Services से**
1. `Win + R` press करें
2. `services.msc` type करें और Enter
3. "MongoDB" service को find करें
4. Right-click → "Start" (अगर stopped हो)
5. Status "Running" होना चाहिए ✅

**Option B: Command Line से**
```powershell
# Administrator mode में PowerShell खोलें
net start MongoDB
```

### Step 3: MongoDB Compass Install करें (अगर नहीं है)

1. **Download:**
   - https://www.mongodb.com/try/download/compass
   - Windows version download करें

2. **Install:**
   - Downloaded file run करें
   - Simple installation, Next-Next करें

3. **Open करें:**
   - MongoDB Compass application खोलें

### Step 4: MongoDB Compass में Connect करें

1. **Compass खोलें**

2. **Connection String डालें:**
   ```
   mongodb://127.0.0.1:27017/
   ```
   या
   ```
   mongodb://localhost:27017/
   ```

3. **"Connect" button** click करें

4. **अगर connect हो गया:**
   - Left side में databases की list दिखेगी
   - ✅ MongoDB running है!

### Step 5: Database Seed करें (Products Add करें)

अब terminal में जाएं:

```powershell
# Backend folder में जाएं
cd C:\Users\harshal\OneDrive\Desktop\11\backend

# Seed script run करें
npm run seed
```

**आपको ये output दिखना चाहिए:**
```
✅ Connected to MongoDB
🗑️  Cleared existing products
✨ Successfully seeded 15 products!

📦 Sample products added:
   - Luxury Velvet Sofa ($2499.99)
   - Marble Coffee Table ($899.99)
   - Crystal Chandelier ($1299.99)
   - Minimalist Floor Lamp ($349.99)
   - Handwoven Wall Tapestry ($189.99)
   ... and 10 more!
```

### Step 6: Compass में Database Verify करें

1. **MongoDB Compass में जाएं**

2. **Left side में databases देखें:**
   - `ecommerce_db` नाम का database दिखना चाहिए

3. **Database expand करें:**
   - `ecommerce_db` पर click करें
   - `products` collection दिखेगा

4. **Products देखें:**
   - `products` collection पर click करें
   - 15 products की list दिखनी चाहिए
   - हर product की details देख सकते हैं

5. **Data Explore करें:**
   - किसी product पर click करें
   - JSON format में सारी details दिखेंगी:
     ```json
     {
       "_id": "...",
       "name": "Luxury Velvet Sofa",
       "price": 2499.99,
       "category": "Furniture",
       "images": [...],
       "stock": 12,
       "rating": 4.8,
       ...
     }
     ```

---

## विकल्प 2: MongoDB Atlas (Cloud Database)

अगर local MongoDB में problem हो तो cloud database use कर सकते हैं:

### Step 1: MongoDB Atlas Account बनाएं

1. **Website खोलें:**
   - https://www.mongodb.com/cloud/atlas/register

2. **Sign Up करें:**
   - Email से account बनाएं
   - Free tier select करें (M0 Sandbox)

### Step 2: Cluster Create करें

1. **"Create a Cluster" click करें**

2. **Settings:**
   - Cloud Provider: AWS (या कोई भी)
   - Region: Mumbai या nearest
   - Cluster Tier: M0 Sandbox (FREE)
   - Cluster Name: कुछ भी (जैसे "ecommerce-cluster")

3. **"Create Cluster" click करें**
   - 3-5 minutes wait करें

### Step 3: Database User बनाएं

1. **Security → Database Access**

2. **"Add New Database User" click करें**

3. **Details fill करें:**
   - Username: `admin` (या कुछ भी)
   - Password: strong password (save कर लें!)
   - Database User Privileges: "Read and write to any database"

4. **"Add User" click करें**

### Step 4: Network Access Allow करें

1. **Security → Network Access**

2. **"Add IP Address" click करें**

3. **"Allow Access from Anywhere" select करें**
   - IP: `0.0.0.0/0` (development के लिए)

4. **"Confirm" click करें**

### Step 5: Connection String Copy करें

1. **Database → Connect**

2. **"Connect your application" select करें**

3. **Driver: Node.js, Version: 5.5 or later**

4. **Connection string copy करें:**
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

5. **`<password>` को अपने actual password से replace करें**

### Step 6: Backend में Connection String Update करें

```powershell
# backend/.env file खोलें
```

**पुराना:**
```env
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce_db
```

**नया (Atlas):**
```env
MONGODB_URI=mongodb+srv://admin:yourpassword@cluster0.xxxxx.mongodb.net/ecommerce_db?retryWrites=true&w=majority
```

### Step 7: Database Seed करें

```powershell
cd backend
npm run seed
```

### Step 8: Atlas में Verify करें

1. **Atlas Dashboard → Database → Browse Collections**
2. **`ecommerce_db` database दिखेगा**
3. **`products` collection में 15 items होंगे**

---

## ✅ Verification Checklist

Database सही से setup हुआ है या नहीं, ये check करें:

### 1. MongoDB Running है?

**Local:**
```powershell
# PowerShell में
Get-Service MongoDB
```
Status: Running होना चाहिए ✅

**Atlas:**
- Dashboard में cluster "Active" होना चाहिए ✅

### 2. Connection Working है?

**Test करें:**
```powershell
cd backend
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('✅ Connected!')).catch(err => console.log('❌ Error:', err.message));"
```

### 3. Database Exist करता है?

**Compass में:**
- `ecommerce_db` database दिखना चाहिए ✅

**Atlas में:**
- Browse Collections में database दिखना चाहिए ✅

### 4. Products Seeded हैं?

**Compass/Atlas में:**
- `products` collection में 15 documents होने चाहिए ✅

### 5. Backend Connect हो रहा है?

```powershell
cd backend
npm run dev
```

**Output में ये दिखना चाहिए:**
```
✅ MongoDB Connected: 127.0.0.1
📊 Database Name: ecommerce_db
```

---

## 🔧 Common Problems & Solutions

### Problem 1: "MongoDB service not found"

**Solution:**
```powershell
# MongoDB reinstall करें या
# Services में manually start करें
```

### Problem 2: "Connection refused"

**Solution:**
```powershell
# Check if MongoDB running है
Get-Service MongoDB

# अगर stopped है तो start करें
net start MongoDB
```

### Problem 3: "Authentication failed" (Atlas)

**Solution:**
- Username/password check करें
- Connection string में password सही है?
- Special characters को URL encode करें

### Problem 4: "Database not created"

**Solution:**
```powershell
# Seed script फिर से run करें
cd backend
npm run seed
```

### Problem 5: Compass में connect नहीं हो रहा

**Solution:**
```
# Different connection strings try करें:
mongodb://localhost:27017/
mongodb://127.0.0.1:27017/
mongodb://localhost:27017/?directConnection=true
```

---

## 📝 Quick Commands Reference

### MongoDB Service Commands (Windows)

```powershell
# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Check status
Get-Service MongoDB
```

### Database Commands

```powershell
# Seed database
cd backend
npm run seed

# Start backend (connects to DB)
npm run dev
```

### Compass Connection Strings

```
Local: mongodb://127.0.0.1:27017/
Atlas: mongodb+srv://username:password@cluster.mongodb.net/
```

---

## 🎯 Final Check

Database setup successful है अगर:

✅ MongoDB service running है
✅ Compass में connect हो गया
✅ `ecommerce_db` database exist करता है
✅ `products` collection में 15 items हैं
✅ Backend server connect हो रहा है
✅ Console में "MongoDB Connected" दिख रहा है

---

## 📞 अगर फिर भी Problem हो?

1. **MongoDB reinstall करें** (fresh start)
2. **Atlas use करें** (cloud, easier)
3. **Error message screenshot लें** और check करें
4. **Firewall/Antivirus** temporarily disable करके try करें

---

**Database setup के बाद next step:**
```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Happy Coding! 🚀
