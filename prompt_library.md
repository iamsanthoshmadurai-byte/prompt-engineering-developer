# Prompt Library

Use these templates with your project context. Replace bracketed variables before sending.

## 1\. Least-to-Most Requirements Prompt

Act as a Business Analyst. We want to design a backend REST API named `\[PROJECT\_NAME]`.
First, outline the system architecture scope and write 3 core B2B user stories for `\[USER\_STORIES]` with acceptance criteria. Do not write database schemas or backend code yet.

## 2\. SQL Schema Prompt

\[CONTEXT]: We are building the database layer for `\[PROJECT\_NAME]`.
\[ACTION]: Generate relational SQL table schemas for users and tasks, including primary keys, unique email, foreign keys, NOT NULL constraints, timestamps, and a constrained task status.
\[REQUIREMENTS]: Use PostgreSQL 15 syntax. Store only password hashes. Provide raw DDL SQL code in one code block. Do not write controller code.

## 3\. CRISPE Coding Prompt

* **Capacity:** Act as a Senior Backend Software Engineer.
* **Recipient:** Junior QA and developer team.
* **Instruction:** Write Express route controllers for `\[ENDPOINTS]`.
* **Style:** Follow DRY and SOLID principles; include clear error handling and comments.
* **Parameters:** Use raw parameterized SQL matching `schema.sql`; do not use an ORM.
* **Evaluation:** Explain how request parameters are validated and how security risks are reduced. Return only the requested files.

## 4\. Secure Reflection Prompt

Act as a Security Auditor. Scan the code below for SQL injection, unhandled errors, insecure password handling, and authorization issues.

Identify each issue, explain the risk, and provide a refactored secure version using parameterized SQL, safe error handling, password hashing/verification, and authorization checks. Do not expose secrets or return password hashes.

## 5\. OpenAPI Documentation Prompt

Generate OpenAPI 3.0 YAML for `\[ENDPOINTS]`. Include request schemas, success responses, and 400/401/404/409 error responses where appropriate. Match the actual implementation and use bearer JWT security for protected routes.

## 6\. Unit Test Prompt

Act as a QA Automation Engineer. Write Jest/Supertest tests for `\[ENDPOINTS]`.
Include: successful task creation (assert 201), requesting a missing task ID (assert 404), missing authentication (assert 401), and invalid input (assert 400). Use a test database and clearly state required environment variables.

