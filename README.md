# 🌱 Guardian

**Guardian** es una aplicación web diseñada para ayudar a las personas a **medir, entender y reducir su impacto ambiental**, enfocándose en el **consumo de agua, energía eléctrica y uso de plásticos**.  
El objetivo principal es fomentar hábitos sostenibles mediante el registro y visualización de datos personales.

---

## 🚀 Características principales

- 💧 Registro y control del consumo de **agua**
- ⚡ Seguimiento del uso de **energía eléctrica**
- ♻️ Reducción y control del consumo de **plásticos**
- 👤 Sistema de **registro y autenticación de usuarios**
- 📊 Dashboard privado con información personalizada
- 🎮 Mini-juego de reciclaje y ranking de usuarios
- 🔐 Rutas protegidas para usuarios autenticados
- 🖼️ Subida y gestión de **avatares de perfil**
- 📑 Visualización de **impacto ambiental y reportes personales**

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
- PostgreSQL
- Sequelize
- JWT (JSON Web Tokens)
- Multer (para subida de avatares)

---

## 💻 Estructura del proyecto

```txt
app-guardian/
├── frontend/
│   ├── public/
│   │   └── logo-guardian.png
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── loaders/
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── FullScreenLoader.jsx
│   │   │   ├── profile/
│   │   │   │   └── ProfileMenu.jsx
│   │   │   ├── buttons/
│   │   │   │   ├── ReadMoreButton.jsx
│   │   │   │   └── PrimaryButton.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── SmartConsumptionForm.jsx
│   │   │   │   └── ConsumptionAlert.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tips/
│   │   │   │   ├── tipsData.js
│   │   │   │   └── TipPost.jsx
│   │   │   ├── TipDetail/
│   │   │   │   ├── tipDetailData.js
│   │   │   │   └── TipDetail.jsx
│   │   │   ├── RecyclingGame/
│   │   │   │   ├── RecyclingGame.jsx
│   │   │   │   ├── items.js
│   │   │   │   ├── Leaderboard.jsx
│   │   │   │   └── LeaderboardPage.jsx
│   │   │   ├── Impact/
│   │   │   │   ├── ImpactPost.jsx
│   │   │   │   └── ImpactData.js
│   │   │   ├── Profile/
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── ProfileHeader.jsx
│   │   │   │   ├── AvatarUploader.jsx
│   │   │   │   ├── Reports.jsx
│   │   │   │   └── Settings.jsx
│   │   │   ├── Tips.jsx
│   │   │   ├── TipsPost.jsx
│   │   │   └── Impact.jsx
│   │   ├── utils/
│   │   │   ├── cn.js
│   │   │   └── api.js
│   │   ├── constants/
│   │   │   └── consumptionOptions.js
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Expense.js
│   │   └── ExpensePG.js
│   ├── controllers/
│   │   ├── user.controller.js
│   │   └── reports.controller.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   ├── expenses.js
│   │   ├── expensesPG.js
│   │   └── reports.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── uploadAvatar.js
│   ├── db/
│   │   └── postgres.js
│   ├── uploads/
│   │   └── avatars/
│   │       └── undefined.png
│   ├── index.js
│   ├── package.json
│   ├── .env
│   └── createTestUser.js
├── LICENSE
├── README.md
└── .gitignore
```