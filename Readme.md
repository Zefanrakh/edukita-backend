# Edukita Grading System

## Overview
Edukita Grading System is a platform for teachers to grade and provide feedback on student assignments in two subjects: **English Writing** and **Math Homework**. The system consists of a backend built with **Node.js & Express**.

## Features
### Backend API
- **User Management**
  - Register & login for students and teachers.
- **Assignment Management**
  - Students can submit assignments.
  - Teachers can view and grade assignments.
- **Grading System**
  - Teachers can provide grades & feedback.
  - Students can view their grades and feedback.
- **Authentication & Authorization**
  - Role-based access control for students & teachers.

## Project Structure
```
/src
  ├── __mocks__/          # Mock data for testing
  ├── __tests__/handlers/ # API endpoint test handlers
  ├── config/             # Configuration files
  ├── controllers/        # API controllers
  ├── dtos/               # Data Transfer Objects (DTOs)
  ├── entities/           # Database models/entities
  ├── middleware/         # Express middlewares
  ├── migrations/         # TypeORM database migrations
  ├── repositories/       # Database repository layer
  ├── routes/             # API route definitions
  ├── services/           # Business logic and services
  ├── types/              # TypeScript type definitions
  ├── utils/              # Utility/helper functions
  ├── createApp.ts        # Application initialization
  ├── index.ts            # Entry point for the backend server
```

## Setup Instructions

### 1. Clone Repository
```sh
git clone https://github.com/user/edukita-backend.git
cd edukita-backend
```

### 2. Backend Setup
```sh
cp .env.example .env  # Create environment config file
npm install           # Install dependencies
npm run build         # Build the application
npm start             # Start the backend server
```

## Running with Docker
```sh
docker-compose up --build
```

## Deployment with Kubernetes
### 1. Build & Push Images
```sh
docker build -t edukita-backend .
docker tag edukita-backend:latest your-docker-repo/edukita-backend:latest
docker push your-docker-repo/edukita-backend:latest
```

### 2. Apply Kubernetes Configurations
```sh
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
```

## Architecture Diagram
The following is a high-level architecture diagram representing how different components interact:
```
+----------------------+        +----------------------+
|      Student        | -----> |       Backend       |
+----------------------+        +----------------------+
                                  |    +------------+  
                                  |--> |  Database  |  
                                  |    +------------+  
                                  |
+----------------------+        |
|      Teacher        | --------+
+----------------------+        
```
- **Students** submit assignments via the backend API.
- **Teachers** retrieve assignments and submit grades.
- The **backend** processes requests and interacts with the **database**.

---
<br>
<br>
<br>

# Project: Edukita Project

## End-point: Register User
### Method: POST
>```
>localhost:8000/auth/register
>```
### Headers

|Content-Type|Value|
|---|---|
|Content-Type|application/json|


### Body (**raw**)

```json
{
    "name": "Jackson",
    "email": "jackson@edukita.com",
    "password": "jackson",
    "role": "teacher"
}
```

### Response: 201
```json
{
    "name": "Jackson",
    "email": "jackson@edukita.com",
    "role": "teacher",
    "id": 5
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login
### Method: POST
>```
>localhost:8000/auth/login
>```
### Body (**raw**)

```json
{
    "email": "lily@edukita.com",
    "password": "lilylily"
}
```

### Response: 200
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3NDA3Mzk4NjcsImV4cCI6MTc0MDc0MzQ2N30.9pi4c6yjxGROwpF2BQ5fUvAy9XbfykICXjCeewK4Zwk"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create User
### Method: POST
>```
>localhost:8000/users
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3NDA3Mzk4NjcsImV4cCI6MTc0MDc0MzQ2N30.9pi4c6yjxGROwpF2BQ5fUvAy9XbfykICXjCeewK4Zwk|


### Body (**raw**)

```json
{
    "name": "Tomy",
    "email": "tomy@edukita.com",
    "password": "tomytomy",
    "role": "student"
}
```

### Response: 201
```json
{
    "name": "Tomy",
    "email": "tomy@edukita.com",
    "role": "student",
    "id": 6
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Submit Assignment
### Method: POST
>```
>localhost:8000/assignments
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Nywicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NDA5MDQ2NTksImV4cCI6MTc0MDkwODI1OX0.O04pzcmVMvY_37CVJC3rS6NfrD2mO5wuolHgPKt1COY|


### Body (**raw**)

```json
{
    "title": "Summation",
    "content": "1 + 1 = 2",
    "subject": "Math"
}
```

