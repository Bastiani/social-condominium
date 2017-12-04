import mockingoose from 'mockingoose';
import pet from '../Pet';

describe('test mongoose pet model', () => {
  it('should return the pet with findOne', () => {
    const selectedPet = {
      _id: '5a2192118b9a881f1fe480f0',
      name: 'Hommer',
      species: 'cat',
    };

    mockingoose.Pet.toReturn(selectedPet, 'findOne');

    return pet
      .findOne({ name: 'Hommer' })
      .then(petResult => expect(JSON.parse(JSON.stringify(petResult))).toMatchObject(selectedPet));
  });
});
