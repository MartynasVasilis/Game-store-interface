const dbPath = process.env.DB_PATH || "..\\..\\data\\db.sqlite";
const Database = require("better-sqlite3");
const db = new Database(dbPath);

module.exports = db;
