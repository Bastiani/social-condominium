import { GraphQLNonNull, GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Pet } from '../model';

export default mutationWithClientMutationId({
  name: 'DeletePet',
  inputFields: {
    _id: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  mutateAndGetPayload: async ({ _id }) => {
    try {
      const pet = await Pet.findOne({ _id });

      if (pet) {
        await pet.remove();
        return {
          message: 'Successfully removed!',
        };
      }

      return {
        message: 'Not found',
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
