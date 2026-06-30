<<<<<<< HEAD
# 🐾 Pet Health Tracker — Full Stack App

> Spring Boot 3 + React 18 + MySQL | Ready to run in 3 steps

---

## ✅ Prerequisites

Make sure these are installed:
- **Java 17+** → `java -version`
- **Maven 3.8+** → `mvn -version`
- **Node.js 18+** → `node -version`
- **MySQL 8+** → running locally on port 3306

---

## 🗄️ Step 1 — Create the Database

Open MySQL and run:
```sql
CREATE DATABASE pettracker_db;
```
Then open `backend/src/main/resources/application.properties` and update:
```properties
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

## 🚀 Step 2 — Run the Backend

```bash
cd backend
mvn spring-boot:run
```
✅ Backend starts at → **http://localhost:8080**

Spring will **auto-create** the `pets` table in MySQL.

---

## ⚛️ Step 3 — Run the Frontend

Open a **new terminal**:
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend starts at → **http://localhost:5173**

---

## 📡 API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/pets` | Get all pets |
| GET | `/pets/{id}` | Get pet by ID |
| POST | `/pets` | Add new pet |
| PUT | `/pets/{id}` | Update pet |
| DELETE | `/pets/{id}` | Delete pet |
| GET | `/pets/search?name=` | Search by name |
| GET | `/pets/dashboard` | Analytics stats |

---

## 📁 Project Structure

```
PetHealthTracker/
├── backend/                        ← Spring Boot Maven Project
│   ├── pom.xml                     ← Maven dependencies
│   └── src/main/
│       ├── java/com/pettracker/
│       │   ├── PetHealthTrackerApplication.java
│       │   ├── controller/PetController.java
│       │   ├── service/PetService.java
│       │   ├── service/PetServiceImpl.java
│       │   ├── repository/PetRepository.java
│       │   ├── model/Pet.java
│       │   ├── dto/PetDTO.java
│       │   └── exception/
│       │       ├── ResourceNotFoundException.java
│       │       └── GlobalExceptionHandler.java
│       └── resources/
│           └── application.properties
│
└── frontend/                       ← React + Vite Project
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── index.jsx
        ├── index.css
        ├── api/petApi.js
        └── components/
            ├── Dashboard.jsx
            ├── PetList.jsx
            └── PetForm.jsx
```

---

## 🔧 Open in IntelliJ IDEA

1. **File → Open** → Select the `backend/` folder
2. IntelliJ will detect the `pom.xml` and auto-import Maven
3. Wait for indexing → Click **Run** ▶ on `PetHealthTrackerApplication`

## 🔧 Open in VS Code

1. Open `frontend/` folder in VS Code
2. Open terminal → `npm install && npm run dev`
=======
# pethealthcare
an application for pets health management
>>>>>>> 94a2a8095beb063e6c6390a5c3d7a65531f7c26c
