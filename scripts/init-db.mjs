import { openDB } from '../lib/db.mjs';

(async () => {
  const db = await openDB();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS WeightEntries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      date TEXT,
      timeOfDay TEXT,
      weight REAL,
      FOREIGN KEY (userId) REFERENCES Users(id)
    );
  `);
  console.log('Database initialized');
})();
