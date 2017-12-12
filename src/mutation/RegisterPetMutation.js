// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { Pet } from '../model';
import PetType from '../type/PetType';

export default mutationWithClientMutationId({
  name: 'RegisterPet',
  inputFields: {
    _id: {
      type: GraphQLString,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    species: {
      type: GraphQLString,
    },
  },
  mutateAndGetPayload: async ({ _id, name, species }) => {
    try {
      let pet = await Pet.findOne({ _id });

      if (pet) {
        pet.name = name;
        pet.species = species;
      } else {
        pet = new Pet({
          name,
          species,
        });
      }

      const newPet = await pet.save();
      return {
        newPet,
        error: null,
      };
    } catch (err) {
      return {
        newPet: null,
        error: err,
      };
    }
  },
  outputFields: {
    newPet: {
      type: PetType,
      resolve: ({ newPet }) => newPet,
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error,
    },
  },
});
