# TypeScript eCommerce APIs

![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-yellow)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)

## 📌 Project Overview
This repository contains a backend API for an eCommerce platform, built using **TypeScript, Node.js, Express, TypeORM, and PostgreSQL**. The project follows best practices for authentication, role-based access control (RBAC), and RESTful API design.

## 🚀 Features
- User authentication (JWT & Cookies)
- Role-based access control (Admin, User)
- CRUD operations for products, orders, and users
- Secure API endpoints
- PostgreSQL as the database
- Dockerized setup for easy deployment

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT-based authentication
- **Deployment:** Docker, Docker Compose

## 🔥 Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js (v18+)](https://nodejs.org/en/)
- [PostgreSQL (v15+)](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (for containerized setup)

### 1️⃣ Clone the Repository
```sh
$ git clone https://github.com/NSugam/TypeScript-eCommerce-APIs.git
$ cd TypeScript-eCommerce-APIs
```

### 2️⃣ Install Dependencies
```sh
$ npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the root directory and configure it:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgres://user:password@localhost:5432/ecommerce_db
JWT_SECRET=your_secret_key
```

### 4️⃣ Run Migrations
```sh
$ npm run typeorm migration:run
```

### 5️⃣ Start the Server
```sh
$ npm run dev
```
Server will run at: `http://localhost:5000`

## 🐳 Docker Setup (Optional)
To run the project using Docker, use:
```sh
$ docker-compose up --build
```

## 📖 API Endpoints
| Method | Endpoint           | Description |
|--------|-------------------|-------------|
| POST   | `/api/user/register` | Register a new user |
| POST   | `/api/user/login` | User login |
| GET    | `/api/product/all` | Get all products |
| POST   | `/api/product/add` | Add a new product (Admin) |
| PUT    | `/api/product/update/:id` | Update product (Admin) |
| DELETE | `/api/product/delete/:id` | Delete product (Admin) |

## 👥 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Add new feature'`)
4. Push to branch (`git push origin feature-branch`)
5. Create a Pull Request

## 📝 License
This project is licensed under the MIT License.

---

🚀 **Happy Coding!**

