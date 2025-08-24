# Kanban Board Application

A **full-stack Kanban Board application** built with **React (Vite), Express.js, Prisma, and PostgreSQL**. Users can manage tasks visually using columns and cards, with authentication and drag-and-drop functionality.

## **🚀 Features**

-   **User Authentication** (Register, Login, JWT-based Authorization)
-   **Manage Columns & Tasks** (Create, Update, Delete, Move Tasks Between Columns)
-   **Drag & Drop Functionality** for tasks
-   **RESTful API with Express.js & Prisma**
-   **PostgreSQL Database Integration**
-   **Tailwind CSS & Shadcn UI for Styling**

---

## **📌 Tech Stack**

### **Frontend:**

-   React (Vite)
-   TypeScript
-   React Router
-   Context API (State Management)
-   Tailwind CSS

### **Backend:**

-   Node.js & Express.js
-   TypeScript
-   Prisma ORM
-   PostgreSQL
-   JSON Web Token (JWT) Authentication

### **Tools & Deployment:**

-   bun (Package Manager)
-   Vercel for Frontend
-   AWS for Backend

---

## **💻 Manual Setup Instructions**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/adityaK87/Kanban-Board.git
cd kanban-board
```

### **2️⃣ Setup Environment Variables**

Create a `.env` file in the `backend/` directory:

```
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/kanban_db
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the `client/` directory:

```
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

### **3️⃣ Run Backend (Express + Prisma + PostgreSQL)**

```sh
cd backend
bun install
bun prisma migrate dev
bun dev
```

### **5️⃣ Run Frontend (React + Vite)**

```sh
cd client
bun install
bun dev
```

## **💻 Docker Setup Instructions**

### install docker on your machine

### create a network

    ```sh
     docker network create kanban_project
    ```

### start postgres using docker ->

    ```sh
         docker run --network kanban_project --name postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
    ```

### build the docker image for backend

    ```sh
     docker build --network=host -f ./docker/Dockerfile.backend -t kanban-backend ./backend
    ```

### start the backend container image

    ```sh
    docker run -e DATABASE_URL=postgresql://postgres:mysecretpassword@postgres:5432/postgres -p 3000:3000 --network kanban_project kanban-backend
    ```

### build the docker image for frontend

    ```sh
     docker build --network=host -f ./docker/Dockerfile.client -t kanban-client ./client
    ```

### start the client container image

    ```sh
    docker run -e VITE_BACKEND_URL=localhost:3000/api/v1 -p 3000:3000 --network kanban_project kanban-client
    ```

## **Docker compose**

### Clone the repo

```sh
git clone https://github.com/adityaK87/Kanban-Board.git
cd kanban-board
```

```sh
cd Kanban-Board
docker compose -f docker/docker-compose.yml up
```

Backend runs on [**http://localhost:3000**](http://localhost:3000) and frontend on [**http://localhost:5173**](http://localhost:5173).

---

**Made with ❤️ by **[**Aditya**](https://github.com/adityak87)\*\*

```

```
