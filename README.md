# Metadata_searchengine

# Project Setup Instructions

## Install dependencies

Before running the project, make sure to install the required Node.js modules by running:

```bash
npm install express mysql2 dotenv

This will install the following packages:
express – for setting up the web server
mysql2 – for connecting to the MySQL database
dotenv – to load environment variables from a .env file

## Setup environment variables

Create a .env file in the root of your project directory. This file should contain the configuration for your database connection and any other secret keys or environment-specific variables.
Example .env file:

DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
PORT=3000

Make sure to replace the placeholder values with your actual database credentials and desired port.

## Running the project
After installing dependencies and setting up your .env file, you can start the server with:

npm start

## Notes
Do NOT commit your .env file to version control as it contains sensitive information.
If you don't have a MySQL database set up, please install MySQL and create a database before running the application.

