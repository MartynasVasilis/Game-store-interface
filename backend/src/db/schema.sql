CREATE TABLE GAME_ENTRY (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    platform TEXT,
    region TEXT,
    price INTEGER,
    cover_url TEXT,
    currency TEXT,
    cashback_cents INTEGER,
    likes INTEGER
);

CREATE VIRTUAL TABLE GAME_ENTRY_FTS
USING fts5(
  title,
  content='GAME_ENTRY',
  content_rowid='id'
);