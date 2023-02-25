import request from 'supertest';

import { app } from '@shared/infra/http/app';

describe('Create Category Controller', () => {
  it('should be able to create a category', async () => {
    const response = await request(app)
      .post('categories')
      .send({
        name: 'Category test name',
        description: 'Test description',
      });

    expect(response.status).toBe(201);
  });
});
