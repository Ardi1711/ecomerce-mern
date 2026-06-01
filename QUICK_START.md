

## 🧪 First Test: Registration

### Using Browser (Easiest)
1. Go to http://localhost:5000/register
2. Fill form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
3. Click "Register"
4. Check browser DevTools (F12):
   - Application → LocalStorage → token

**Expected:** Token saved ✅

---

## 🔑 Second Test: Login

### Using Browser
1. Go to http://localhost:5000/login
2. Enter:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Login"
4. Should redirect to homepage

**Expected:** Login successful ✅

---

## 📦 Third Test: Products (Postman/Insomnia)

### 1. Get All Products (Public - No Auth Needed)
```
GET http://localhost:5000/api/products
```

**Expected:**
```json
{
  "success": true,
  "count": 0,
  "products": []
}
```

---

### 2. Create Product (Requires JWT Token)
```
POST http://localhost:5000/api/products
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN_HERE

{
  "name": "Gaming Laptop",
  "description": "High-performance laptop for gaming",
  "price": 1299,
  "category": "Electronics",
  "stock": 5
}
```

**To get token:**
1. Use the one from login or registration
2. Find it in browser DevTools → Application → LocalStorage → token

**Expected:**
```json
{
  "success": true,
  "message": "Produkti u krijua me sukses!",
  "product": { ... }
}
```

---

### 3. Test Protected Route (Without Token)
```
DELETE http://localhost:5000/api/products/PRODUCT_ID
```
(No Authorization header)

**Expected:**
```json
{
  "success": false,
  "message": "Token nuk u gjet. Duhet te jesh i loguar!"
}
```

**Status:** 401 Unauthorized ✅

**Ready? Start here:**
1. `cd backend && npm run dev`
2. `cd frontend && npm start`
3. Register at http://localhost:5000/register
4. Test API endpoints with token ✅
