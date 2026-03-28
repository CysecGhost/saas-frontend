# SaaS Admin Dashboard — Frontend

A React-based admin dashboard for managing products, orders, and analytics with role-based access control. Built with a focus on clean architecture and modern UI.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React + Vite | Frontend framework |
| TypeScript | Type safety |
| Redux Toolkit + RTK Query | State management + API layer |
| Tailwind CSS | Styling |
| Recharts | Analytics charts |
| React Router v7 | Routing + protected routes |
| React Hot Toast | Notifications |

## Features

**Authentication**
- JWT access + refresh token flow
- Access token in Redux + localStorage
- Refresh token in httpOnly cookie
- Automatic token refresh on 401 via RTK Query middleware

**Organization System**
- Multi-tenant support
- Org selection on login
- All requests scoped via `X-Org-Id` header
- Role stored per organization

**Products**
- Create, view, and manage products
- Stock and pricing management

**Orders**
- Create orders with product selection
- View, paginate, and filter by status
- Update order status (PENDING → COMPLETED / CANCELLED)

**Analytics**
- Total revenue, orders, and average order value
- Daily revenue and order trend charts
- Top selling products
- Date range filtering

**UI**
- Dark theme
- Skeleton loaders
- Toast notifications
- Fully responsive

## Getting Started
```bash
npm install
npm run dev
```

## Environment Variables
```env
VITE_API_URL=https://your-backend-url
```

## Project Structure
```
src/
├── components/    # Reusable UI components
├── pages/         # Route-level pages
├── slices/        # Redux + RTK Query slices
├── store.ts       # Redux store
└── App.tsx        # Root component
```

## Deployment

Deployed on Vercel with `VITE_API_URL` set to the Railway backend URL.
