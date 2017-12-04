// @flow
import DataLoader from 'dataloader';
import { Person as PersonModel } from '../model';
import { connectionFromMongoCursor, mongooseLoader } from '@entria/graphql-mongoose-loader';

import type { ConnectionArguments } from 'graphql-relay';
import type { GraphQLContext } from '../TypeDefinition';

type PersonType = {
  id: string,
  _id: string,
  name: string,
  email: string,
  active: boolean,
};

export default class Person {
  id: string;
  _id: string;
  name: string;
  telephone: string;
  email: string;
  address: string;

  constructor(data: PersonType, { person }: GraphQLContext) {
    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
  }
}

export const getLoader = () => new DataLoader(ids => mongooseLoader(PersonModel, ids));

const viewerCanSee = (viewer, data) =>
  // Anyone can see another person
  true;
export const load = async (context: GraphQLContext, id: string): Promise<?Person> => {
  if (!id) {
    return null;
  }

  let data;
  try {
    data = await context.dataloaders.PersonLoader.load(id);
  } catch (err) {
    return null;
  }
  return viewerCanSee(context, data) ? new Person(data, context) : null;
};

export const clearCache = ({ dataloaders }: GraphQLContext, id: string) =>
  dataloaders.PersonLoader.clear(id.toString());

export const loadPersons = async (context: GraphQLContext, args: ConnectionArguments) => {
  const where = args.search ? { name: { $regex: new RegExp(`^${args.search}`, 'ig') } } : {};
  const persons = PersonModel.find(where, { _id: 1 });

  return connectionFromMongoCursor({
    cursor: persons,
    context,
    args,
    loader: load,
  });
};
