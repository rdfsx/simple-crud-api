import {PersonModel, Persons} from "../models/person.js";


export default class PersonController {
    async getPersons() {
        return new Promise((resolve, _) => resolve(Persons));
    }

    async getPerson(id) {
        return new Promise((resolve, reject) => {
            let person = Persons.find((person) => person.id === id);
            if (person) {
                resolve(person);
            } else {
                reject(`Person with id ${id} not found `);
            }
        });
    }

    async createPerson(person) {
        return new Promise((resolve, _) => {
            let newPerson = PersonModel(person);
            Persons.push(newPerson);
            resolve(newPerson);
        });
    }

    async updatePerson(id, person) {
        return new Promise((resolve, reject) => {
            let person = Persons.find((person) => person.id === id);
            if (!person) {
                reject(`No persons with id ${id} found`);
            }
            const index = Persons.indexOf(person);
            let updatedPerson = Object.assign(Persons[index], person);
            resolve(updatedPerson);
        });
    }

    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            let person = Persons.find((person) => person.id === id);
            if (!person) {
                reject(`No person with id ${id} found`);
            }
            const index = Persons.indexOf(person);
            delete Persons[index];
            resolve(`Person deleted successfully`);
        });
    }
}