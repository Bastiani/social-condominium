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
