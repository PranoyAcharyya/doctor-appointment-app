# 🩺 Doctor Appointment App

A full-stack **Doctor Appointment & Teleconsultation Platform** where users can book appointments and connect with doctors via video calls.

Built using modern production-grade tools like **Next.js, Prisma, Neon DB, Clerk Auth, and Vonage Video API**.

---

## 🚀 Live Demo

👉 *Add your deployed link here*

https://pranoy-doctor-appoinemnt-site.vercel.app/

---

## ✨ Features

### 👤 Patient Features

* Browse doctors by specialization
* View detailed doctor profiles
* Book appointments with available time slots
* Secure authentication with Clerk
* Join **video consultation sessions**

---

### 👨‍⚕️ Doctor Features

* Manage availability & schedules
* View upcoming appointments
* Conduct video consultations with patients

---

### 📞 Teleconsultation

* Real-time video calls powered by **Vonage Video API**
* Secure session handling
* Low-latency communication

---

## 🛠️ Tech Stack

### 🚀 Frontend

* Next.js (App Router)
* React.js
* TypeScript
* Tailwind CSS
* shadcn/ui

---

### 🧠 Backend & Database

* Prisma ORM
* Neon DB (Serverless PostgreSQL)

---

### 🔐 Authentication

* Clerk (Authentication & User Management)

---

### 📡 Real-time Communication

* Vonage Video API

---

## ⚙️ Key Implementation Highlights

### 🔐 Authentication with Clerk

* Secure login/signup flows
* Session management handled by Clerk
* Protected routes using middleware

---

### 🗄️ Database with Prisma + Neon

* Type-safe database queries using Prisma ORM
* Serverless PostgreSQL via Neon
* Scalable and production-ready DB setup

---

### 📞 Video Calling Integration

* Integrated **Vonage Video API** for teleconsultation
* Handles session creation, token generation, and secure room joining

---

### 🔄 Dynamic Routing (Next.js)

* SEO-friendly routes: `/doctors/[specialty]/[id]`
* Enables scalable doctor listing and detail pages

---

### 🎨 UI System

* Built using **shadcn/ui + Tailwind CSS**
* Clean, accessible, and reusable components

---

## ⚡ Performance Considerations

* Client-side filtering/sorting may slow down with large datasets
* Can be improved with:

  * Server-side filtering using Prisma
  * Pagination
  * Caching

---

## 🔮 Future Improvements

* Payment integration (Stripe / Razorpay)
* Notification system (Email / SMS)
* Prescription management
* Admin dashboard
* Advanced scheduling logic

---

## 💡 Why This Project Matters

This project demonstrates:

* Full-stack development using modern production tools
* Real-world system design (appointment + telemedicine)
* Integration of authentication, database, and real-time APIs
* Scalable architecture using Next.js

---

## 🎯 Interview Talking Points

### ❓ Why Prisma + Neon?

* Prisma → type-safe ORM with great developer experience
* Neon → serverless Postgres with auto-scaling

---

### ❓ How does video calling work?

* Backend generates session and token using Vonage
* Frontend joins session using SDK
* Secure real-time connection is established

---

### ❓ Why Clerk for authentication?

* Handles auth complexity out-of-the-box
* Supports sessions, JWT, and OAuth
* Reduces development overhead

---

### ❓ How would you scale this system?

* Move filtering and sorting to database queries
* Add caching layer (Redis)
* Introduce background jobs for bookings
* Optimize database with indexing

---

