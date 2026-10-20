const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const db = require('../db');

describe('Task Tracker API task routes', () => {
  let token;
  let createdTaskId;

  beforeAll(async () => {
    if (!process.env.JWT_SECRET) process.env.JWT_SECRET = 'test-only-secret-change-me';
    // Ensure schema.sql has been loaded into the test database before running tests.
    const userResult = await db.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      ['Test User', 'task-api-test@example.com', '$2a$10$testhashnotusedforlogin']
    );
    token = jwt.sign({}, process.env.JWT_SECRET, {
      subject: String(userResult.rows[0].id), expiresIn: '10m',
      issuer: 'task-tracker-api', audience: 'task-tracker-client'
    });
  });

  afterAll(async () => {
    await db.pool.end();
  });

  test('successful task creation returns 201', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'QA test task', description: 'Created by automated test' });

    expect(response.status).toBe(201);
    expect(response.body.task.title).toBe('QA test task');
    createdTaskId = response.body.task.id;
  });

  test('getting a non-existent task returns 404', async () => {
    const response = await request(app)
      .get('/api/v1/tasks/999999999')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  test('missing token returns 401', async () => {
    const response = await request(app).post('/api/v1/tasks').send({ title: 'No token' });
    expect(response.status).toBe(401);
  });

  test('invalid task ID returns 400', async () => {
    const response = await request(app)
      .get('/api/v1/tasks/not-a-number')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(400);
  });

  test('empty title returns 400', async () => {
    const response = await request(app)
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: '   ' });
    expect(response.status).toBe(400);
  });
});
