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
// This means visiting http://localhost:4567 will show client/index.html
app.use(express.static('public'));

// Start the server and listen for requests on port 3000
// When the server starts, print a message to the terminal
app.listen(4567, () =>
  console.log('Listening on http://localhost:4567'));

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

// REST API route: Get all books from the database
// When a GET request is made to /api/books, return all books as JSON
app.get('/api/Books', async (request, response) => {
  // Query the database for all books
  let result = await query(`
    SELECT *
    FROM Books
  `);
  // Send the result as a JSON response
  response.json(result);
});

// User Story 5:
app.get('/api/Books/:searchTerm', async (request, response) => {
  let searchTerm = `%${request.params.searchTerm.toLowerCase()}%`;

  let result = await query(`
    SELECT *
    FROM Books
    WHERE 
      LOWER(filename) LIKE ? OR
      LOWER(description) LIKE ?
  `, [searchTerm, searchTerm]);

  response.json(result);
});



export default db;
