export function validatePerson(person) {
    if (typeof person !== 'object') {
        throw new Error('Person must be an object');
    }
    if (JSON.stringify(Object.keys(person).sort()) !== JSON.stringify([ 'age', 'hobbies', 'name' ])) {
        throw new Error('Invalid Person schema!');
    }
    if (typeof person.name !== "string") {
        throw new Error('Person name must be a string');
    }
    if (typeof person.age !== "number") {
        throw new Error('Person age must be a number');
    }
    if (!Array.isArray(person.hobbies)) {
        throw new Error('Person hobbies must be an array');
    }
    if (!person.hobbies.every(elem => typeof elem === "string")) {
        throw new Error('Person hobbies must be an array of string');
    }
    return true;
}
