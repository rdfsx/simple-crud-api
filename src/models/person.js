import { v4 as uuidv4 } from 'uuid';

export let PersonModel = ({name, age, hobbies}) => ({
    id: uuidv4(),
    name: name,
    age: age,
    hobbies: hobbies,
});