# Full-Stack Web Application (Authentication + Dashboard + CRUD)

This project is built as part of the **Frontend Developer Intern Assignment**.  
It includes a complete authentication flow, a protected dashboard, and full CRUD operations with a scalable backend.

---

##  Tech Stack

### **Frontend**
- Next.js (App Router)
- React.js
- TailwindCSS
- Axios
- React Hook Form

### **Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT Authentication
- Bcrypt Password Hashing

---

## Features

### **Authentication**
- Signup with validation  
- Login with JWT token  
- Secure protected routes  
- Logout  

### **Dashboard**
- User profile view  
- Add tasks  
- Mark task completed  
- Delete tasks  
- Auto-refresh UI  
- Fully responsive UI  

### **Backend API**
- `/auth/signup`
- `/auth/login`
- `/user/profile` (protected)
- `/tasks` CRUD (protected)

---

## Folder Structure

frontend-backend-app/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── middleware/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── db.js
│ │ └── server.js
│ └── package.json
│
└── frontend/
├── src/
│ ├── app/
│ │ ├── login/
│ │ ├── signup/
│ │ └── dashboard/
│ └── lib/api.js
└── package.json

