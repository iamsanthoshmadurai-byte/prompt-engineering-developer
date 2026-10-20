// Deliberately insecure example for the security reflection exercise.
// Do not use this code in a real application.
app.post('/api/v1/login-vulnerable', (req, res) => {
  const query = "SELECT * FROM users WHERE email = '" + req.body.email +
    "' AND password = '" + req.body.password + "'";
  db.query(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Problems: SQL injection, plain-text password comparison, unhandled errors,
// and returning database rows that may expose password hashes.
