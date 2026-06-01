# 📋 Instruksionet per GitHub

## 🚀 Krijim i GitHub Repository

1. Shko ne https://github.com/new
2. Ploteso:
   - Repository name: `ecommerce-mern`
   - Description: `Full-stack E-Commerce application with MERN`
   - Choose public or private
   - Click "Create repository"

## 📤 Ngarkimi ne GitHub

### Me Command Line:

\`\`\`bash
# Hyr ne direktoriumin e projektit
cd c:\Users\User\Desktop\web\mern-ecommerce

# Inicijalizoj git
git init

# Shto te gjithe fajlat
git add .

# Krijo commit te pare
git commit -m "Initial commit: Full-stack MERN E-Commerce app"

# Shto remote repository (zevendeso YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-mern.git

# Shto branch master/main
git branch -M main

# Ngarko ne GitHub
git push -u origin main
\`\`\`

## 👥 Ndarje e Punes (nese eshte ne grup)

Nese po punohet ne grup, secili mund te marre nje gjenj:

- **Student 1**: Backend (Models, Controllers, Routes)
- **Student 2**: Backend (Config, Middleware, Database)
- **Student 3**: Frontend (Pages, Components)
- **Student 4**: Frontend (Redux, Services, Styling)

### Branches per ndarje pune:

\`\`\`bash
# Krijo branch-in
git checkout -b feature/student-name

# Pune lokale...

# Shto dhe commit
git add .
git commit -m "Add: feature description"

# Ngarko
git push -u origin feature/student-name

# Pastaj bej Pull Request ne GitHub
\`\`\`

## 📝 Commits te mire

Siguruhu qe secili commit ka nje mesazh te qarte:
- ✅ "Add: User authentication with JWT"
- ✅ "Fix: Product filtering bug"
- ✅ "Update: Cart calculation logic"
- ❌ "asdfgh"
- ❌ "fix stuff"

---

**Per prezantimin, siguro se te gjitha commitsat jane ne GitHub!**
