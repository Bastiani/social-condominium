import { GraphQLString } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Person } from '../model';

export default mutationWithClientMutationId({
  name: 'DeletePerson',
  inputFields: {
    _id: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ _id }) => {
    const person = await Person.findOne({ _id });

    if (person) {
      return person
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
