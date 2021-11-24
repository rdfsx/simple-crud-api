import {PersonModel} from "../models/person.js";
import {add, db} from "../db.js";


export default class PersonController {
    async getPersons() {
        return new Promise((resolve, _) => resolve(db));
    }

    async getPerson(id) {
        return new Promise((resolve, reject) => {
            let person = db.find((person) => person.id === id);
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
            add(newPerson);
            resolve(newPerson);
        });
    }

    async updatePerson(id, newPerson) {
        return new Promise((resolve, reject) => {
            let personIndex = db.findIndex((person) => person.id === id);
            if (personIndex < 0) {
                reject(`No persons with id ${id} found`);
            }
            let updatedPerson = Object.assign(db[personIndex], newPerson);
            resolve(updatedPerson);
        });
    }

    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            let personIndex = db.findIndex((person) => person.id === id);
            if (personIndex < 0) {
                reject(`No person with id ${id} found`);
            }
            delete db[personIndex];
            resolve(`Person deleted successfully`);
        });
    }
}