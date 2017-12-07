import { GraphQLObjectType, GraphQLString } from 'graphql';
import { globalIdField } from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'PetType',
  description: 'Pet data',
  fields: () => ({
    id: globalIdField('Pet'),
    _id: {
      type: GraphQLString,
      resolve: pet => pet._id,
    },
    name: {
      type: GraphQLString,
      resolve: pet => pet.name,
    },
    species: {
      type: GraphQLString,
      resolve: pet => pet.species,
    },
  }),
});
