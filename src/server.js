import * as http from "http";
import {getReqData} from "./utils/reqUtils.js";
import PersonController from "./controllers/personController.js";
import validatePerson from "./utils/validator.js";

const UUID_REGEX = /^(\/person\/)[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/;

export const server = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8;");
    let statusCode = 0;

    if(res.url === "/") {
        res.statusCode = 302;
        res.setHeader("Location", "/person");
    } else if (req.url.match(UUID_REGEX) && req.method === "GET") {
        try {
            const id = req.url.split("/")[2];
            let person = await new PersonController().getPerson(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(person));
        } catch (e) {
            res.writeHead(statusCode || 400, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message || e}));
        }
    } else if (req.url.match(UUID_REGEX) && req.method === "PUT") {
        try {
            const id = req.url.split("/")[2];
            let updatedPerson = await new PersonController().updatePerson(id, JSON.parse(await getReqData(req)));
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(updatedPerson));
        } catch (e) {
            res.writeHead(statusCode || 400, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e.message || e}));
        }
    } else if (req.url.match(UUID_REGEX) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[2];
            let updatedPerson = await new PersonController().deletePerson(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(updatedPerson));
        } catch (e) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e}));
        }
    } else if (req.url === "/person" && req.method === "GET") {
        let persons = await new PersonController().getPersons();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(persons));
    } else if (req.url === "/person" && req.method === "POST") {
        try {
            const data = await getReqData(req);
            validatePerson(data);
            const personData = JSON.parse(data);
            let person = await new PersonController().createPerson(JSON.parse(personData));
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end(JSON.stringify(person));
        } catch (e) {
            res.writeHead(400, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: e}));
        }
    } else if (req.url.match(/\/person\/(.*)/)){
        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({message: "Person id must be uuid"}));
    } else {
        res.statusCode = 404;
        res.write("Not Found");
    }
    res.end();
});