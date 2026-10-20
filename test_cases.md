# Test Cases and QA Test Matrix

## Automated tests

The executable tests are in `code\_repository/tests/tasks.test.js`.

1. **Successful task creation** — valid bearer token and title; expect HTTP 201.
2. **Invalid task ID** — authenticated request for a non-existent ID; expect HTTP 404.

## QA test matrix

|ID|Test scenario|Input / action|Expected result|Priority|
|-|-|-|-|-|
|QA-01|Create task successfully|Valid token and title|201 Created; task returned|High|
|QA-02|Read missing task|Valid token and nonexistent ID|404 Not Found|High|
|QA-03|Missing token|Create task without Authorization|401 Unauthorized|High|
|QA-04|Empty task title|Title is whitespace/empty|400 Bad Request|High|
|QA-05|Invalid task ID|ID is not a positive integer|400 Bad Request|Medium|
|QA-06|Duplicate signup email|Signup with existing email|409 Conflict|High|
|QA-07|Invalid login|Wrong email/password|401 Unauthorized|High|
|QA-08|SQL injection attempt|SQL-looking text as title/email|Treated as data; no query injection|High|
|QA-09|Task ownership|User requests another user's task|404 Not Found|High|
|QA-10|Invalid status|Status outside allowed list|400 Bad Request|Medium|

## Running the tests

1. Install Node.js 20+ and PostgreSQL 15.
2. Create a test database and set `DATABASE\_URL` to it.
3. Set `JWT\_SECRET` to a long random value.
4. Run `npm install`, then `npm test`.
5. The test suite expects the schema to be loaded into the configured test database.

