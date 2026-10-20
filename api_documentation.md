# Task Tracker API — OpenAPI Documentation

```yaml
openapi: 3.0.3
info:
  title: Task Tracker API
  version: 1.0.0
  description: B2B REST API for users and task management.
servers:
  - url: http://localhost:3000
paths:
  /api/v1/auth/signup:
    post:
      summary: Register a user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SignupRequest'
      responses:
        '201':
          description: User created
        '400':
          description: Invalid input
        '409':
          description: Email already exists
  /api/v1/auth/login:
    post:
      summary: Log in and receive a bearer token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Login successful
        '400':
          description: Invalid input
        '401':
          description: Invalid credentials
  /api/v1/tasks:
    post:
      summary: Create a task
      security:
        - bearerAuth: \[]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/TaskCreateRequest'
      responses:
        '201':
          description: Task created
        '400':
          description: Invalid input
        '401':
          description: Missing or invalid token
  /api/v1/tasks/{id}:
    get:
      summary: Get a task owned by the current user
      security:
        - bearerAuth: \[]
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: integer
            minimum: 1
      responses:
        '200':
          description: Task found
        '400':
          description: Invalid ID format
        '401':
          description: Missing or invalid token
        '404':
          description: Task not found
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    SignupRequest:
      type: object
      required: \[name, email, password]
      properties:
        name: { type: string, minLength: 1 }
        email: { type: string, format: email }
        password: { type: string, minLength: 8, writeOnly: true }
    LoginRequest:
      type: object
      required: \[email, password]
      properties:
        email: { type: string, format: email }
        password: { type: string, minLength: 1, writeOnly: true }
    TaskCreateRequest:
      type: object
      required: \[title]
      properties:
        title: { type: string, minLength: 1, maxLength: 200 }
        description: { type: string, nullable: true }
        due\_date: { type: string, format: date, nullable: true }
```

