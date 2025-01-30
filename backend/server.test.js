const request = require('supertest');
const app = require('./server');

describe('Superhero API', () => {
  beforeEach(() => {
    // Clear the superheroes array before each test
    app.locals.superheroes.length = 0;
  });

  describe('POST /superheroes', () => {
    it('should create a new superhero with valid data', async () => {
      const response = await request(app)
        .post('/superheroes')
        .send({
          name: 'Test Hero',
          superpower: 'Testing',
          humilityScore: 7
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('Test Hero');
      expect(response.body.superpower).toBe('Testing');
      expect(response.body.humilityScore).toBe(7);
    });
  });

  describe('GET /superheroes', () => {
    it('should return an array of superheroes', async () => {
      const response = await request(app).get('/superheroes');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return heroes sorted by humility score', async () => {
      // Add test heroes
      await request(app)
        .post('/superheroes')
        .send({
          name: 'Low Score Hero',
          superpower: 'Testing',
          humilityScore: 3
        });

      await request(app)
        .post('/superheroes')
        .send({
          name: 'High Score Hero',
          superpower: 'Testing',
          humilityScore: 8
        });

      const response = await request(app).get('/superheroes');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].name).toBe('High Score Hero');
      expect(response.body[1].name).toBe('Low Score Hero');
    });
  });
});