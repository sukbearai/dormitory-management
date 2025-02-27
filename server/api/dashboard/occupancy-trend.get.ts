import type { ApiResponse, OccupancyTrend } from '~~/types/api';
import type { OccupancyRecord } from '~~/types/database';
import { query } from '~~/utils/db';

export default defineEventHandler(async (): Promise<ApiResponse<OccupancyTrend>> => {
  try {
    // 获取最近6个月的入住趋势
    const result = await query<OccupancyRecord[]>(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(DISTINCT student_id) as count
      FROM Student_Dorm
      WHERE created_at >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month ASC
    `, []);

    return {
      code: 200,
      message: '获取入住趋势数据成功',
      data: {
        months: result.map(item => item.month),
        counts: result.map(item => item.count)
      }
    };
  } catch (error) {
    console.error('获取入住趋势数据失败:', error);
    return {
      code: 500,
      message: '服务器错误'
    };
  }
});