import * as SQLite from 'expo-sqlite';

import { CATS } from '@/constants/cats';

const DB_NAME = 'cat-them-all.db';

export interface CatalogRow {
  id: string;
  name: string;
  asset_path: string;
  meme: string;
  funny_line: string;
}

export interface CaughtRow {
  cat_id: string;
  caught_at: number;
}

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync(DB_NAME);
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS cats (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          asset_path TEXT NOT NULL,
          meme TEXT NOT NULL,
          funny_line TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS caught_cats (
          cat_id TEXT PRIMARY KEY NOT NULL REFERENCES cats(id),
          caught_at INTEGER NOT NULL
        );
      `);
      await seedCatalog(db);
      return db;
    })();
  }
  return dbPromise;
}

/** Upsert the bundled catalog so asset paths and card copy stay in SQLite. */
async function seedCatalog(db: SQLite.SQLiteDatabase): Promise<void> {
  const statement = await db.prepareAsync(
    `INSERT OR REPLACE INTO cats (id, name, asset_path, meme, funny_line)
     VALUES ($id, $name, $assetPath, $meme, $funnyLine)`
  );
  try {
    for (let i = 0; i < CATS.length; i++) {
      const cat = CATS[i];
      // Asset files are named cat-00.jpg through cat-19.jpg
      const assetFileName = `cat-${i.toString().padStart(2, '0')}.jpg`;
      await statement.executeAsync({
        $id: cat.id,
        $name: cat.name,
        $assetPath: `assets/cats/${assetFileName}`,
        $meme: cat.meme,
        $funnyLine: cat.funnyLine,
      });
    }
  } finally {
    await statement.finalizeAsync();
  }
}

export async function getCaughtIds(): Promise<string[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<CaughtRow>(
    'SELECT cat_id, caught_at FROM caught_cats ORDER BY caught_at ASC'
  );
  return rows.map((row) => row.cat_id);
}

export async function catchCat(catId: string): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'INSERT OR IGNORE INTO caught_cats (cat_id, caught_at) VALUES (?, ?)',
    catId,
    Date.now()
  );
}

/** Free every cat — resets the game. */
export async function freeAllCats(): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM caught_cats');
}

export async function getCatalog(): Promise<CatalogRow[]> {
  const db = await getDb();
  return db.getAllAsync<CatalogRow>('SELECT * FROM cats ORDER BY name ASC');
}
