import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Pet } from '../model';

export default mutationWithClientMutationId({
  name: 'DeletePet',
  inputFields: {
    _id: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ _id }) => {
    const pet = await Pet.findOne({ _id });

    if (pet) {
      return pet
        .remove()
        .then(() => ({
          msg: 'Successfully removed!',
        }))
        .catch(msg => msg);
    }

    return {
      msg: 'Not found',
    };
  },
  outputFields: {
    message: {
      type: GraphQLString,
      resolve: ({ msg }) => msg,
    },
  },
});
