# J-Note — Full Stack Mobile Note Taking Application

J-Note is a full-stack mobile note-taking application developed using React Native (Expo) for the mobile frontend and Jakarta EE (Payara Server) for the backend REST API, with MySQL used as the database.

The project demonstrates modern mobile and backend development practices, including authentication, RESTful API communication, database integration, and persistent user sessions.

---

# Project Overview

This application allows users to create and manage personal notes using a mobile device. Each user can register an account, log in securely, and store notes organized by categories. Notes can be sorted and filtered to improve usability.

The backend exposes a REST API built with Jakarta EE, while the mobile application communicates with the API using Axios.

---

# Features

User Authentication

* User registration with mobile number validation
* Secure login with token-based authentication
* Persistent login using AsyncStorage (Remember Me functionality)

Notes Management

* Create personal notes
* Categorize notes using predefined categories
* View notes in a structured list
* Sort notes by latest or oldest
* Filter notes by category

Mobile Application

* Built with React Native using Expo
* Responsive layout suitable for multiple screen sizes
* Safe area support for devices with notches
* Keyboard-safe input forms
* Clean navigation using Expo Router

Backend System

* RESTful API developed with Jakarta EE (JAX-RS)
* Hosted on Payara Server
* MySQL database integration using JDBC
* Token validation for protected endpoints

---

# System Architecture

Mobile Application (React Native / Expo)
Communicates with REST API using Axios

Jakarta EE Backend (Payara Server)
Handles authentication, business logic, and data access

MySQL Database
Stores users and notes data

---

# Technology Stack

Frontend

* React Native
* Expo
* Expo Router
* Axios
* AsyncStorage
* React Native Picker

Backend

* Java
* Jakarta EE (JAX-RS)
* Payara Server
* JDBC

Database

* MySQL

Development Tools

* Visual Studio Code
* NetBeans
* Postman
* Git and GitHub

---

# Project Structure

```
J-Note
│
├── mobile-app
│   ├── app
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   ├── notes.tsx
│   │   ├── note-form.tsx
│   │   └── index.tsx
│   │
│   └── src
│       └── services
│           ├── api.ts
│           └── env.ts
│
└── backend
    ├── resource
    ├── dto
    ├── service
    └── database
```

---

# API Endpoints

Authentication

Register
POST /api/auth/register

Login
POST /api/auth/login

Notes

Create Note
POST /api/notes

Get Notes
GET /api/notes

Sorting Example
GET /api/notes?sort=latest
GET /api/notes?sort=oldest

Filter by Category
GET /api/notes?category=Work

---

# Setup Instructions

Backend Setup

1. Install Payara Server
2. Create a MySQL database
3. Configure a JDBC connection pool in Payara
4. Deploy the Jakarta EE backend project
5. Access the API at:

[http://localhost:8080/note-api/api](http://localhost:8080/note-api/api)

---

Mobile Application Setup

Install dependencies

```
npm install
```

Start the Expo development server

```
npx expo start
```

Update the API base URL in:

src/services/env.ts

Example

```
export const API_BASE_URL = "http://YOUR_PC_IP:8080/note-api/api";
```

---

# Learning Outcomes

This project demonstrates the following concepts:

* Mobile application development using React Native
* REST API development with Jakarta EE
* Backend and mobile integration
* Authentication and session management
* Database interaction using JDBC
* Full-stack system architecture

---

# Author

Akila Abeysinghe
Software Engineering Student
Full Stack Developer

GitHub:
[https://github.com/bhanu2191](https://github.com/bhanu2191)

---

 
