import {server} from "./src/server.js";
import * as dotenv from 'dotenv'
dotenv.config({ path: './.env'})

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}\nhttp://localhost:${PORT}`);
});