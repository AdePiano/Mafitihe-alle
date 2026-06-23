# Mafitihe Alle Hossana | ማፍጠሄ አለ ሆሳዕና

Local marketplace web application for Hossana, Central Ethiopia.

## Features
- 8 service categories: Car Rent, Car Sale, House Rent, House Sale, Land Sale, Wedding Suit, Sound Rent, Decoration, Makeup
- Bilingual UI: English & Amharic
- User accounts, listing management
- Admin panel for approving listings
- Payment options: Cash, Telebirr, CBE
- Image upload for listings

## Project Structure
```
mafitihe-alle/
├── backend/        Express.js API
├── frontend/       React app
└── README.md
```

## Setup Instructions

### 1. Database (PostgreSQL)
Create a PostgreSQL database and run:
```
psql -U youruser -d yourdb -f backend/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
cp .env.example .env
# Edit .env with REACT_APP_API_URL=http://localhost:5000/api
npm install
npm start
```

## Deploy on Railway

### Backend
1. Push to GitHub
2. Create new Railway project → Deploy from GitHub repo
3. Select the `backend` folder (or set Root Directory to `backend`)
4. Add environment variables:
   - `DATABASE_URL` (Railway provides PostgreSQL plugin)
   - `JWT_SECRET` (any long random string)
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your frontend URL)
5. Railway auto-detects Node.js and runs `npm start`

### Frontend
1. Create another Railway service → Deploy from same repo
2. Set Root Directory to `frontend`
3. Add environment variable:
   - `REACT_APP_API_URL=https://your-backend.railway.app/api`
4. Railway will build and serve the React app

### Default Admin Login
- Phone: `+251900000000`
- Password: `admin123`
- **Change this immediately after first login!**

## Tech Stack
- **Frontend**: React 18, React Router v6, Axios
- **Backend**: Node.js, Express.js, PostgreSQL
- **Auth**: JWT tokens
- **File upload**: Multer
- **Deployment**: Railway
