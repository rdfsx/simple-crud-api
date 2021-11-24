import { v4 as uuidv4 } from 'uuid';

export let PersonModel = (name, age, hobbies) => ({
    id: uuidv4(),
    name: name,
    age: age,
    hobbies: hobbies,
});
//
// let person = PersonModel('John', 30, ['coding', 'cooking']);
// console.log(person);
// let updatedPerson = Object.assign(person, {name: "Misha"});
// console.log(updatedPerson);