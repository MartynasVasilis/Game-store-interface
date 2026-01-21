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

CREATE TRIGGER game_entry_ai AFTER INSERT ON GAME_ENTRY BEGIN
  INSERT INTO GAME_ENTRY_FTS(rowid, title) VALUES (new.id, new.title);
END;

CREATE TRIGGER game_entry_ad AFTER DELETE ON GAME_ENTRY BEGIN
  INSERT INTO GAME_ENTRY_FTS(GAME_ENTRY_FTS, rowid, title) VALUES('delete', old.id, old.title);
END;

CREATE TRIGGER game_entry_au AFTER UPDATE ON GAME_ENTRY BEGIN
  INSERT INTO GAME_ENTRY_FTS(GAME_ENTRY_FTS, rowid, title) VALUES('delete', old.id, old.title);
  INSERT INTO GAME_ENTRY_FTS(rowid, title) VALUES (new.id, new.title);
END;

INSERT INTO GAME_ENTRY_FTS(GAME_ENTRY_FTS) VALUES('rebuild');