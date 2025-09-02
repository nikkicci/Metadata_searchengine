// Import the express package/module
// Express is a web framework for Node.js that makes it easy to create web servers and APIs
import express from 'express';

// Import the MySQL database driver (promise version)
// This allows us to connect to and query a MySQL database using async/await
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Create an Express web server instance called 'app'
const app = express();

// Serve all static files (HTML, CSS, JS, images) from the 'client' folder
// This means visiting http://localhost:3000 will show client/index.html
app.use(express.static('client'));

// Start the server and listen for requests on port 3000
// When the server starts, print a message to the terminal
app.listen(3000, () =>
  console.log('Listening on http://localhost:3000'));

// Create a connection to the MySQL database
// Replace the credentials below with your own database details
// TODO: Replace the placeholder values below with your own MySQL database credentials

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});



// Helper function to run a SQL query with optional values
// Returns the result rows from the database
async function query(sql, listOfValues) {
  let result = await db.execute(sql, listOfValues);
  return result[0]; // result[0] contains the rows
}

// REST API route: Get all people from the database
// When a GET request is made to /api/people, return all people as JSON
app.get('/api/books', async (request, response) => {
  // Query the database for all books
  let result = await query(`
    SELECT *
    FROM Books
  `);
  // Send the result as a JSON response
  response.json(result);
});

// REST API route: Search for books by author or title
// When a GET request is made to /api/people/:searchTerm, search the database
app.get('/api/books/:searchTerm', async (request, response) => {
  // Get the search term from the URL and add % for SQL LIKE (partial match)
  let searchTerm = `%${request.params.searchTerm}%`;
  // Query the database for books where author or title matches the search term (case-insensitive)
  let result = await query(`
    SELECT *
    FROM books
    WHERE 
      LOWER(författare) LIKE LOWER(?) OR
      LOWER(titel) LIKE LOWER(?)
  `, [searchTerm, searchTerm, searchTerm]);
  // Send the result as a JSON response
  response.json(result);
});


export default db;
