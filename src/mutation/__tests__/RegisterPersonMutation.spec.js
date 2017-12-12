import { graphql } from 'graphql';
import { schema } from '../../schema';
import { Person } from '../../model';
import { getContext, setupTest } from '../../../test/helper';

beforeEach(async () => setupTest());

xit('should create a new person with parameters are valid', async () => {
  const email = 'rafacdb@gmail.com';

  const query = `
    mutation {
      RegisterPerson(input: {
        name: "João Davi de Bastiani",
        telephone: "54 981125116",
        email: ${email},
        address: "Rua tal..."
      }) {
        newPerson {
          id
          _id
          name
          telephone
          email
          address
        }
      }
    }
  `;

  const rootValue = {};
  const context = getContext();

  await graphql(schema, query, rootValue, context);
  // const { RegisterPerson } = result.data;

  const person = await Person.findOne({
    email,
  });

  expect(person).not.toBe(null);
});
