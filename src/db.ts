import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'roottoor',
  database: 'sakila'
});

export default db;

export async function executeQuery(query: string, params: any[] = []): Promise<any> {
  const connection = await db.getConnection();
  try {
    const [rows, fields] = await connection.query(query, params);
    return rows;
  } catch (err) {
    throw err;
  } finally {
    connection.release();
  }
}

export async function getFilmsFromDatabase() {
    try {
      const [rows] = await db.query('SELECT * FROM film');
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving films from the database');
    }
  }
