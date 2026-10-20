# Secure Reflection: Vulnerable Login Route

## Problems found
1. **SQL injection:** User input is concatenated into the SQL string. An attacker may change the meaning of the query.
2. **Plain-text password comparison:** Passwords must be stored as salted password hashes, not plain text.
3. **Unhandled database errors:** `throw err` can crash the process or expose internals.
4. **Sensitive data exposure:** Returning all rows can reveal password hashes and other private columns.
5. **No input validation or rate limiting:** Invalid input and repeated login attempts are not controlled.

## Secure approach
The implementation in `routes/auth.js` uses a parameterized query (`WHERE email = $1`), retrieves only required columns, verifies the password with `bcrypt.compare`, returns a generic login error, and signs a short-lived JWT. Database errors are caught and returned as safe messages.

For production, also add login rate limiting, HTTPS, monitoring, and secret rotation.
