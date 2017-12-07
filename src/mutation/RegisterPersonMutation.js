import { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Person } from '../model';
import PersonType from '../type/PersonType';

export default mutationWithClientMutationId({
  name: 'RegisterPerson',
  inputFields: {
    _id: {
      type: GraphQLString,
    },
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
    pets: {
      type: GraphQLID,
    },
  },
  mutateAndGetPayload: async ({ _id, name, telephone, email, address, pets }) => {
    try {
      let person = await Person.findOne({ _id });

      if (person) {
        person.name = name;
        person.telephone = telephone;
        person.email = email;
        person.address = address;
        person.pets = pets;
      } else {
        person = new Person({
          name,
          telephone,
          email,
          address,
          pets,
        });
      }
      const newPerson = await person.save();
      return {
        newPerson,
        error: null,
      };
    } catch (err) {
      return {
        newPerson: null,
        error: err,
      };
    }
  },
  outputFields: {
    newPerson: {
      type: PersonType,
      resolve: ({ newPerson }) => newPerson,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