### Response: 201
```json
{
    "title": "Explain Yourself 2",
    "content": "I am tomy, you can call me Tomoo",
    "subject": "English",
    "student": {
        "id": 6,
        "name": "Tomy",
        "email": "tomy@edukita.com",
        "password": "$2b$10$qngbi/KNKt/c/iZqgaZQueYHkf79cDjh0oPyGfa1edzNgDf22xp4e",
        "role": "student"
    },
    "id": 2
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Assignments
### Method: GET
>```
>localhost:8000/assignments?pagination[page]=2&search=Tomy&subject=English
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3NDA5NjUzMzUsImV4cCI6MTc0MTA4MDUzNX0.n-7JPYkTOHrmtFs9ZcGhugp5aP7bhAMxbPI5rhGeao4|


### Query Params

|Param|value|
|---|---|
|pagination[page]|2|
|search|Tomy|
|subject|English|


### Response: 200
```json
{
    "data": [
        {
            "id": 1,
            "title": "Explain Yourself",
            "content": "I am tomy, you can call me Tomoo",
            "subject": "English",
            "grade": {
                "id": 3,
                "grade": 6,
                "feedback": "Bad",
                "teacher": {
                    "id": 5,
                    "name": "Jackson",
                    "email": "jackson@edukita.com",
                    "password": "$2b$10$PBBU5jHOTPI0wO.WRuZ4v.s8/3YTeMI4S35gSYecjW0t3ivzuVlT.",
                    "role": "teacher"
                }
            },
            "student": {
                "id": 6,
                "name": "Tomy",
                "email": "tomy@edukita.com",
                "password": "$2b$10$qngbi/KNKt/c/iZqgaZQueYHkf79cDjh0oPyGfa1edzNgDf22xp4e",
                "role": "student"
            }
        },
        {
            "id": 2,
            "title": "Explain Yourself 2",
            "content": "I am tomy, you can call me Tomoo",
            "subject": "English",
            "grade": {
                "id": 1,
                "grade": 9,
                "feedback": "Good",
                "teacher": null
            },
            "student": {
                "id": 6,
                "name": "Tomy",
                "email": "tomy@edukita.com",
                "password": "$2b$10$qngbi/KNKt/c/iZqgaZQueYHkf79cDjh0oPyGfa1edzNgDf22xp4e",
                "role": "student"
            }
        }
    ],
    "limit": 2,
    "page": 1,
    "total": 2,
    "totalPages": 2
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Grade Assignment
### Method: POST
>```
>localhost:8000/grades/
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3NDA5NjUzMzUsImV4cCI6MTc0MTA4MDUzNX0.n-7JPYkTOHrmtFs9ZcGhugp5aP7bhAMxbPI5rhGeao4|


### Body (**raw**)

```json
{
    "assignmentId": 4,
    "grade": 9.8,
    "feedback": "Great"
}
```

### Response: 201
```json
{}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Grades
### Method: GET
>```
>localhost:8000/grades
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3NDA5NjUzMzUsImV4cCI6MTc0MTA4MDUzNX0.n-7JPYkTOHrmtFs9ZcGhugp5aP7bhAMxbPI5rhGeao4|


