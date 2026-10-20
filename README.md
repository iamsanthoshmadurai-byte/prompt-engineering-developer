# Prompt Engineering Developer — Task Tracker API

**Project:** AI Software Development Assistant  
**Prepared by:** \[Your Name]  
**Purpose:** Demonstrate how structured AI prompts can help build and test a REST API in stages.

## Features

* User signup and login
* JWT bearer authentication
* Create a task and read a task by ID
* PostgreSQL database with foreign keys and constraints
* Parameterized SQL queries (no ORM)
* OpenAPI YAML, Jest/Supertest tests, and prompt templates

## Technology

Node.js, Express, PostgreSQL 15, `pg`, bcryptjs, JSON Web Tokens, Jest, Supertest.

## Project structure

```text
prompt-engineering-developer/
├── software\_requirement\_document.md
├── api\_documentation.md
├── test\_cases.md
├── prompt\_library.md
├── presentation\_script.md
├── code\_repository/
│   ├── package.json
│   ├── .env.example
│   ├── schema.sql
│   ├── server.js
│   ├── app.js
│   ├── db.js
│   ├── middleware/auth.js
│   ├── routes/auth.js
│   ├── routes/tasks.js
│   └── tests/tasks.test.js
└── README.md
```

## Setup

1. Install Node.js 20+ and PostgreSQL 15.
2. Create a database, for example `task\_tracker`.
3. In `code\_repository/`, copy `.env.example` to `.env` and update the values.
4. Run the SQL in `schema.sql` against your database.
5. Run `npm install`.
6. Run `npm start`.
7. API base URL: `http://localhost:3000`.

## Environment variables

* `DATABASE\_URL` — PostgreSQL connection string
* `JWT\_SECRET` — long random secret (do not commit `.env`)
* `PORT` — optional server port

## API endpoints

* `POST /api/v1/auth/signup`
* `POST /api/v1/auth/login`
* `POST /api/v1/tasks`
* `GET /api/v1/tasks/:id`

## Run tests

Configure `DATABASE\_URL` to a dedicated test database, load `schema.sql`, then run `npm test`. Do not point tests at production data.

## Security note

This is an educational starter project, not a production-ready deployment. Review configuration, add rate limiting and operational monitoring, and run tests/security checks before deployment.

## Prompt engineering methods shown

* Least-to-Most: requirements first, then schema and code.
* CRISPE: structured instructions for controller generation.
* Reflection: inspect and improve insecure SQL code.

