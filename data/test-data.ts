import { faker } from '@faker-js/faker';
import { UserData } from './user-interface';

export const generateUserData = (): UserData => {
    const sexRandom = faker.person.sexType();
    const firstName = faker.person.firstName(sexRandom);
    const lastName = faker.person.lastName(sexRandom);
    const completeName = firstName + ' ' + lastName;

    return {
        name: completeName,
        email: faker.internet.email(),
        password: faker.internet.password(),
        days: faker.date.birthdate().getDate().toString(),
        months: (faker.date.birthdate().getMonth() + 1).toString(),
        year: faker.date.birthdate().getFullYear().toString(),
        first_name: firstName,
        last_name: lastName,
        company: faker.company.name(),
        address: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        country: faker.location.country(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobile_number: faker.phone.number(),
    }
}

export const generateRandomComment = ()=>{
    return faker.lorem.sentence({ min: 10, max: 25 });
}

export const generateRandomQuantity = ()=>{
    // Random quantity number between 1 and 20
    return faker.number.int({ min: 1, max: 20 });
}
