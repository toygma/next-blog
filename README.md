# 🎯 Next.js Blog & Portfolio Platform

A beautiful and modern recruiting and portfolio platform built with **Next.js 15**, **Tailwind CSS**, and **PostgreSQL** — designed to connect talent with opportunity.

---

## 🚀 Features

### 🧑‍💼 Portfolio Functionality
- ✅ **User Authentication & Registration**  
- ✅ **Profile Management** with resume upload  
- ✅ **Create & Share Blog Posts**  
- ✅ **Showcase Projects** with images and descriptions  
- ✅ **Commenting System**  
- ✅ **Like System** for engagement  

### 🛠️ Technical Highlights
- ✅ Responsive UI powered by **Tailwind CSS**  
- ✅ Smooth **Framer Motion** animations  
- ✅ **Prisma ORM** with PostgreSQL for data modeling  
- ✅ RESTful **API Routes** using Next.js  
- ✅ Forms with **React Hook Form** & validation  
- ✅ Elegant **toast notifications** (React Hot Toast)  
- ✅ **Role-Based Access Control (RBAC)**  

---

## 🧰 Tech Stack

| Layer       | Technology                         |
|-------------|------------------------------------|
| Frontend    | Next.js 15, React 19, Tailwind CSS |
| Backend     | Next.js API Routes                 |
| Database    | PostgreSQL with Prisma ORM         |
| Auth        | Custom JWT-based authentication    |
| UI Kit      | ShadCN UI, Lucide React Icons      |
| Animations  | Framer Motion                      |
| Forms       | React Hook Form                    |
| Alerts      | React Hot Toast                    |

---

## 🧑‍💻 Getting Started

### 🔧 Prerequisites

- Node.js `v22+`
- PostgreSQL database

### 📦 Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd next-blog
```
# 2. Install dependencies
```bash
npm install
```
# 3. Configure environment variables
```bash
.env
```
Update .env with your credentials:
```bash
DATABASE_URL=""
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
CLERK_WEBHOOK_SIGNING_SECRET=""
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
SMTP_USERNAME=""
SMTP_PASSWORD=""
MAIL_RECEIVER_ADDRESS=""
```
🗃️ Database Setup

# Generate Prisma client
```bash
npx prisma generate
```
# Create tables in the database
```bash
npx prisma db push
```
# (Optional) Seed initial data
```bash
npx prisma db seed
```
🧪 Run the App
```bash
npm run dev
```
🧩 Database Models

- **User**: Authentication, roles, profile

- **Post**: Blog and portfolio content

- **Category**: Organizes posts by topic

### ✨ UI & UX
- Clean, modern design with **glassmorphism** & **gradient backgrounds**

- Smooth transitions, **micro-interactions** with **Framer Motion**

- Fully responsive design (desktop, tablet, mobile)

- Intuitive navigation and flows

### 🔍 Smart Job Matching (Future-ready)
- Advanced filtering & search

- Location-aware listings

- Skill & category-based matching

- Easy job posting flow for employers

### 🔐 Security & Performance
- Password hashing with bcrypt

- Robust input validation and sanitization

- Optimized Prisma queries

- Lazy image loading & SEO-friendly architecture

##  🚢 Deployment
###  🛠 PostgreSQL Setup
- Use Neon or other PostgreSQL providers.

- Add your DATABASE_URL to environment variables.

### Run:
```bash
npx prisma db push
```
### ☁️ Deploy to Vercel
- Push project to GitHub
- Connect the repo to Vercel
- Add all required environment variables via the Vercel dashboard
- Hit Deploy 🎉
