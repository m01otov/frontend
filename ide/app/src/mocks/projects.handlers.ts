import { rest } from 'msw';
import { faker } from '@faker-js/faker/locale/ru';

export const projectsHandlers = [
  rest.get('/api/v1/projects', async (_, response, context) => {

    const data = [...Array(10)].map(() => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription()
    }));

    return response(
      context.json(data)
    );
  }),
  
  rest.post('/api/v1/projects', async (_, response, context) => {
    return response(
      context.json({
        id: faker.string.uuid(),
        structure: [{
          id: faker.string.uuid(),
          name: faker.system.commonFileName(''),
          type: 'js',
          parentId: null
        }]
      })
    );
  }),

  rest.put('/api/v1/projects/:projectId', async (_, response, context) => {
    return response(
      context.json({ success: true })
    );
  }),

  rest.delete('/api/v1/projects/:projectId', async (_, response, context) => {
    return response(
      context.json({ success: true })
    );
  }),

  rest.get('/api/v1/projects/:projectId', async (_, response, context) => {
    const data: unknown[] = [];

    return response(
      context.json(data)
    );
  }),

];
