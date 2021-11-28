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
const invalidPersons = [
    {
        name: 'Johnny Doe',
        age: "johnny",
        hobbies: ['sport', 'cooking']
    },
    {
        name: 50,
        age: 32,
        hobbies: ['coding', 'driving', 'walking']
    },
    {
        name: 'John Doe',
        age: 25,
        hobbies: ['coding', 'driving', 5]
    },
    {
        name: 'John Doe',
        age: 25,
        hobbies: 'coding'
    }
];

describe("Test POST validation errors", () => {
    deleteAll();

    it("Should return error: Person name must be a string", done => {
        options.method = 'POST';
        options.path = '/person';

        const data = new TextEncoder().encode(JSON.stringify(invalidPersons[1]));
        const req = http.request(options, res => {
            expect(res.statusCode).toBe(400);
            res.on('data', d => {
                let createdPerson = JSON.parse(d);
                expect(createdPerson).toEqual({
                    "message": "Person name must be a string"
                });
                done();
            });
        });
        req.write(data);
        req.end();
    });

    it("Should return error: Person age must be a number", done => {
        options.method = 'POST';
        options.path = '/person';

        const data = new TextEncoder().encode(JSON.stringify(invalidPersons[0]));
        const req = http.request(options, res => {
            expect(res.statusCode).toBe(400);
            res.on('data', d => {
                let createdPerson = JSON.parse(d);
                expect(createdPerson).toEqual({
                    "message": "Person age must be a number"
                });
                done();
            });
        });
        req.write(data);
        req.end();
    });

    it("Should return error: Person hobbies must be an array of string", done => {
        options.method = 'POST';
        options.path = '/person';

        const data = new TextEncoder().encode(JSON.stringify(invalidPersons[2]));
        const req = http.request(options, res => {
            expect(res.statusCode).toBe(400);
            res.on('data', d => {
                let createdPerson = JSON.parse(d);
                expect(createdPerson).toEqual({
                    "message": "Person hobbies must be an array of string"
                });
                done();
            });
        });
        req.write(data);
        req.end();
    });

    it("Person hobbies must be an array", done => {
        options.method = 'POST';
        options.path = '/person';

        const data = new TextEncoder().encode(JSON.stringify(invalidPersons[3]));
        const req = http.request(options, res => {
            expect(res.statusCode).toBe(400);
            res.on('data', d => {
                let createdPerson = JSON.parse(d);
                expect(createdPerson).toEqual({
                    "message": "Person hobbies must be an array"
                });
                done();
            });
        });
        req.write(data);
        req.end();
    });
});
