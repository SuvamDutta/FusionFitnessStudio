import { createClient } from '@libsql/client';

// Connect to Turso Cloud Database
const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Initialize Tables
async function initDb() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      join_date TEXT NOT NULL,
      status TEXT DEFAULT 'ACTIVE'
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      months_covered INTEGER DEFAULT 1,
      mode TEXT DEFAULT 'CASH',
      FOREIGN KEY (member_id) REFERENCES members (id)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS expenses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      description TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_name TEXT NOT NULL UNIQUE,
      quantity INTEGER NOT NULL DEFAULT 0,
      total_buy_price REAL DEFAULT 0,
      cost_per_serving REAL DEFAULT 0
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS supplements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buyer_name TEXT NOT NULL,
      inventory_id INTEGER,
      quantity_sold INTEGER NOT NULL DEFAULT 1,
      price REAL NOT NULL,
      cost_at_sale REAL NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (inventory_id) REFERENCES inventory (id)
    )
  `);
}

// Call init on load (safe because IF NOT EXISTS)
initDb().catch(console.error);

export default db;
