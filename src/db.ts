import mysql from 'mysql2/promise';


var fs = require('fs');

const db = mysql.createPool({
  host: 'tsiprojectsql.mysql.database.azure.com',
  user: 'admin1',
  password: 'Password1',
  database: 'sakila',
  ssl: {
    ca: fs.readFileSync('dist/src/DigiCertGlobalRootCA.crt.pem')
  }
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
      console.log(rows);
      return rows;
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving films from the database');
    }
  }
