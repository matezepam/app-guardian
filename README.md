# 🌱 EcoGuardian

EcoGuardian es una aplicación web diseñada para ayudar a las personas a **medir, entender y reducir su impacto ambiental**, enfocándose en el **consumo de agua, energía eléctrica y uso de plásticos**.  
El objetivo principal es fomentar hábitos sostenibles mediante el registro y visualización de datos personales.

---

## 🚀 Características principales

- 💧 Registro y control del consumo de **agua**
- ⚡ Seguimiento del uso de **energía eléctrica**
- ♻️ Reducción y control del consumo de **plásticos**
- 👤 Sistema de **registro y autenticación de usuarios**
- 📊 Dashboard privado con información personalizada
- 🔐 Rutas protegidas para usuarios autenticados

---

## 🛠️ Tecnologías utilizadas

### Frontend
- React + Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- Context API (AuthContext)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)

---

## 📂 Estructura del proyecto

```txt
ecoguardian/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── auth.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
