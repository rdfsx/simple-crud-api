import * as http from "http";
import {getReqData} from "./utils/reqUtils.js";
import PersonController from "./controllers/personController.js";

export const server = http.createServer(async (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8;");

    if(res.url === "/") {
        res.statusCode = 302;
        res.setHeader("Location", "/newpage");
    } else if (req.url.match(/\/person\/(...)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[2];
            let updatedPerson = await new PersonController().updatePerson(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(updatedPerson));
        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    } else if (req.url.match(/\/person\/(...)/) && req.method === "PUT") {

    } else if (req.url.match(/\/person\/(...)/) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[2];
            let updatedPerson = await new PersonController().deletePerson(id);
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(updatedPerson));
        } catch (error) {
            res.writeHead(404, {"Content-Type": "application/json"});
            res.end(JSON.stringify({message: error}));
        }
    } else if (req.url === "/person" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        let persons = await new PersonController().getPersons();
        console.log(persons);
        res.end(JSON.stringify(persons));
    } else if (req.url === "/person" && req.method === "POST"){
        let personData = await getReqData(req);
        let person = await new PersonController().createPerson(JSON.parse(personData));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(person));
    } else {
        res.statusCode = 404;
        res.write("Not Found");
    }
    res.end();
});