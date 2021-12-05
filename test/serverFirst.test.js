const http = require('http');
const {deleteAll} = require("../src/db");
require('dotenv').config();
const options = {
  hostname: 'localhost',
  port: process.env.PORT,
  path: '/person',
  headers: {
    'Content-Type': 'application/json'
  }
}
const person = {
  name: 'Johnny Doe',
  age: 30,
  hobbies: ['sport', 'cooking']
}

describe('API test: first scenario', () => {
  let personId = '';
  let personCheck = {};
  deleteAll();

  it('Should return empty array', done => {
    options.method = 'GET';
    const req = http.request(options, res => {
      expect(res.statusCode).toBe(200);
      res.on('data', d => {
        expect(JSON.parse(d)).toEqual([]);
        done();
      });
    });
    req.end();
  });

  it("Should create a new record and return it", done => {
    options.method = 'POST';
    options.path = '/person';

    const data = new TextEncoder().encode(JSON.stringify(person));
    const req = http.request(options, res => {
      expect(res.statusCode).toBe(201);
      res.on('data', d => {
        let createdPerson = JSON.parse(d);
        personId = createdPerson.id;
        personCheck = createdPerson;
        delete createdPerson.id;
        expect(createdPerson).toEqual(person);
        done();
      });
    });
    req.write(data);
    req.end();
  });

  it('Should return person object', done => {
    options.method = 'GET';
    options.path = `/person/${personId}`;

    const req = http.request(options, res => {
      expect(res.statusCode).toBe(200);
      res.on('data', d => {
        let person = JSON.parse(d);
        expect(person.name).toBe(personCheck.name);
        expect(person.age).toBe(personCheck.age);
        expect(person.id).toEqual(personId);
        done();
      });
    });
    req.end();
  });

  it("Should update person", done => {
    options.method = 'PUT';
    options.path = `/person/${personId}`;

    let updatedPerson = {
      name: 'Misha Doe',
      age: 40,
      hobbies: ['sport', 'cooking']
    };

    const data = new TextEncoder().encode(JSON.stringify(updatedPerson));
    const req = http.request(options, res => {
      expect(res.statusCode).toBe(200);
      res.on('data', d => {
        let updatedPerson = JSON.parse(d);
        expect(updatedPerson.id).toEqual(personId);
        expect(updatedPerson.name).toEqual(updatedPerson.name);
        expect(updatedPerson.age).toEqual(updatedPerson.age);
        expect(updatedPerson.hobbies).toEqual(updatedPerson.hobbies);
        done();
      });
    });
    req.write(data);
    req.end();
  });

  it('Should delete person object', done => {
    options.method = 'DELETE';
    options.path = `/person/${personId}`;

    const req = http.request(options, res => {
      expect(res.statusCode).toBe(204);
      done();
    });
    req.end();
  });

  it('Should return "not found"', done => {
    options.method = 'GET';
    options.path = `/person/${personId}`;
    const req = http.request(options, res => {
      expect(res.statusCode).toBe(404);
      res.on('data', d => {
        expect(JSON.parse(d)).toEqual({
          "message": `Person with id ${personId} not found `
        });
        done();
      });
    });
    req.end();
  });
});
