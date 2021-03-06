import {PersonModel} from "../models/person.js";
import {add, db} from "../db.js";
import {ControllerError} from "../errors/controller.js";


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
                reject(new ControllerError(`Person with id ${id} not found `));
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
            let person = db.find((person) => person.id === id);
            if (!person) {
                reject(new ControllerError(`Person with id ${id} not found `));
            }
            let updatedPerson = Object.assign(db[db.indexOf(person)], newPerson);
            resolve(updatedPerson);
        });
    }

    async deletePerson(id) {
        return new Promise((resolve, reject) => {
            let personIndex = db.findIndex((person) => person.id === id);
            if (personIndex < 0) {
                reject(new ControllerError(`Person with id ${id} not found `));
            }
            db.splice(personIndex, 1);
            resolve(`Person deleted successfully`);
        });
    }
}