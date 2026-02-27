# 🛍 Product Discovery with AI Assist

A mini full-stack product discovery application with an AI-powered natural language search using Google Gemini.

Live Demo:

- 🌐 Frontend: https://discvr-project-octo.vercel.app/
- 🚀 Backend API: https://discvr-project-octo.onrender.com/api/products

---

## 📌 Project Overview

This project demonstrates:

- Backend API with product catalog
- AI-powered natural language search
- Structured LLM response parsing
- React frontend consuming REST APIs
- End-to-end working flow

User can:
- Browse all products
- Ask natural-language queries like:
  - "budget laptops"
  - "gaming under 80000"
- See AI-filtered products with a short summary

---

## 🧠 Tech Stack

### Backend
- Node.js
- Express.js
- Google Gemini API (`@google/generative-ai`)
- Mock product data (JSON/in-memory)

### Frontend
- React (Vite)
- Axios
- Basic inline styling

---

## ⚙️ API Endpoints

### 1️⃣ GET `/api/products`

Returns all products.

Supports optional filters:
- `?category=`
- `?q=` (search in name, description, tags)
