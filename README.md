# Customer Portal MVP

## Overview
This is a minimal Customer Portal POC built with Next.js (frontend) and Express.js (backend).  
It integrates with the ServiceM8 API to fetch real booking data and supports messaging, viewing booking details, and file attachments.

## Features
- Login via email and phone number
- List of bookings for the logged-in user
- View details of a specific booking
- View mock file attachments
- Send messages related to a booking (persisted in backend)

## Tech Stack
- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: Express.js, Axios, JWT
- API Integration: ServiceM8 API 
- Data Persistence: MongoDB

## Setup Instructions

### Prerequisites
- Node.js >= 20
- npm or yarn
- MongoDB (local or Atlas)

### Backend - package.json
```bash
  "scripts": {
    "start": "nodemon --watch src --ext ts --exec ts-node src/server.ts"
  },
```

### Backend
```bash
cd backend
npm install
npm start
```

### Start MongoDB locally (if using local MongoDB):
```bash
# Start MongoDB service
mongod --dbpath ./data/db

# OR using Docker
docker run -d -p 27017:27017 --name customer-portal-mongo mongo:latest
```
## Environment Variables
Create a `.env` file in the backend root:

```env
SERVICEM8=your_servicem8_api_key
MONGODB_URI=mongodb://localhost:27017/customer-portal
PORT=4000
JWT_SECRET=yoursecretkey
```

Express runs on http://localhost:4000 (can be changed)


Set SERVICE_M8_API_KEY in .env

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Next.js runs on http://localhost:3000

### Usage

Open the frontend URL.

Input dummy email & phone in db

Log in with a  email & phone.

Navigate bookings, view details, attachments, and messages.

### Notes

Messages are stored mongoDB

Attachments are mocked.

ServiceM8 integration demonstrates real API calls.

### Future Improvements

Add persistent database for attachments

File uploads/downloads for attachments

Pagination for bookings/messages

Improved error handling & notifications
