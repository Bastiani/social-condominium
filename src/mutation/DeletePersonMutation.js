// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Person } from '../model';

export default mutationWithClientMutationId({
  name: 'DeletePerson',
  inputFields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ _id }) => {
    try {
      const person = await Person.findOne({ _id });

      if (person) {
        await person.remove();
        return {
          message: 'Successfully removed!',
        };
      }
      return {
        message: 'Not found.',
      };
    } catch (err) {
      return {
        message: err,
      };
    }
  },
  outputFields: {
    message: {
      type: GraphQLString,
      resolve: ({ message }) => message,
    },
  },
});
