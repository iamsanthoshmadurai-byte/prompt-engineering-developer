# Software Requirement Document (SRD)

## Project: AI Software Development Assistant — Task Tracker REST API

### 1\. Project Overview

The Task Tracker API is a backend REST API for a business-to-business (B2B) task tracking system. It supports user registration and login, creating and reading tasks, updating task status, and managing task records.

### 2\. Objectives

* Define clear user requirements before coding.
* Use AI prompting in stages to create requirements, SQL schema, controllers, security review, API documentation, and tests.
* Demonstrate Least-to-Most, CRISPE, and Reflection prompting.
* Reduce common security risks and improve code clarity.

### 3\. Scope

**In scope**

* User signup and login foundations.
* Task creation and reading by ID.
* Task statuses: `Open`, `In Progress`, `Completed`.
* Relational database tables for users and tasks.
* API documentation and basic automated tests.

**Not fully implemented in this demo**

* Production-ready account recovery, email verification, refresh-token rotation, role/tenant management, rate limiting, deployment, and full CRUD routes. These would need additional requirements and testing.

### 4\. Architecture

* HTTP API: Node.js + Express
* Database: PostgreSQL 15
* SQL access: parameterized queries using `pg`; no ORM
* Tests: Jest + Supertest
* API documentation: OpenAPI 3.0 YAML

### 5\. User Stories and Acceptance Criteria

#### Story 1 — User Signup

As a business user, I want to create an account so I can securely access the task tracker.

* Given a valid name, email, and password, when I submit signup, the system creates a user.
* Email must be unique.
* Password is stored as a secure hash, never as plain text.
* Invalid input returns a clear 400 response.
* Duplicate email returns 409.

#### Story 2 — Task Creation

As an authenticated user, I want to create a task so I can track work that needs to be done.

* Given a valid title, when I submit a task, it is stored for the authenticated user.
* Description and due date are optional.
* New tasks default to `Open`.
* Successful creation returns 201 and the created task.
* Unauthenticated requests return 401.

#### Story 3 — Task Updates

As an authenticated user, I want to update a task so I can keep its details and status current.

* Only the task owner can update a task.
* Status must be one of `Open`, `In Progress`, or `Completed`.
* Invalid status returns 400.
* Missing task or task belonging to another user returns 404.

### 6\. Database Design

See `code\_repository/schema.sql`. PostgreSQL 15 syntax is used. Passwords are stored in `password\_hash`. Task rows reference users with a foreign key.

### 7\. API Design

* `POST /api/v1/auth/signup` — register a user
* `POST /api/v1/auth/login` — verify credentials and issue a token
* `POST /api/v1/tasks` — create a task
* `GET /api/v1/tasks/:id` — read a task owned by the current user

The implementation includes signup, login, create-task, and get-task routes. Task update requirements are described above but the update route is a future extension in this starter project.

### 8\. Security Requirements

* Use parameterized SQL to prevent SQL injection.
* Hash passwords using bcrypt.
* Never return password hashes to clients.
* Require a valid bearer token for task endpoints.
* Catch errors and return safe error messages.
* Store the JWT secret in an environment variable.
* Use HTTPS in production.

### 9\. Test Strategy

Automated tests verify task creation (201), invalid task ID (404), and additional authentication/validation behavior. Tests use a test database configured through environment variables.

### 10\. Assumptions

* PostgreSQL 15 is the SQL dialect.
* A user owns their tasks.
* The API uses bearer JWT access tokens.
* This is an educational starter project; run security review and integration tests before production use.

