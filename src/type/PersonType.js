// @flow

import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { globalIdField } from 'graphql-relay';

export default new GraphQLObjectType({
  name: 'Person',
  description: 'Person data',
  fields: () => ({
    id: globalIdField('Person'),
    _id: {
      type: GraphQLString,
      resolve: person => person._id,
    },
    name: {
      type: GraphQLString,
      resolve: person => person.name,
    },
    telephone: {
      type: GraphQLString,
      resolve: person => person.telephone,
    },
    email: {
      type: GraphQLString,
      resolve: person => person.email,
    },
    address: {
      type: GraphQLString,
      resolve: person => person.address,
    },
    pets: {
      type: GraphQLID,
      resolve: person => person.pets,
    },
  }),
});
