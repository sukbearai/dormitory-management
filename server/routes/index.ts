import { query } from "~~/utils/db";

export default defineEventHandler(async (event) => {
  try {
    const results = await query('SELECT 1 + 1 AS result', []);
    return { message: 'Database connected!', result: results[0].result };
  } catch (error) {
    return { error: 'Database connection failed', details: error.message };
  }
});