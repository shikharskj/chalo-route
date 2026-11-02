# 🚌 Chalo Route Manager

**A bus-route management app. Create routes with ordered stops and see them drawn on an interactive map as a polyline.**

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![MUI](https://img.shields.io/badge/Material_UI-007FFF?style=flat-square&logo=mui&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white)

## ✨ Features
- **Create routes** with a name, direction (**UP / DOWN**), status (**Active / Inactive**), and a dynamic list of **stops** with latitude and longitude (add or remove rows)
- **View all routes** in a Material UI table, with a delete action
- **Map view** built on **Leaflet / React-Leaflet**: each stop is a marker, and the route is connected with a **polyline**
- Routes are saved in **localStorage**, so data survives a page refresh with no backend

## 🛠️ Tech Stack
React · React Router · Material UI · Leaflet + React-Leaflet · localStorage

## 🚀 Getting Started
```bash
npm install
npm start   # http://localhost:3000
```

## 📂 Structure
```
src/
├── components/Layout.js
└── pages/
    ├── CreateRoutes.js   # route form with dynamic stops
    └── ViewRoutes.js     # routes table + map with markers and polyline
```

---
Made by [Shikhar Jaiswal](https://github.com/shikharskj)
