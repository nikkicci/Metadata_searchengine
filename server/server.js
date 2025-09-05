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

// === US7: /api/search — geo-only (kräver geoLat, geoLng, geoRadiusKm) ===
app.get('/api/search', async (req, res) => {
  try {
    const lat = Number(req.query.geoLat);
    const lng = Number(req.query.geoLng);
    const radiusKm = Number(req.query.geoRadiusKm);

    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !Number.isFinite(radiusKm) || radiusKm <= 0) {
      return res.status(400).json({ error: 'geoLat, geoLng och geoRadiusKm (km) krävs' });
    }

    const sql = `
      SELECT
        id,
        filename,
        JSON_UNQUOTE(JSON_EXTRACT(description,'$.plats')) AS plats,
        CAST(JSON_EXTRACT(description,'$.gps[0]') AS DECIMAL(10,7)) AS lat,
        CAST(JSON_EXTRACT(description,'$.gps[1]') AS DECIMAL(10,7)) AS lng,
        (6371 * ACOS(
          COS(RADIANS(?)) *
          COS(RADIANS(CAST(JSON_EXTRACT(description,'$.gps[0]') AS DECIMAL(10,7)))) *
          COS(RADIANS(CAST(JSON_EXTRACT(description,'$.gps[1]') AS DECIMAL(10,7))) - RADIANS(?)) +
          SIN(RADIANS(?)) *
          SIN(RADIANS(CAST(JSON_EXTRACT(description,'$.gps[0]') AS DECIMAL(10,7))))
        )) AS distance_km
      FROM Books
      WHERE JSON_EXTRACT(description,'$.gps[0]') IS NOT NULL
        AND JSON_EXTRACT(description,'$.gps[1]') IS NOT NULL
      HAVING distance_km <= ?
      ORDER BY distance_km ASC, id ASC
      LIMIT 100
    `;

    const rows = await query(sql, [lat, lng, lat, radiusKm]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Serverfel i geo-sökningen' });
  }
});


export default db;
