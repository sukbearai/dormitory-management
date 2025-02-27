import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'rootpassword',
  database: 'dormitory_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// 查询多行数据
export async function query<T extends RowDataPacket[]>(
  sql: string, 
  values: unknown[] = []
): Promise<T> {
  const [rows] = await pool.execute<T>(sql, values)
  return rows
}

// 查询单行数据
export async function queryOne<T extends RowDataPacket>(
  sql: string,
  values: unknown[] = []
): Promise<T | null> {
  const [rows] = await pool.execute<T[]>(sql, values)
  return rows[0] || null
}

// 执行插入操作
export async function insert(
  sql: string,
  values: unknown[] = []
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(sql, values)
  return result.insertId
}

// 执行更新操作
export async function update(
  sql: string,
  values: unknown[] = []
): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(sql, values)
  return result.affectedRows
}