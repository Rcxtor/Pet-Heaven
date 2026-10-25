# 🐾 Pet Heaven — Pet Adoption Platform

Pet Heaven is a full-stack web application designed to connect pet owners with potential adopters. Users can browse and search pet listings, save favorites, submit and manage adoption requests, and track adoption history. The application is built using **React.js, Laravel (PHP), and MySQL**, with REST API integration between the frontend and backend.

## ✨ Features

- **User Authentication** — User login, registration, and protected routes.
- **Pet Listings** — Create and manage pet listings with details and images.
- **Search & Filter** — Find pets based on search criteria and preferences.
- **Favorites** — Save and manage favorite pets.
- **Adoption Requests** — Submit, receive, and manage adoption requests.
- **Request Tracking** — Track sent and received adoption requests and their statuses.
- **Adoption History** — View records of completed adoptions.
- **User Profiles** — Update profile information and validate required details.
- **User Dashboard** — Access personalized information and adoption-related activities.
- **Pet Status Management** — Manage pet availability throughout the adoption process.

## For Testing (FactoryDefault)
  - email: test@example.com
  - password: password123

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Context API

### Backend
- Laravel
- PHP
- RESTful API

### Database
- MySQL

### Deployment & Tools
- Vercel (Frontend)
- Git and GitHub

## 🏗️ Architecture

Pet Heaven follows a client-server architecture. The React frontend communicates with the Laravel backend through REST API endpoints, while MySQL stores application data such as user profiles, pet listings, adoption requests, and adoption history.

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- PHP
- Composer
- MySQL
- Laravel CLI (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/Rcxtor/Pet-Heaven
cd pet-heaven
```

### 2. Set Up the Backend

Navigate to your Laravel backend directory:

```bash
cd backend
composer install
```

Create your environment configuration:

```bash
cp .env.example .env
php artisan key:generate
```

Configure your database credentials in the `.env` file:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=pet_heaven
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Run the database migrations:

```bash
php artisan migrate
```

Start the Laravel development server:

```bash
php artisan serve
```

### 3. Set Up the Frontend

Open another terminal and navigate to your React frontend directory:

```bash
cd frontend
npm install
npm run dev
```

Configure the frontend API base URL to point to your running Laravel backend.

> **Note:** Replace `backend` and `frontend` with your actual directory names if your repository uses a different structure. If your application requires additional environment variables, storage setup, or authentication configuration, add those steps here.

## 🌐 Deployment

The frontend is deployed using Vercel and communicates with the deployed Laravel backend API. Ensure that the backend URL, CORS settings, and any required environment variables are configured correctly for production.

## 🎯 Project Goal

The goal of Pet Heaven is to make pet adoption more accessible by providing a centralized platform where users can discover pets, connect through adoption requests, and manage the adoption process.

## 👨‍💻 Author

**Saif Ahmmed Sifat**

- GitHub: [Rcxtor](https://github.com/rcxtor)

---

*Built to make pet adoption easier and more organized.*
