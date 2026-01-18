const db = require("./database");
const data = require("./seed.json");

db.exec("DELETE FROM GAME_ENTRY");

const insert = db.prepare(`
  INSERT INTO GAME_ENTRY (id, title, platform, region, price, cover_url, currency, cashback_cents, likes)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const item of data) {
  insert.run(
    item.id,
    item.title,
    item.platform,
    item.region,
    item.price,
    item.cover_url,
    item.currency,
    item.cashback_cents,
    item.likes
  );
}

console.log("Seeding completed successfully");
