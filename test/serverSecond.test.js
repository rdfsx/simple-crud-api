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
const persons = [
    {
        name: 'Johnny Doe',
        age: 30,
        hobbies: ['sport', 'cooking']
    },
    {
        name: 'Misha Doe',
        age: 32,
        hobbies: ['coding', 'driving', 'walking']
    },
    {
        name: 'John Doe',
        age: 25
    }
];
const fakeUUID = '123e4567-e89b-12d3-a456-426614174000';
const fakeID = '1234567';

describe('API test: second scenario: Errors', () => {
    deleteAll();

    it("Should return error: Invalid schema", done => {
        options.method = 'POST';
        options.path = '/person';

        const data = new TextEncoder().encode(JSON.stringify(persons[2]));
        const req = http.request(options, res => {
            expect(res.statusCode).toBe(400);
            res.on('data', d => {
                let createdPerson = JSON.parse(d);
                expect(createdPerson).toEqual({
                    "message": "Invalid Person schema!"
                });
                done();
            });
        });
        req.write(data);
        req.end();
    });

    it("Should return error: Person not found (GET)", done => {
        options.method = 'GET';
        options.path = `/person/${fakeUUID}`;

        const req = http.request(options, res => {
            expect(res.statusCode).toBe(404);
            res.on('data', d => {
                expect(JSON.parse(d)).toEqual({
                    "message": `Person with id ${fakeUUID} not found `
                });
                done();
            });
        });
        req.end();
    });

    it("Should return error: Person not found (PUT)", done => {
        options.method = 'PUT';
        options.path = `/person/${fakeUUID}`;

        const data = new TextEncoder().encode(JSON.stringify(persons[0]));
        const req = http.request(options, res => {
            expect(res.statusCode).toBe(404);
            res.on('data', d => {
                expect(JSON.parse(d)).toEqual({
                    "message": `Person with id ${fakeUUID} not found `
                });
                done();
            });
        });
        req.write(data);
        req.end();
    });

    it("Should return error: Person not found (DELETE)", done => {
        options.method = 'DELETE';
        options.path = `/person/${fakeUUID}`;

        const req = http.request(options, res => {
            expect(res.statusCode).toBe(404);
            res.on('data', d => {
                expect(JSON.parse(d)).toEqual({
                    "message": `Person with id ${fakeUUID} not found `
                });
                done();
            });
        });
        req.end();
    });

    it("Should return error: Person id must be uuid (GET)", done => {
        options.method = 'GET';
        options.path = `/person/${fakeID}`;

        const req = http.request(options, res => {
            expect(res.statusCode).toBe(400);
            res.on('data', d => {
                expect(JSON.parse(d)).toEqual({
                    "message": "Person id must be uuid"
                });
                done();
            });
        });
        req.end();
    });

    it("Should return Invalid person schema", done => {
        options.method = 'POST';
        options.path = '/person';

        const data = new TextEncoder().encode(JSON.stringify(persons[2]));
        const req = http.request(options, res => {
            expect(res.statusCode).toBe(400);
            res.on('data', d => {
                expect(JSON.parse(d)).toEqual({
                    "message": "Invalid Person schema!"
                });
                done();
            });
        });
        req.write(data);
        req.end();
    });

    it("Should return error: Person id must be uuid (PUT)", done => {
        options.method = 'PUT';
        options.path = `/person/${fakeID}`;

        const req = http.request(options, res => {
            expect(res.statusCode).toBe(400);
            res.on('data', d => {
                expect(JSON.parse(d)).toEqual({
                    "message": "Person id must be uuid"
                });
                done();
            });
        });
        req.end();
    });

    it("Should return error: Person id must be uuid (DELETE)", done => {
        options.method = 'DELETE';
        options.path = `/person/${fakeID}`;

        const req = http.request(options, res => {
            expect(res.statusCode).toBe(400);
            res.on('data', d => {
                expect(JSON.parse(d)).toEqual({
                    "message": "Person id must be uuid"
                });
                done();
            });
        });
        req.end();
    });
});