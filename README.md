# 🛍️ E-Commerce MERN Full-Stack Application

Ky eshte nje aplikacion full-stack E-Commerce i ndertuar me **MERN** (MongoDB, Express, React, Node.js) i cili ofron:

## ✨ Karakteristikat Kryesore

### 🔐 Autentifikimi & Siguria
- ✅ Register dhe Login me JWT Token
- ✅ Enkriptimi i fjalekalimeve me bcrypt + salt
- ✅ Middleware per mbrojtje te rrugeve

### 📦 Menaxhimi i Produkteve
- ✅ CRUD Operations (Create, Read, Update, Delete)
- ✅ Kategorizim i produkteve
- ✅ Filtrimi dhe kerkimi
- ✅ Sistem rating dhe reviews

### 🛒 Menaxhimi i Shportes
- ✅ Shto/Hiqe produktet
- ✅ Perditeso sasine
- ✅ Persistim ne localStorage
- ✅ Redux Toolkit per state management

### 📋 Porosite
- ✅ Krijim te porosive
- ✅ Ndjekja e porosive
- ✅ Ndryshim statusi
- ✅ Llogaritje automatike e totalit

### 🏪 Frontend Features
- ✅ React Hooks (useState, useEffect, useContext)
- ✅ React Router para navigimin
- ✅ Redux Toolkit + RTK Query per API
- ✅ Tailwind CSS per styling



---

## 📁 Struktura e Projektit

\`\`\`
mern-ecommerce/
├── backend/
│   ├── config/
│   │   ├── database.js       # 🗄️ Lidhja MongoDB
│   │   └── jwtConfig.js      # 🔐 JWT konfigurimi
│   ├── models/
│   │   ├── User.js           # 👤 Modeli perdoruesit
│   │   ├── Product.js        # 📦 Modeli produktit
│   │   └── Order.js          # 🛒 Modeli porosite
│   ├── controllers/
│   │   ├── authController.js    # 🔐 Autentifikimi
│   │   ├── productController.js # 📦 Produktet
│   │   └── orderController.js   # 🛒 Porosite
│   ├── routes/
│   │   ├── authRoutes.js        # 🔐 Rrutat e auth
│   │   ├── productRoutes.js     # 📦 Rrutat e produkteve
│   │   ├── orderRoutes.js       # 🛒 Rrutat e porosive
│   │   └── userRoutes.js        # 👤 Rrutat e users
│   ├── middleware/
│   │   └── authMiddleware.js    # 🛡️ Mbrojtja e rrugeve
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── NavBar.js           # 📌 Navigimi
    │   ├── pages/
    │   │   ├── ProductsPage.js     # 📦 Produktet
    │   │   ├── CartPage.js         # 🛒 Shporta
    │   │   ├── LoginPage.js        # 🔓 Login
    │   │   └── RegisterPage.js     # 📝 Register
    │   ├── redux/
    │   │   ├── store.js            # 🏪 Redux store
    │   │   ├── authSlice.js        # 🔐 Auth state
    │   │   └── cartSlice.js        # 🛒 Cart state
    │   ├── services/
    │   │   └── apiSlice.js         # 🌐 RTK Query API
    │   ├── App.js
    │   └── index.js
    ├── public/
    │   └── index.html
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
\`\`\`

---

## 🔌 API ENDPOINTS

### 🔐 Autentifikimi
- \`POST /api/auth/register\`    - Regjistrim
- \`POST /api/auth/login\`       - Login
- \`GET /api/auth/profile\`      - Profili (me token)

### 📦 Produktet
- \`GET /api/products\`          - Te gjithe produktet
- \`GET /api/products/:id\`      - Produkt sipas ID
- \`POST /api/products\`         - Krijo produkt (me token)
- \`PUT /api/products/:id\`      - Perditeso produktin (me token)
- \`DELETE /api/products/:id\`   - Fshij produktin (me token)

### 🛒 Porosite
- \`POST /api/orders\`           - Krijo porosi (me token)
- \`GET /api/orders\`            - Porosite e perdoruesit (me token)
- \`GET /api/orders/:id\`        - Porosi sipas ID (me token)
- \`PUT /api/orders/:id\`        - Perditeso statusin (me token)

---

## 📝 PLACEHOLDER-AT QE DUHEN NDRYSHUAR

### Backend:
1. **database.js** - MONGODB_URI (connection string)
2. **server.js** - PORT (porta e serverit)
3. **.env.example** - JWT_SECRET (sekreti unik)

### Frontend:
1. **apiSlice.js** - API_BASE_URL (URL e serverit)

---

## 🛠️ TEKONOLOHITe E PeRDORURA

### Backend:
- **Express.js** - Server framework
- **MongoDB + Mongoose** - Database
- **bcryptjs** - Enkriptimi i passwordeve
- **jsonwebtoken** - JWT autentifikimi
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Variabla mjedisore

### Frontend:
- **React 18** - UI library
- **React Router** - Navigimi
- **Redux Toolkit** - State management
- **RTK Query** - API management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

---




