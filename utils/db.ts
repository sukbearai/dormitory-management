import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', // Docker 容器映射到本地
  port: 3306,
  user: 'root',
  password: 'rootpassword',
  database: 'dormitory_management',
});

export async function query(sql, params) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}