# ⚽ FutPool- Futbol - Friends Prediction Pools

A full-stack web application to create, join, and manage football tournaments, predict match scores, and track user performance in real-time.

---

## 🚀 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Auth & DB:** [Firebase Auth](https://firebase.google.com/products/auth) + [Cloud Firestore](https://firebase.google.com/products/firestore)
- **Backend:** [Spring Boot (Java)](https://spring.io/projects/spring-boot)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** Redux Toolkit
- **Routing:** Next.js App Router
- **APIs:** Football match data (via external football APIs)

---

## 📦 Features

- 🔐 Firebase Authentication (Google, Email/Password)
- 🏆 Create & Join Tournaments
- 📝 Make Predictions for Matches
- ✅ Auto-evaluate predictions after match end
- 📊 Real-time Scoreboard & Stats
- 📨 Join Request System with Approval Flow
- 📱 Mobile-Responsive Design with Burger Menu
- 🌐 Role-based views (Public Stats, Private Dashboards)

---

## 📁 Project Structure

```
/app/               # Next.js App Router
  /login
  /tournament
/components/        # Reusable UI components
/context/           # AuthContext (Firebase)
/hooks/             # Custom React Hooks (Firebase, API)
/services/          # Backend API services (fetchWithAuth, etc.)
/store/             # Redux store and slices
/pages/             # (Optional: legacy routes)
/spring-api/        # Spring Boot backend source (separate repo or folder)
```

---


## 📡 Backend (Spring Boot)

The backend should expose endpoints like:

- `GET /api/users/{uid}`
- `POST /api/users`
- `GET /api/tournament/get/{id}`
- `POST /api/tournament/create`
- `GET /api/matches`
- `POST /api/predictions`

> Configure CORS, JWT Firebase token verification, and connect to Firestore.

---

## 📲 Responsive UI Design

- Customizable colors with CSS variables in `tailwind.config.js`
- Burger menu for mobile view
- Top bar shows login/profile/logout based on auth state

---

## 🧪 Testing

- Unit tests with Jest and React Testing Library (WIP)
- Firebase Emulator Suite for local development (optional)

---

## ✅ TODO

- [ ] Add user notifications
- [ ] Add profile editing
- [ ] Real-time chat inside tournaments
- [ ] Add loading and error fallback states

---

## 📄 License

MIT License

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

---

## 🙌 Acknowledgements

- Firebase
- Spring Boot
- Football-Data.org API
- Tailwind CSS

