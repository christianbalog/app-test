const request = require('supertest');
const { app, server } = require('./app');

describe('CI/CD Test App', () => {
  afterAll(() => {
    server.close();
  });

  describe('GET /', () => {
    it('should return hello world message', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'hey CI/CD Test App');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('version', '1.0.0');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('timestamp');
      expect(typeof response.body.uptime).toBe('number');
    });
  });

  describe('POST /echo', () => {
    it('should echo back the request data', async () => {
      const testData = { test: 'data', number: 123 };
      const response = await request(app)
        .post('/echo')
        .send(testData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Echo endpoint');
      expect(response.body).toHaveProperty('data', testData);
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should handle empty request body', async () => {
      const response = await request(app).post('/echo').send({});

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data', {});
    });
  });
});