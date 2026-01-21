const path = require("path");
const Database = require("better-sqlite3");

const dbPath =
  process.env.DB_PATH || path.join(process.cwd(), "data/db.sqlite");

const db = new Database(dbPath);

module.exports = db;
