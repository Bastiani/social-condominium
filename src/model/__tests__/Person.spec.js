import mockingoose from 'mockingoose';
import person from '../Person';

describe('test mongoose person model', () => {
  it('should return the person with findOne', () => {
    const selectedPerson = {
      _id: '5a2192118b9a881f1fe480f0',
      name: 'Rafael',
      telephone: '1234567890',
      email: 'rafacdb@gmail.com',
      address: 'rua tal',
    };

    mockingoose.Person.toReturn(selectedPerson, 'findOne');

    return person
      .findOne({ name: 'Rafael' })
      .then(personResult => expect(JSON.parse(JSON.stringify(personResult))).toMatchObject(selectedPerson));
  });
});
