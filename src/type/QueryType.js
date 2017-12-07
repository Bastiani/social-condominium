// @flow

import { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import { connectionArgs, fromGlobalId } from 'graphql-relay';

import UserType from './UserType';
import PersonType from './PersonType';
import PetType from './PetType';
import { NodeField } from '../interface/NodeInterface';
import { UserLoader } from '../loader';
import UserConnection from '../connection/UserConnection';

import { Person, Pet } from '../model';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: () => ({
    node: NodeField,
    me: {
      type: UserType,
      resolve: (root, args, context) => (context.user ? UserLoader.load(context, context.user._id) : null),
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args, context) => {
        const { id } = fromGlobalId(args.id);
        return UserLoader.load(context, id);
      },
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args, context) => UserLoader.loadUsers(context, args),
    },
    persons: {
      type: new GraphQLList(PersonType),
      args: {
        name: {
          type: GraphQLString,
        },
        email: {
          type: GraphQLString,
        },
      },
      resolve(obj, args) {
        return Person.find({ $or: [{ name: { $regex: `.*${args.name}.*` } }, { email: args.email }] });
      },
    },
    pet: {
      type: new GraphQLList(PetType),
      args: {
        name: {
          type: GraphQLString,
        },
        species: {
          type: GraphQLString,
        },
      },
      resolve(obj, args) {
        return Pet.find({ $or: [{ name: { $regex: `.*${args.name}.*` } }, { species: args.species }] });
      },
    },
  }),
});
