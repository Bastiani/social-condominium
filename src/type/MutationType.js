// @flow

import { GraphQLObjectType } from 'graphql';

import LoginEmail from '../mutation/LoginEmailMutation';
import RegisterEmail from '../mutation/RegisterEmailMutation';
import ChangePassword from '../mutation/ChangePasswordMutation';
import RegisterPerson from '../mutation/RegisterPersonMutation';
import RegisterPet from '../mutation/RegisterPetMutation';
import DeletePerson from '../mutation/DeletePersonMutation';
import DeletePet from '../mutation/DeletePetMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    LoginEmail,
    RegisterEmail,
    ChangePassword,
    RegisterPerson,
    RegisterPet,
    DeletePerson,
    DeletePet,
  }),
});
