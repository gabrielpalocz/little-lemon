import * as SQLite from 'expo-sqlite';

let db;

export async function initializeDatabase() {
  db = await SQLite.openDatabaseAsync('little_lemon');
}

export async function createTable() {
  try {
    if (!db) {
      throw new Error('Database connection is not established.');
    }
    await db?.withTransactionAsync(async () => {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS menuitems (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT,
          price TEXT,
          category TEXT,
          image TEXT,
          description TEXT
        );
      `);
    });
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

export async function getMenuItems() {
  try {
    if (!db) {
      throw new Error('Database connection is not established.');
    }
    const allRows = await db?.getAllAsync('SELECT * FROM menuitems');
    return allRows;
  } catch (error) {
    console.error('Error getting menu items:', error);
  }
}

export async function saveMenuItems(menuItems) {
  // await db;
  try {
    if (!db) {
      throw new Error('Database connection is not established.');
    }
    await db?.withTransactionAsync(async () => {
      // Create the placeholder list
      const menuItemsPlaces = menuItems.map(() => '(?, ?, ?, ?, ?)').join(', ');

      // Flatten the values ​​of the menuItems array of objects
      const values = menuItems.flatMap(menuItem => [
        menuItem.name,
        menuItem.price,
        menuItem.category,
        menuItem.image,
        menuItem.description
      ]);

      // Execute the query with multiple values
      await db.runAsync(`
      INSERT INTO menuitems (name, price, category, image, description)
      VALUES ${menuItemsPlaces}
    `, values);
    });
  } catch (error) {
    console.error('Error saving menu items:', error);
  }
}

export async function filterByQueryAndCategories(query, activeCategories) {
  try {
    if (!db) {
      throw new Error('Database connection is not established.');
    }
    const categoryPlaces = activeCategories?.map(() => '?').join(', ');
    const filteredRows = await db?.getAllAsync(`
      SELECT * FROM menuitems WHERE name LIKE ? AND category IN (${categoryPlaces})`,
      [`%${query}%`, ...activeCategories]);
    return filteredRows;
  } catch (error) {
    console.error('Error filtering:', error);
    return [];
  }
}
