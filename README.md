# VoltMart – Modern Full-Stack Electronics E-Commerce Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-emerald?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

VoltMart is a production-grade, full-stack electronics e-commerce web application engineered with **Next.js 16 (App Router + Turbopack)**, **React 19**, **Supabase (PostgreSQL + RLS)**, **Tailwind CSS v4**, **TanStack Query v5**, and **TypeScript**.

The platform is purpose-built as a modern showcase for precision audio equipment, workspace computing peripherals, and smart wearable hardware.

---

## 🌐 Live Demo

- **Live URL**: [https://voltmart-ecommerce.vercel.app](https://voltmart-ecommerce.vercel.app)
- **Demo Account**: `demo.voltmart@gmail.com` / `VoltMartDemo2026!`

---

## ✨ Key Features

- 🎧 **Curated Electronics Catalog**: Categorized into *Audio & Sound*, *Computing & Workspace*, and *Smart Gear & Wearables* with real-time category filtering and dynamic search.
- 🔍 **Product Details & Technical Specifications**: High-resolution imagery, active rating breakdowns, inventory indicators, and comprehensive hardware spec sheets.
- 🛒 **Shopping Cart & Seamless Checkout**: Persistent cart storage, reactive quantity controls, item removal, and a frictionless transition to checkout.
- 🔐 **Secure Supabase Authentication**: Full authentication lifecycle including sign up, email sign in, password reset, and SSR cookie synchronization via @supabase/ssr.
- 📊 **User & Analytics Dashboard**: Real-time spending charts, order histories, status summaries, and interactive data visualization powered by Chart.js.
- 🛡️ **Role-Based Admin Controls**: Protected administrative views for product inventory management, order oversight, and customer permissions guarded by Supabase Row Level Security (RLS).
- ⚡ **Zero-Config Resilient Architecture**: Seamless fallback to an in-memory electronics catalog ensures all features run out of the box locally even before database credentials are linked.
- 📱 **Responsive & Accessible UI**: Fluid layouts across mobile, tablet, and desktop viewports with dark and light theme switching.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Server Components) |
| **UI Library** | [React 19](https://react.dev/), [shadcn/ui](https://ui.shadcn.com/), [Radix UI](https://www.radix-ui.com/) |
| **Styling & Theming** | [Tailwind CSS v4](https://tailwindcss.com/), [next-themes](https://github.com/pacocoursey/next-themes), [Lucide React](https://lucide.dev/) |
| **State & Data Fetching** | [TanStack Query v5](https://tanstack.com/query/latest), [TanStack Table](https://tanstack.com/table/latest) |
| **Form Handling & Validation** | [TanStack Form](https://tanstack.com/form/latest), [Zod](https://zod.dev/) |
| **Backend & Database** | [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Auth, Storage) |
| **Analytics & Visuals** | [Chart.js](https://www.chartjs.org/), [React-ChartJS-2](https://react-chartjs-2.js.org/), [Motion](https://motion.dev/) |
| **Language & Tooling** | [TypeScript](https://www.typescriptlang.org/), [ESLint 9](https://eslint.org/), [Prettier](https://prettier.io/) |

---

## 📸 Screenshots

### 1. Storefront & Featured Flagship Hardware
> *Modern hero section featuring the flagship electronics collection and category discovery.*
`
+-----------------------------------------------------------------------------------+
|  [V] VoltMart   Audio & Sound   Computing   Smart Gear              [Search]  🛒  |
|-----------------------------------------------------------------------------------|
|                                                                                   |
|   New 2026 Hardware Series                                                        |
|   Precision Electronics for the Modern Workspace                                  |
|   [ Browse All Products ]  [ Explore Audio ]                                      |
|                                                                                   |
|   ================ Featured Audio & Computing Gear ===============                |
|   [ AeroPulse Headphones ]   [ Pro Mechanical Keyboard ]   [ 4K Curved Display ]  |
+-----------------------------------------------------------------------------------+
`

### 2. Product Specifications & Detail Views
> *Detailed product pages featuring customer reviews, stock indicators, and hardware spec tables.*

### 3. Shopping Cart & Guest Flow
> *Responsive sliding cart and dedicated checkout workflow with guest preservation.*

---

## 🚀 Local Setup & Installation

### Prerequisites
- **Node.js**: v20.x or higher
- **npm**: v9.x or higher
- **Git**

### 1. Clone the Repository
`ash
git clone https://github.com/DuHieu/voltmart-ecommerce.git
cd voltmart-ecommerce
`

### 2. Install Dependencies
`ash
npm install
`

### 3. Configure Environment Variables
Copy the template .env.example into a local configuration file:
`ash
cp .env.example .env.local
`

Populate the required keys in .env.local:
`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Polar Payment Configuration (Optional)
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_polar_webhook_secret
POLAR_PRODUCT_ID=your_polar_product_id
POLAR_ORG_ID=your_polar_org_id
`

> **Note**: If you run the project without Supabase credentials, VoltMart automatically activates its built-in fallback catalog so you can still preview and test all store views locally without errors.

---

## 🗄️ Supabase Database Setup

To link your own Supabase instance:

1. Create a new project in [Supabase](https://supabase.com/).
2. In the Supabase Dashboard, navigate to the **SQL Editor**.
3. Copy and run the entire SQL script from [supabase/seed.sql](./supabase/seed.sql):
   - Sets up table schemas (products, categories, orders, profiles, eviews, cart).
   - Configures Row Level Security (RLS) policies.
   - Populates the 12 curated electronics products and categories.
4. Retrieve your **Project URL** and **anon public key** from Project Settings > API and paste them into .env.local.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| 
pm run dev | Starts the Next.js development server with Turbopack on http://localhost:3000 |
| 
pm run build | Compiles an optimized production build of the application |
| 
pm run start | Boots the production server |
| 
pm run lint | Analyzes code quality using ESLint |
| 
px tsc --noEmit | Runs full TypeScript static type checking |
| 
pm run precommit | Runs both 
pm run lint and 
pm run build as a pre-commit quality gate |

---

## 🔒 Security & Deployment Checklist

- [x] Environment variables isolated via .env.local (excluded from git tracking).
- [x] Row Level Security (RLS) enforced across all database tables.
- [x] Sensitive payments handled server-side through protected API webhooks.
- [x] Client-safe Supabase anon key configured with zero private role escalation.
- [x] Clean static generation and dynamic route rendering.

---

## 📄 License & Attribution

This project is licensed under the [MIT License](./LICENSE).

- Architecture and original open-source base by [tarektech](https://github.com/tarektech/ecommerce-supabase-Nextjs).
- Transformed, branded, and maintained by [Dư Hiếu](https://github.com/DuHieu) as the **VoltMart** portfolio project.
