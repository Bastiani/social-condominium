import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Person } from '../model';
import PersonType from '../type/PersonType';

export default mutationWithClientMutationId({
  name: 'RegisterPerson',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    telephone: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    address: {
      type: GraphQLString,
    },
    /* pets: {
      type: GraphQLString,
    }, */
  },
  mutateAndGetPayload: async ({ name, telephone, email, address }) => {
    let person = await Person.findOne({ name });

    if (person) {
      return {
        newPerson: null,
        error: 'PERSON_ALREADY_REGISTERED',
      };
    }

    person = new Person({
      name,
      telephone,
      email,
      address,
      // pets,
    });
    return person
      .save()
      .then(newPerson => newPerson)
      .catch(error => error);
  },
  outputFields: {
    newPerson: {
      type: PersonType,
      resolve: obj => obj,
    },
    error: {
      type: GraphQLString,
      resolve: error => error,
    },
  },
});
