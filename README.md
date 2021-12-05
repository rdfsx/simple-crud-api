# simple-crud-api

## Requirements
LTS version of Node.js (16.13.0)

## Installing
1. Clone the repository `git clone https://github.com/rdfsx/simple-crud-api.git`
2. Checkout branch `git checkout dev`
3. Install dependencies `npm install`

## Usage
1. Create .env file with the following variables: `PORT=<port>` (insert the port value you would like to use, e.g. 3000)
2. Run `npm run start:dev` for development version or `npm run start:prod` for production version
3. Open the browser and go to `http://localhost:<port>`
4. You can send requests to the API using the following endpoints: `http://localhost:<port>/person/<id>` and `http://localhost:<port>/person`
5. The body of the POST and PUT requests must follow the following schema: `
{
  "name": string,
  "age": number,
  "hobbies": [array of string or empty array]
}
`
6. You can make POST, PUT, GET and DELETE requests.
7. Note: the database is cleared every time the server is restarted.

## Testing
1. Start the server
2. Run `npm run test` (note: the database will be cleared) 