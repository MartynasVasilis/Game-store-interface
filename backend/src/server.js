const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./db/database");
const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.get("/list", (req, res) => {
  const search = req.query.search ? req.query.search.trim() : null;
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, parseInt(req.query.limit) || 10);
  const offset = (page - 1) * limit;
  let processedSearch;
  if (search) {
    processedSearch = search
      .split(/\s+/)
      .map((word) => word + "*")
      .join(" ");
  }
  console.log(processedSearch);
  let stmt, countStmt;
  if (search) {
    const searchStatement =
      "SELECT * FROM GAME_ENTRY JOIN GAME_ENTRY_FTS ON GAME_ENTRY_FTS.rowid = GAME_ENTRY.id WHERE GAME_ENTRY_FTS MATCH ? ORDER BY bm25(GAME_ENTRY_FTS) LIMIT ? OFFSET ?";
    stmt = db.prepare(searchStatement);
    countStmt = db.prepare(
      "SELECT COUNT(*) AS total FROM GAME_ENTRY JOIN GAME_ENTRY_FTS ON GAME_ENTRY_FTS.rowid = GAME_ENTRY.id WHERE GAME_ENTRY_FTS MATCH ?",
    );
    const games = stmt.all(processedSearch, limit, offset);
    const { total } = countStmt.get(processedSearch);
    const hasNext = page * limit < total;
    res.json({
      data: games,
      meta: {
        page,
        limit,
        total,
        hasNext,
      },
    });
  } else {
    stmt = db.prepare("SELECT * FROM GAME_ENTRY ORDER BY id LIMIT ? OFFSET ?");
    countStmt = db.prepare("SELECT COUNT(*) AS total FROM GAME_ENTRY");
    const games = stmt.all(limit, offset);
    const { total } = countStmt.get();
    const hasNext = page * limit < total;
    res.json({
      data: games,
      meta: {
        page,
        limit,
        total,
        hasNext,
      },
    });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`I'm running on ${port}`);
});

const fs = require("fs");
console.log("DB exists:", fs.existsSync("./src/db/database.sqlite"));
