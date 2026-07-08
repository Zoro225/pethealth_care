# 🐾 Pet Health Tracker — Full Stack App

Spring Boot 3 + React 18 + MySQL | Ready to run locally or with Docker

## 📌 Overview

Pet Health Tracker is a full-stack web application for managing pet health records.  
It allows users to add, update, delete, search, and analyze pet data through a Spring Boot REST API and a React-based frontend.

## 🛠️ Tech Stack

- **Backend:** Spring Boot 3, Java 17, Maven
- **Frontend:** React 18, Vite, Node.js
- **Database:** MySQL 8
- **DevOps:** Docker, Docker Compose, Jenkins

## ✅ Prerequisites

### For manual setup
- Java 17+
- Maven 3.8+
- Node.js 18+
- MySQL 8+

### For Docker setup
- Docker
- Docker Compose

## 🗄️ Manual Setup

### Step 1 — Create the Database

```sql
CREATE DATABASE pettracker_db;
```

Update `backend/src/main/resources/application.properties`:

```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### Step 2 — Run the Backend

```bash
cd backend
mvn spring-boot:run
```

Backend URL: `http://localhost:8080`

### Step 3 — Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## 🐳 Docker Compose Setup

Run the full application stack with:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d
```

Stop services:

```bash
docker compose down
```

Stop and remove volumes:

```bash
docker compose down -v
```

### Services

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- MySQL: `localhost:3306`

## ⚙️ Environment Variables

Example Docker environment values:

```env
MYSQL_DATABASE=pettracker_db
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/pettracker_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=yourpassword
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/pets` | Get all pets |
| GET | `/pets/{id}` | Get pet by ID |
| POST | `/pets` | Add new pet |
| PUT | `/pets/{id}` | Update pet |
| DELETE | `/pets/{id}` | Delete pet |
| GET | `/pets/search?name=` | Search pets by name |
| GET | `/pets/dashboard` | Get dashboard analytics |

## 🔄 CI/CD with GitHub Actions

This project can use GitHub Actions for continuous integration.

### Example pipeline steps
- Checkout the code
- Set up Java
- Set up Node.js
- Build backend with Maven
- Build frontend with npm
- Build Docker images
- Run tests

## 📁 Project Structure

```bash
PetHealthTracker/
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/main/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── docker-compose.yml
├── .dockerignore
├── .github/
│   └── workflows/
│       └── ci.yml
└── README.md
```

## 🔧 Open in IntelliJ IDEA

- Open the `backend/` folder
- Import the Maven project
- Run `PetHealthTrackerApplication`

## 🔧 Open in VS Code

- Open the `frontend/` folder
- Run:

```bash
npm install
npm run dev
```
2. Open terminal → `npm install && npm run dev`
=======
# pethealthcare
an application for pets health management
>>>>>>> 94a2a8095beb063e6c6390a5c3d7a65531f7c26c