### Response: 200
```json
{
    "data": [
        {
            "id": 1,
            "grade": 9,
            "feedback": "Good",
            "assignment": {
                "id": 2,
                "title": "Explain Yourself 2",
                "content": "I am tomy, you can call me Tomoo",
                "subject": "English",
                "student": {
                    "id": 6,
                    "name": "Tomy",
                    "email": "tomy@edukita.com",
                    "password": "$2b$10$qngbi/KNKt/c/iZqgaZQueYHkf79cDjh0oPyGfa1edzNgDf22xp4e",
                    "role": "student"
                }
            },
            "teacher": null
        },
        {
            "id": 2,
            "grade": 9,
            "feedback": "Great",
            "assignment": {
                "id": 4,
                "title": "Summation",
                "content": "1 + 1 = 2",
                "subject": "Math",
                "student": {
                    "id": 7,
                    "name": "Lily",
                    "email": "lily@edukita.com",
                    "password": "$2b$10$ybMskk6qaC2ieTUq9hi12.wFd2KPsZe8suuYR/2t.oNg0FTRRPkCq",
                    "role": "student"
                }
            },
            "teacher": {
                "id": 5,
                "name": "Jackson",
                "email": "jackson@edukita.com",
                "password": "$2b$10$PBBU5jHOTPI0wO.WRuZ4v.s8/3YTeMI4S35gSYecjW0t3ivzuVlT.",
                "role": "teacher"
            }
        },
        {
            "id": 3,
            "grade": 6,
            "feedback": "Bad",
            "assignment": {
                "id": 1,
                "title": "Explain Yourself",
                "content": "I am tomy, you can call me Tomoo",
                "subject": "English",
                "student": {
                    "id": 6,
                    "name": "Tomy",
                    "email": "tomy@edukita.com",
                    "password": "$2b$10$qngbi/KNKt/c/iZqgaZQueYHkf79cDjh0oPyGfa1edzNgDf22xp4e",
                    "role": "student"
                }
            },
            "teacher": {
                "id": 5,
                "name": "Jackson",
                "email": "jackson@edukita.com",
                "password": "$2b$10$PBBU5jHOTPI0wO.WRuZ4v.s8/3YTeMI4S35gSYecjW0t3ivzuVlT.",
                "role": "teacher"
            }
        },
        {
            "id": 5,
            "grade": 9,
            "feedback": "Horray",
            "assignment": {
                "id": 6,
                "title": "English Advanced",
                "content": "I am Lily, yes, indeed",
                "subject": "English",
                "student": {
                    "id": 7,
                    "name": "Lily",
                    "email": "lily@edukita.com",
                    "password": "$2b$10$ybMskk6qaC2ieTUq9hi12.wFd2KPsZe8suuYR/2t.oNg0FTRRPkCq",
                    "role": "student"
                }
            },
            "teacher": {
                "id": 5,
                "name": "Jackson",
                "email": "jackson@edukita.com",
                "password": "$2b$10$PBBU5jHOTPI0wO.WRuZ4v.s8/3YTeMI4S35gSYecjW0t3ivzuVlT.",
                "role": "teacher"
            }
        }
    ],
    "limit": 4,
    "page": 1,
    "total": 4,
    "totalPages": 4
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Grades By Student
### Method: GET
>```
>localhost:8000/grades/6
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3NDA5NjUzMzUsImV4cCI6MTc0MTA4MDUzNX0.n-7JPYkTOHrmtFs9ZcGhugp5aP7bhAMxbPI5rhGeao4|


### Headers

|Content-Type|Value|
|---|---|
|Accept|application/json|


### Response: 200
```json
{
    "data": [
        {
            "id": 1,
            "grade": 9,
            "feedback": "Good",
            "assignment": {
                "id": 2,
                "title": "Explain Yourself 2",
                "content": "I am tomy, you can call me Tomoo",
                "subject": "English",
                "student": {
                    "id": 6,
                    "name": "Tomy",
                    "email": "tomy@edukita.com",
                    "password": "$2b$10$qngbi/KNKt/c/iZqgaZQueYHkf79cDjh0oPyGfa1edzNgDf22xp4e",
                    "role": "student"
                }
            },
            "teacher": null
        },
        {
            "id": 3,
            "grade": 6,
            "feedback": "Bad",
            "assignment": {
                "id": 1,
                "title": "Explain Yourself",
                "content": "I am tomy, you can call me Tomoo",
                "subject": "English",
                "student": {
                    "id": 6,
                    "name": "Tomy",
                    "email": "tomy@edukita.com",
                    "password": "$2b$10$qngbi/KNKt/c/iZqgaZQueYHkf79cDjh0oPyGfa1edzNgDf22xp4e",
                    "role": "student"
                }
            },
            "teacher": {
                "id": 5,
                "name": "Jackson",
                "email": "jackson@edukita.com",
                "password": "$2b$10$PBBU5jHOTPI0wO.WRuZ4v.s8/3YTeMI4S35gSYecjW0t3ivzuVlT.",
                "role": "teacher"
            }
        }
    ],
    "limit": 2,
    "page": 1,
    "total": 2,
    "totalPages": 2
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Grade and Feedback Recommendation by AI
### Method: GET
>```
>localhost:8000/grades/ai/1
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZSI6InRlYWNoZXIiLCJpYXQiOjE3NDA5NjUzMzUsImV4cCI6MTc0MTA4MDUzNX0.n-7JPYkTOHrmtFs9ZcGhugp5aP7bhAMxbPI5rhGeao4|


### Response: 200
```json
{
    "grade": 7.5,
    "feedback": "Good effort, Tomoo! You've provided a simple and clear introduction. I encourage you to add more details in your future responses. Share more about your interests or motivations—it will give your writing more depth and personality. Keep up the great work!"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)


**Author:** Your Name | **Version:** 1.0.0

