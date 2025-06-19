# BaatCheet 🗣️  
**Real-time Conversation Application**

**BaatCheet** (meaning "conversation" in Hindi) is a modern, real-time communication platform designed to facilitate seamless interactions between users. Built with a focus on intuitive user experience and robust functionality, it aims to provide a reliable space for instant messaging and connection.

---

## ✨ Features

- **Real-time Messaging**: Send and receive messages instantly with live updates.  
- **User Authentication**: Secure user registration and login system.  
- **Scalable Architecture**: Designed with separate frontend and backend components for better maintainability and scalability.  
- **Responsive Design**: Adapts to various screen sizes for a consistent experience across devices.  
- **Direct Messaging** (1-to-1 chats)  
- **Group Chats**  
- **Emoji Support**  
- **File Sharing**  
- **User Status** (online/offline)  
- **Notifications**

---

## 💻 Technologies Used

### Frontend
- **JavaScript**: Core language for interactive user interfaces  
- **HTML**: Structure of the web pages  
- **CSS**: Styling and visual presentation  
- **React.js**: Component-based frontend framework

### Backend
- **JavaScript**: For server-side logic and APIs  
- **Node.js**: JavaScript runtime environment  
- **Express.js**: Backend framework for handling APIs and routing

### Database
- **MongoDB**: NoSQL database for storing user and message data

### Real-time Communication
- **Socket.IO**: Enables real-time, bi-directional communication between client and server

---

## 🚀 Getting Started

Follow these steps to set up and run **BaatCheet** locally on your machine.

### Prerequisites

Make sure you have the following installed:
- Node.js (v14.x or higher)
- npm (or Yarn)
- MongoDB
- Git

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Jayant420Dhidhi/BaatCheet.git
cd BaatCheet
```

### 2. Backend Setup

```bash
cd backend
npm install  # or yarn install
```

Create a `.env` file in the `backend/` directory with the following content:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/baatcheet
JWT_SECRET=your_super_secret_key
```

Start the backend server:

```bash
npm start  # or node server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install  # or yarn install
```

Create a `.env.development` file in the `frontend/` directory with the following content:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start  # or yarn start
```

---

## 📸 UI Screenshot

Here’s a glimpse of the BaatCheet user interface:

![PHOTO-2025-06-19-21-09-38](https://github.com/user-attachments/assets/e5420907-b826-4ff2-ad4e-40029dfb62c6)
