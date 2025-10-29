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
    }
    
}

export const generateRandomComment = ()=>{
    return faker.lorem.sentence({ min: 10, max: 25 });
}


