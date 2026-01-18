const db = require("./database");

db.exec("DELETE FROM GAME_ENTRY_FTS");

db.exec(`
INSERT INTO GAME_ENTRY_FTS(rowid, title)
SELECT id, title FROM GAME_ENTRY;
`);

console.log("FTS table populated successfully");
