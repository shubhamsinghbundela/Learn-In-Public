# 🐳 Manual Docker Setup

## 1. Pull MongoDB Image

```bash
docker pull mongo:8
```

## 2. Create a Docker Network

Create a shared network so the frontend, backend, and database containers can communicate with each other.

```bash
docker network create learn-in-public-network
```

---

## 3. Create a Docker Volume

```bash
docker volume create mongodb_data
```

This volume persists your MongoDB data even if the container is removed.

---

## 4. Run MongoDB

```bash
docker run -d --name mongodb --network learn-in-public-network -p 27017:27017 mongo:8
```

---

## 5. Build & Run Backend

Navigate to the `backend` directory.

### Build

```bash
docker build -t learn-in-public-backend .
```

### Run

```bash
docker run -d --name backend --network learn-in-public-network -p 3000:3000 learn-in-public-backend
```

The backend will be available at:

```
http://localhost:3000
```

---

## 6. Build & Run Frontend

Navigate to the `frontend` directory.

### Build

```bash
docker build -t learn-in-public-frontend .
```

### Run

```bash
docker run -d --name frontend -network learn-in-public-network -p 5173:5173 learn-in-public-frontend
```

The frontend will be available at:

```
http://localhost:5173
```

---

# 🐳 Docker Compose

From the project root, start all services with:

```bash
docker compose up --build
```

Run the containers in detached mode:

```bash
docker compose up -d --build
```

Stop all running services:

```bash
docker compose down
```

> **Note**
>
> If you're using **MongoDB locally** (Docker or a local MongoDB installation), make sure you **do not override Node.js DNS servers**.
>
> Remove code like:
>
> ```ts
> import dns from "dns";
>
> dns.setServers(["1.1.1.1", "8.8.8.8"]);
> ```
>
> Docker provides its own internal DNS to resolve service names such as `mongodb`. Overriding the DNS servers may result in:
>
> ```text
> getaddrinfo ENOTFOUND mongodb
> ```
>
> If you're connecting to **MongoDB Atlas** (`mongodb+srv://...`) and encounter DNS resolution issues, you can enable `dns.setServers(...)` if required by your environment.
