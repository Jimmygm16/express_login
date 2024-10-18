import mysql from 'mysql2/promise'; 

const pool = mysql.createPool({
  host: 'localhost',
  user: 'practice_user',
  password: 'practice123',
  database: 'practice_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
