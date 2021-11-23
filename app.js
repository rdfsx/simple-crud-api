import {server} from "./src/server.js";

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}\nhttp://localhost:${PORT}`);
});