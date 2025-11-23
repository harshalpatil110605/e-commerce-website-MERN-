# 🔐 Authentication System Setup Guide

## ✅ Authentication Features Added!

आपके e-commerce app में अब **complete authentication system** है:

### 🎯 Features:

1. **User Signup** - नए users account बना सकते हैं
2. **User Login** - Existing users login कर सकते हैं
3. **Admin Login** - Separate admin login page
4. **Protected Admin Panel** - बिना login के admin page access नहीं हो सकता
5. **User Info in Navbar** - Logged in user का name दिखता है
6. **Logout** - Users logout कर सकते हैं

---

## 🚀 Setup Steps

### Step 1: Admin Account Create करें

```powershell
# Backend folder में जाएं
cd C:\Users\harshal\OneDrive\Desktop\11\backend

# Admin account create करें
npm run seed-admin
```

**Output:**
```
✅ Admin account created successfully!

📋 Admin Credentials:
📧 Email: admin@luxehome.com
🔑 Password: admin123
```

### Step 2: Backend Server Start करें

```powershell
# Backend में (same terminal)
npm run dev
```

### Step 3: Frontend Server Start करें

```powershell
# नई terminal खोलें
cd C:\Users\harshal\OneDrive\Desktop\11\frontend
npm run dev
```

---

## 📱 How to Use

### 👤 User Signup/Login:

1. **Signup:**
   - Navbar में "Sign Up" button click करें
   - या directly जाएं: `http://localhost:3000/signup`
   - Name, Email, Password fill करें
   - Account बन जाएगा और automatically login हो जाएंगे

2. **Login:**
   - Navbar में "Login" button click करें
   - या directly जाएं: `http://localhost:3000/login`
   - Email और Password enter करें
   - Login हो जाएंगे

3. **After Login:**
   - Navbar में आपका name दिखेगा
   - "Logout" button से logout कर सकते हैं

### 🔐 Admin Login:

1. **Admin Login Page:**
   - जाएं: `http://localhost:3000/admin/login`
   - या Login page से "Admin Login →" link click करें

2. **Default Admin Credentials:**
   ```
   Email: admin@luxehome.com
   Password: admin123
   ```

3. **After Admin Login:**
   - Automatically `/admin` page पर redirect होंगे
   - Products manage कर सकते हैं (add/delete)
   - Navbar में "admin" role दिखेगा

4. **Admin Panel Access:**
   - बिना admin login के `/admin` page access नहीं हो सकता
   - Automatically `/admin/login` पर redirect होगा

---

## 🎨 Pages Added:

1. **`/login`** - User login page
2. **`/signup`** - User signup page
3. **`/admin/login`** - Admin login page (special dark theme)

---

## 🔒 Security Features:

### Protected Routes:
- ✅ `/admin` page केवल admin users के लिए
- ✅ Non-admin users को home page पर redirect
- ✅ Not logged in users को admin login पर redirect

### Data Persistence:
- ✅ User data localStorage में save होता है
- ✅ Page refresh के बाद भी logged in रहते हैं
- ✅ Logout करने पर data clear हो जाता है

---

## 📊 Database Collections:

### Products Collection:
- सभी products की information

### Users Collection (NEW):
- User accounts
- Admin accounts
- Fields: name, email, password, role

---

## 🧪 Testing:

### Test User Flow:

1. **Signup:**
   ```
   Name: Test User
   Email: test@example.com
   Password: test123
   ```

2. **Login:**
   ```
   Email: test@example.com
   Password: test123
   ```

3. **Try Admin Access:**
   - `/admin` पर जाएं
   - Redirect होगा क्योंकि normal user है

### Test Admin Flow:

1. **Admin Login:**
   ```
   Email: admin@luxehome.com
   Password: admin123
   ```

2. **Access Admin Panel:**
   - `/admin` page access हो जाएगा
   - Products add/delete कर सकते हैं

---

## 🎯 API Endpoints (NEW):

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | User signup |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/admin/login` | Admin login |
| GET | `/api/auth/verify/:userId` | Verify user |

---

## 📝 MongoDB Compass में देखें:

1. **Compass खोलें**
2. **`ecommerce_db` database** में जाएं
3. **Collections:**
   - `products` - सभी products
   - `users` - सभी users और admin

4. **Users Collection में:**
   - Admin account दिखेगा
   - Signup किए हुए users दिखेंगे

---

## 🔧 Customization:

### Change Admin Credentials:

MongoDB Compass में:
1. `users` collection खोलें
2. Admin document find करें (role: "admin")
3. Email/Password edit करें

या नया admin बनाएं:
```javascript
{
  "name": "New Admin",
  "email": "newadmin@luxehome.com",
  "password": "newpass123",
  "role": "admin"
}
```

---

## ⚠️ Important Notes:

### Security (For Production):
- ⚠️ **Passwords plain text में store हो रहे हैं** (learning purpose)
- Production में **bcrypt** use करें password hashing के लिए
- **JWT tokens** use करें authentication के लिए
- **HTTPS** use करें

### Current Implementation:
- ✅ Simple और समझने में आसान
- ✅ BCA students के लिए perfect
- ✅ सभी features working हैं
- ⚠️ Production-ready नहीं है

---

## 🎉 Complete Flow:

```
1. User Signup → Account Created → Auto Login → Home Page
2. User Login → Verify → Home Page (with name in navbar)
3. Admin Login → Verify Role → Admin Panel Access
4. Logout → Clear Data → Back to Guest Mode
```

---

## 🚀 Quick Start Commands:

```powershell
# Terminal 1 - Backend
cd backend
npm run seed-admin    # First time only
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

---

## 📞 Default Accounts:

### Admin:
```
Email: admin@luxehome.com
Password: admin123
Role: admin
```

### Test User (Create via Signup):
```
Name: Your Name
Email: your@email.com
Password: yourpass123
Role: user (automatic)
```

---

**Authentication System Successfully Added! 🎉**

अब आपका app में:
- ✅ User signup/login
- ✅ Admin login
- ✅ Protected admin panel
- ✅ User info in navbar
- ✅ Logout functionality

सब कुछ working है! 🚀
