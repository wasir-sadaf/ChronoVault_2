# ChronoVault: The Digital Time Capsule

ChronoVault is a full-stack web application that lets users create and store **text-based messages** as digital time capsules — locked until a specific future date.  
Built using **Node.js**, **React**, and **MySQL**, the platform ensures secure message storage, seamless user experience, and reliable retrieval when the time comes.

---

## Table of Contents
- [Overview](#overview)
- [Learning Outcomes](#learning-outcomes)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Frontend Design](#frontend-design)
- [Database Schema](#database-schema)
- [Conclusion](#conclusion)

---

## Overview
ChronoVault demonstrates how to integrate a **Node.js backend** with a **React frontend** and **MySQL database** to create a full-stack system that stores user messages securely.  
Each message (a *capsule*) is timestamped with a future unlock date — users cannot view it until that time has passed.

The project focuses on **CRUD operations**, **time-based access**, and clean frontend-backend interaction.

---

## Learning Outcomes
Through this project, I have learned:

- How to design RESTful APIs using **Node.js + Express**.
- How to connect a **React frontend** with a Node backend.
- How to structure and manage a **MySQL database** efficiently.
- How to implement **time-based retrieval logic** for stored messages.
- How to test APIs and handle multi-device development.

---

## Technologies Used
**Frontend:**
- React.js  
- React Router  
- CSS  

**Backend:**
- Node.js  
- Express.js  
- MySQL2  
- CORS  

**Development Tools:**
- REST CLIENT
- Git & GitHub 

---

## System Architecture
```

Frontend (React)
↓
Backend API (Node/Express)
↓
Database (MySQL)

````

1. Users interact with the **frontend** to create, view, and manage text capsules.  
2. The **backend** handles storage, retrieval, and time-based access logic.  
3. **MySQL** stores user details and capsule data.

---

## Project Setup

### Prerequisites
- Node.js (v16 or higher)
- MySQL server
- npm package manager

---

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/wasir-sadaf/chrono_vault.git
cd chrono_vault
````

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Install frontend dependencies**

```bash
cd ../frontend
npm install
```

**4. Run backend**

```bash
cd backend
node server.js
```

**5. Run frontend**

```bash
cd ../frontend
npm start
```

Access the app at: [http://localhost:5000](http://localhost:5000)

---

## Frontend Design

The **React frontend** focuses on simplicity and usability:

* User registration and dashboard
* Form for creating new text capsules with future unlock dates
* Timer/countdown until unlock date
* Minimal and clean UI using CSS

Frontend communicates with the backend via **Axios** or **Fetch API**.

---

## Database Schema

### Create Database

```sql
CREATE DATABASE chronodb;
```

### Users Table

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Capsules Table

```sql
CREATE TABLE capsules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  unlock_date DATETIME NOT NULL,
  is_unlocked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Conclusion

ChronoVault is a simple yet powerful **text-based time capsule app**, showcasing full-stack development with Node.js, React, and MySQL.
It allows users to securely store messages and retrieve them only at the scheduled unlock date, combining clean architecture with practical time-based logic.

---

## Images

Here are some screenshots of ChronoVault in action:

![Screenshot 1](images/1.png)
![Screenshot 2](images/2.png)
![Screenshot 3](images/3.png)
![Screenshot 4](images/4.png)
![Screenshot 5](images/5.png)
![Screenshot 6](images/6.png)
![Screenshot 7](images/7.png)
